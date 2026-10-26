import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  // O endereço padrão da Vercel responde com o mesmo site; redireciona pro domínio oficial
  // pra o Google não indexar (nem escolher como canônico) o glim-six.vercel.app.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'glim-six.vercel.app' }],
        destination: 'https://www.glimweb.com/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    qualities: [75, 90],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
