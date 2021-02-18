import { exec as execOriginal } from "child_process";
import { copyFile as copyFileOriginal, lstatSync, PathLike, mkdir as mkdirOriginal, readdirSync, readlinkSync, symlinkSync } from "fs";
import { join } from "path";
import { promisify } from "util";

export const exec = promisify(execOriginal);

const copyFilePromise = promisify(copyFileOriginal);
export const copyFile = function (src: string, dst: string): Promise<void> {
    console.info(`${src} => ${dst}`);
    return copyFilePromise(src, dst);
};

export const copyDir = async function (src: string, dest: string): Promise<void> {
    await mkdir(dest);
    const files = readdirSync(src);
    for (const file of files) {
        const current = lstatSync(join(src, file));
        if (current.isDirectory()) {
            await copyDir(join(src, file), join(dest, file));
        } else if (current.isSymbolicLink()) {
            const symlink = readlinkSync(join(src, file));
            symlinkSync(symlink, join(dest, file));
        } else {
            await copyFile(join(src, file), join(dest, file));
        }
    }
};

const mkdirPromise = promisify(mkdirOriginal);
export const mkdir = function (dir: PathLike): Promise<void> {
    console.info(`Create directory ${dir}`);
    return mkdirPromise(dir, 755).catch((error) => {
        if (error.code !== "EEXIST") {
            console.error(`mkdir: Error: ${error}`);
            throw error;
        }
    });
};
