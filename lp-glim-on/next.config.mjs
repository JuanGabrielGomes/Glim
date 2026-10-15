import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A LP mora numa subpasta do repositório do site da glim.: a raiz do projeto é esta pasta.
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  images: {
    // Capa da VSL no YouTube: a miniatura do próprio vídeo.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
};

export default nextConfig;
