import { chdir } from 'process';
import { outputEnvironmentVariables, respositoryRootDirectory } from './environment';
import { copyFile, exec, copyDir } from './utils/fs';

outputEnvironmentVariables();
chdir(respositoryRootDirectory);

async function copyFiles(): Promise<void> {
    await copyFile('src/index.html', 'bin/index.html');
    await copyFile('src/nwjs.package.json', 'bin/package.json');

    await copyDir('assets', 'bin/assets');
}

async function build() {
    await copyFiles();
}

build();