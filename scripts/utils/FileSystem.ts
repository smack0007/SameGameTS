
import { copyFile, lstatSync, mkdir, readdir, readdirSync, readlinkSync, symlinkSync, rename, unlink, stat, lstat, exists, rmdir } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

const copyFilePromise = promisify(copyFile);
const mkdirPromise = promisify(mkdir);
const renamePromise = promisify(rename);

export class FileSystem {
	public static copyFile(src: string, dst: string): Promise<void> {
		return copyFilePromise(src, dst);
	}

	public static async copyDirectory(src: string, dest: string): Promise<void> {
		await FileSystem.createDirectory(dest);
		var files = readdirSync(src);
		for (var i = 0; i < files.length; i++) {
			var current = lstatSync(join(src, files[i]));
			if(current.isDirectory()) {
				await FileSystem.copyDirectory(join(src, files[i]), join(dest, files[i]));
			} else if(current.isSymbolicLink()) {
				var symlink = readlinkSync(join(src, files[i]));
				symlinkSync(symlink, join(dest, files[i]));
			} else {
				await FileSystem.copyFile(join(src, files[i]), join(dest, files[i]));
			}
		}
	}

	public static createDirectory(path: string): Promise<void> {
		return mkdirPromise(path, 755).catch((error) => {
			if (error.code !== 'EEXIST') {
				throw error;
			}
		});
	}

	public static createDirectoryIfNotExists(path: string): Promise<void> {
		return new Promise((resolve) => {
			FileSystem.exists(path).then(exists => {
				if (!exists) {
					FileSystem.createDirectory(path).then(() => resolve());
				} else {
					resolve();
				}
			});
		});
	}

	public static deleteFile(path: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			unlink(path, (err) => {
				if (err) {
					reject(err);
					return;
				}

				resolve();
			});
		});
	}

	public static deleteDirectory(path: string, recursive: boolean = false): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			rmdir(path, { recursive: recursive }, (err) => {
				if (err) {
					reject(err);
					return;
				}

				resolve();
			});
		});
	}

	public static deleteDirectoryIfExists(path: string, recursive: boolean = false): Promise<void> {
		return new Promise((resolve) => {
			FileSystem.exists(path).then(exists => {
				if (exists) {
					FileSystem.deleteDirectory(path, recursive).then(() => resolve());
				} else {
					resolve();
				}
			});
		});
	}

	public static exists(path: string): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			exists(path, (exists) => {
				resolve(exists);
			});
		});
	}

	public static getEntries(dir: string): Promise<string[]> {
		return new Promise<string[]>((resolve, reject) => {
			readdir(dir, (err, files) => {
				if (err) {
					reject(err);
					return;
				}

				resolve(files);
			});
		});
	}

	public static rename(oldPath: string, newPath: string): Promise<void> {
		return renamePromise(oldPath, newPath);
	}
}