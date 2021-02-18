import * as path from "path";
import { chdir } from "process";
import { copyFile, exec, copyDir } from "./util.js";

export const respositoryRootDirectory = path.join(__dirname, "..");
chdir(respositoryRootDirectory);

main();

async function main() {
    await compile();
    await copyFiles();
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
