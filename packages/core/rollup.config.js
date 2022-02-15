import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import buildin from "rollup-plugin-node-builtins";
import pkg from "./package.json";
import path from "path";
const production = !process.env.ROLLUP_WATCH;
export default [
    // browser-friendly UMD build
    {
        input: "src/index.ts",
        output: {
            name: "core",
            file: pkg.browser,
            format: "umd",
            sourcemap: !production,
        },
        plugins: [
            resolve(), // so Rollup can find `ms`
            buildin(),
            commonjs(), // so Rollup can convert `ms` to an ES module
            typescript({
                sourceMap: !production,
                inlineSources: !production,
            }), // so Rollup can convert TypeScript to JavaScript
        ],
    },

    {
        input: "src/index.ts",
        // external: ["ms"],
        plugins: [
            resolve(), // so Rollup can find `ms`

            commonjs(), // so Rollup can convert `ms` to an ES module
            typescript({
                sourceMap: !production,
                inlineSources: !production,
            }), // so Rollup can convert TypeScript to JavaScript
        ],
        output: [
            { file: pkg.main, format: "cjs", sourcemap: !production },
            { file: pkg.module, format: "es", sourcemap: !production },
        ],
    },
];
