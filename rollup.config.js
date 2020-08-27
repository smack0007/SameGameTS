import copy from "rollup-plugin-copy";
import sourcemap from "rollup-plugin-sourcemaps";

export default {
    input: "src/main.js",
    output: {
        file: "dist/app.js",
        format: "iife",
        sourcemap: true,
    },
    plugins: [
        sourcemap(),
        copy({
            targets: [
                {
                    src: "src/nwjs.package.json",
                    dest: "dist",
                    rename: "package.json",
                },
                { src: "src/index.html", dest: "dist" },
                { src: "assets/**", dest: "dist/assets" },
            ],
        }),
    ],
};
