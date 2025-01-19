import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        GEMINI_API_KEY: process.env.GEMINI_API_KEY,
        POLYGON_API_KEY: process.env.POLYGON_API_KEY,
    },
};

export default nextConfig;
