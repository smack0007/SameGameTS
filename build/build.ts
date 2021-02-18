import { readFile as _readFile, writeFile as _writeFile } from "fs";
import * as path from "path";
import { chdir } from "process";
import { copyFile, exec, copyDir, listFiles } from "./util.js";
import { promisify } from "util";

const readFile = promisify(_readFile);
const writeFile = promisify(_writeFile);

chdir(path.join(__dirname, ".."));

main();

async function main() {
    await updateImportStatements();
    await compile();
    await copyFiles();
}

async function updateImportStatements(): Promise<void> {
    const files = (await listFiles("src")).filter((x) => x.endsWith(".ts"));

    for (const file of files) {
        const data = await readFile(file, "utf8");

        // If no imports then nothing to do.
        if (!data.match(/import .* from\s+['"][.][\\/]/g)) {
            continue;
        }

        let shouldWrite = false;

        // All imports where the file name starts with "./"
        const newData = data.replace(/(import .* from\s+['"][.][\\/])(.*)(?=['"])/g, (substring) => {
            if (!substring.endsWith(".js")) {
                substring += ".js";
                shouldWrite = true;
            }

            return substring;
        });

        if (shouldWrite) {
            console.info(`Updating imports in ${file}`);
            await writeFile(file, newData);
        }
    }
}

async function compile(): Promise<void> {
    const { stdout, stderr } = await exec("tsc");
    console.log(stdout);
    console.error(stderr);
}

async function copyFiles(): Promise<void> {
    await copyFile("src/index.html", "dist/index.html");
    await copyFile("src/nwjs.package.json", "dist/package.json");

    await copyDir("assets", "dist/assets");
}
