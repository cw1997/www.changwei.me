import path from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/nextjs-vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/nextjs-vite",
  "staticDirs": [
    "..\\public"
  ],
  async viteFinal(viteConfig) {
    const imageMockPath = path.resolve(dirname, "./NextImageMock.tsx");

    viteConfig.resolve ??= {};
    if (!viteConfig.resolve.alias) {
      viteConfig.resolve.alias = {};
    }

    if (Array.isArray(viteConfig.resolve.alias)) {
      viteConfig.resolve.alias.push({
        find: "next/image",
        replacement: imageMockPath,
      });
    } else {
      viteConfig.resolve.alias["next/image"] = imageMockPath;
    }

    return viteConfig;
  },
};
export default config;