/**
 * Geometria e matrizes do diamante do hero (lapidação brilhante simplificada, 128 facetas).
 * Sem biblioteca 3D: só o que o shader precisa. Matrizes em coluna-maior (formato do WebGL).
 */

type Vec3 = [number, number, number];
/** Quais arestas do triângulo são reais (1) e quais são diagonais internas de uma faceta maior (0). */
type EdgeMask = [number, number, number];
type Facet = [Vec3, Vec3, Vec3, EdgeMask];

const SIDES = 8;
const STEP = (Math.PI * 2) / SIDES;

function polar(radius: number, y: number, angle: number): Vec3 {
  return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
}

function sub(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

function normalize(v: Vec3): Vec3 {
  const length = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / length, v[1] / length, v[2] / length];
}

export interface GemMesh {
  /** Por vértice, 12 floats: posição, normal plana, baricêntricas e máscara de arestas. */
  data: Float32Array;
  vertexCount: number;
}

export const GEM_FLOATS_PER_VERTEX = 12;

/**
 * Lapidação brilhante redonda com 112 triângulos: mesa octogonal, 8 facetas estrela, 8 pipas
 * (bezel), 16 facetas da cintura superior, cintura, 16 facetas da cintura inferior e 8 pipas
 * do pavilhão que convergem na ponta (culet).
 */
export function buildGemMesh(): GemMesh {
  const a = (k: number) => (((k % SIDES) + SIDES) % SIDES) * STEP;
  const h = (k: number) => a(k) + STEP / 2;
  const wrap = (k: number) => ((k % SIDES) + SIDES) % SIDES;

  const tableCenter: Vec3 = [0, 0.34, 0];
  const table = (k: number) => polar(0.58, 0.34, a(k));
  const star = (k: number) => polar(0.8, 0.19, h(wrap(k)));
  const bezelBase = (k: number) => polar(1, 0, a(k));
  const girdleMid = (k: number) => polar(1, 0, h(wrap(k)));
  const lowerA = (k: number) => polar(1, -0.05, a(k));
  const lowerH = (k: number) => polar(1, -0.05, h(wrap(k)));
  const pavilion = (k: number) => polar(0.4, -0.6, h(wrap(k)));
  const culet: Vec3 = [0, -1.0, 0];
  const inside: Vec3 = [0, -0.2, 0];

  const facets: Facet[] = [];
  const real: EdgeMask = [1, 1, 1];

  for (let k = 0; k < SIDES; k += 1) {
    // mesa (só a borda externa é aresta real)
    facets.push([tableCenter, table(k), table(k + 1), [1, 0, 0]]);
    // estrela
    facets.push([table(k), table(k + 1), star(k), real]);
    // pipa da coroa, partida na diagonal mesa-cintura
    facets.push([table(k), star(k), bezelBase(k), [1, 0, 1]]);
    facets.push([table(k), bezelBase(k), star(k - 1), [1, 1, 0]]);
    // facetas da cintura superior
    facets.push([star(k), bezelBase(k), girdleMid(k), real]);
    facets.push([star(k), girdleMid(k), bezelBase(k + 1), real]);
    // cintura: duas faixas por lado (ponto da pipa e ponto do meio)
    for (const [top, bottom, nextTop, nextBottom] of [
      [bezelBase(k), lowerA(k), girdleMid(k), lowerH(k)],
      [girdleMid(k), lowerH(k), bezelBase(k + 1), lowerA(k + 1)],
    ]) {
      facets.push([top, bottom, nextBottom, [1, 0, 1]]);
      facets.push([top, nextBottom, nextTop, [1, 1, 0]]);
    }
    // facetas da cintura inferior
    facets.push([lowerA(k), lowerH(k), pavilion(k), real]);
    facets.push([lowerH(k), lowerA(k + 1), pavilion(k), real]);
    // pipa do pavilhão, partida na diagonal cintura-ponta
    facets.push([lowerA(k), pavilion(k - 1), culet, [1, 0, 1]]);
    facets.push([lowerA(k), culet, pavilion(k), [1, 1, 0]]);
  }

  const data = new Float32Array(facets.length * 3 * GEM_FLOATS_PER_VERTEX);
  const bary: Vec3[] = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  let offset = 0;

  for (const [v0, v1, v2, mask] of facets) {
    const centroid: Vec3 = [
      (v0[0] + v1[0] + v2[0]) / 3,
      (v0[1] + v1[1] + v2[1]) / 3,
      (v0[2] + v1[2] + v2[2]) / 3,
    ];
    const outward = sub(centroid, inside);
    const raw = normalize(cross(sub(v1, v0), sub(v2, v0)));
    const facesOut = raw[0] * outward[0] + raw[1] * outward[1] + raw[2] * outward[2] >= 0;

    // normal para fora e sentido anti-horário; ao trocar dois vértices, a máscara troca junto
    const vertices: Vec3[] = facesOut ? [v0, v1, v2] : [v0, v2, v1];
    const edges: EdgeMask = facesOut ? mask : [mask[0], mask[2], mask[1]];
    const normal: Vec3 = facesOut ? raw : [-raw[0], -raw[1], -raw[2]];

    vertices.forEach((vertex, index) => {
      data.set([...vertex, ...normal, ...bary[index], ...edges], offset);
      offset += GEM_FLOATS_PER_VERTEX;
    });
  }

  return { data, vertexCount: facets.length * 3 };
}

export type Mat4 = Float32Array;

export function multiply(a: Mat4, b: Mat4): Mat4 {
  const out = new Float32Array(16);
  for (let column = 0; column < 4; column += 1) {
    for (let row = 0; row < 4; row += 1) {
      let sum = 0;
      for (let k = 0; k < 4; k += 1) sum += a[k * 4 + row] * b[column * 4 + k];
      out[column * 4 + row] = sum;
    }
  }
  return out;
}

export function rotationX(angle: number): Mat4 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
}

export function rotationY(angle: number): Mat4 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
}

export function rotationZ(angle: number): Mat4 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return new Float32Array([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}

/** Projeção em perspectiva com a câmera em z = distance, olhando para a origem (aspecto 1:1). */
export function perspectiveFromDistance(
  fovY: number,
  distance: number,
  near = 0.1,
  far = 20
): Mat4 {
  const f = 1 / Math.tan(fovY / 2);
  const view = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -distance, 1]);
  const projection = new Float32Array([
    f,
    0,
    0,
    0,
    0,
    f,
    0,
    0,
    0,
    0,
    (far + near) / (near - far),
    -1,
    0,
    0,
    (2 * far * near) / (near - far),
    0,
  ]);
  return multiply(projection, view);
}
