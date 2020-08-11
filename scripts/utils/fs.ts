import { exec as execOriginal } from 'child_process';
import { copyFile as copyFileOriginal, lstatSync, PathLike, mkdir as mkdirOriginal, readdirSync, readlinkSync, symlinkSync } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

export const exec = promisify(execOriginal);

const copyFilePromise = promisify(copyFileOriginal);
export const copyFile = function(src: string, dst: string): Promise<void> {
    console.info(`${src} => ${dst}`);
    return copyFilePromise(src, dst);
};

export const copyDir = async function(src: string, dest: string): Promise<void> {
	await mkdir(dest);
	var files = readdirSync(src);
	for (var i = 0; i < files.length; i++) {
		var current = lstatSync(join(src, files[i]));
		if(current.isDirectory()) {
			await copyDir(join(src, files[i]), join(dest, files[i]));
		} else if(current.isSymbolicLink()) {
			var symlink = readlinkSync(join(src, files[i]));
			symlinkSync(symlink, join(dest, files[i]));
		} else {
			await copyFile(join(src, files[i]), join(dest, files[i]));
		}
	}
};

const mkdirPromise = promisify(mkdirOriginal);
export const mkdir = function(dir: PathLike): Promise<void> {
    console.info(`Create directory ${dir}`);
    return mkdirPromise(dir, 755).catch((error) => {
        if (error.code !== 'EEXIST') {
            console.error(`mkdir: Error: ${error}`);
            throw error;
        }
    });
};
