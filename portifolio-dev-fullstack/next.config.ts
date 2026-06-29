import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // We have a lockfile both at the repo root and in this app folder, so Next
  // can't infer the workspace root. Pin it to this folder to silence the warning
  // and make file tracing correct.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
