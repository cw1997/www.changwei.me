// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { nextJsConfig } from "./eslint-config/next.js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    // 仅对 src 下的文件启用 ESLint；其余路径一律忽略
    ignores: ["**/*", "!src/**"],
  },
  ...nextJsConfig,
];
