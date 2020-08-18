import { chdir } from 'process';
import { outputEnvironmentVariables, respositoryRootDirectory } from './environment';
import { FileSystem } from './utils/FileSystem';

outputEnvironmentVariables();
chdir(respositoryRootDirectory);

async function copyFiles(): Promise<void> {
    await FileSystem.copyFile('src/index.html', 'bin/index.html');
    await FileSystem.copyFile('src/nwjs.package.json', 'bin/package.json');

    await FileSystem.copyDirectory('assets', 'bin/assets');
}

async function build() {
    await copyFiles();
}

build();