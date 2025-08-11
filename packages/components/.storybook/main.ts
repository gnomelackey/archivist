/* eslint-disable @typescript-eslint/no-explicit-any */

import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

const config: StorybookConfig = {
  framework: "@storybook/react-webpack5",
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  babel: async (options) => ({
    ...options,
    presets: [
      ...(options.presets ?? []),
      [require.resolve("@babel/preset-react"), { runtime: "automatic" }],
      require.resolve("@babel/preset-typescript"),
    ],
  }),
  webpackFinal: async (cfg) => {
    cfg.module = cfg.module || { rules: [] };

    cfg.resolve = cfg.resolve || {};
    cfg.resolve.symlinks = false;
    cfg.resolve.extensions = [...(cfg.resolve.extensions || []), ".ts", ".tsx"];
    cfg.module.rules ??= [];

    const rules: any = cfg.module?.rules ?? [];
    const cssRule = rules.find(
      (r: any) =>
        r &&
        r.test &&
        r.test instanceof RegExp &&
        r.test.test(".css") &&
        Array.isArray(r.use)
    );

    if (!cssRule) {
      throw new Error("Could not locate Storybook's default CSS rule");
    }

    cssRule.use = [
      require.resolve("style-loader"),
      { loader: require.resolve("css-loader"), options: { importLoaders: 1 } },
      {
        loader: require.resolve("postcss-loader"),
        options: {
          postcssOptions: {
            plugins: {
              "@tailwindcss/postcss": {},
            },
          },
        },
      },
    ];

    cssRule.include = [
      path.resolve(__dirname, ".."),
      path.resolve(__dirname, "..", "..", "packages/ui"),
    ];

    cfg.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [
            require.resolve("@babel/preset-env"),
            [require.resolve("@babel/preset-react"), { runtime: "automatic" }],
            require.resolve("@babel/preset-typescript"),
          ],
        },
      },
    });

    return cfg;
  },
};

export default config;
