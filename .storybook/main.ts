import path from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/nextjs-vite";
import { mergeAlias } from "vite";

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

    // Storybook's Next image plugin emits Windows paths unescaped in virtual modules.
    viteConfig.plugins ??= [];
    viteConfig.plugins.push({
      name: "normalize-next-image-windows-paths",
      enforce: "pre",
      transform(code, id) {
        if (!id.startsWith("\0virtual:next-image:")) return;
        return code.replace(/^(import src from ")([A-Za-z]:\\[^"\n]+)(";)/m, (_match, prefix, imagePath, suffix) =>
          `${prefix}${imagePath.replaceAll("\\", "/")}${suffix}`,
        );
      },
    });

    viteConfig.resolve ??= {};
    viteConfig.resolve.alias = mergeAlias(viteConfig.resolve.alias, {
      "@": path.resolve(dirname, "../src"),
      "next/image": imageMockPath,
    });

    return viteConfig;
  },
};
export default config;
