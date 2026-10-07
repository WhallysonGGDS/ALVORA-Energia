import type { NextConfig } from "next";

// STATIC_EXPORT=1 gera uma versão estática (preview). O padrão usa a otimização do next/image (AVIF/WebP).
const isExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export", images: { unoptimized: true } } : {}),
  images: isExport
    ? { unoptimized: true }
    : { formats: ["image/avif", "image/webp"], deviceSizes: [640, 828, 1080, 1440, 1920, 2400] },
};

export default nextConfig;
