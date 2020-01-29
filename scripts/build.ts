import { chdir } from 'process';
import { outputEnvironmentVariables, respositoryRootDirectory } from './environment';
import { copyFile, exec, copyDir } from './util';

outputEnvironmentVariables();
chdir(respositoryRootDirectory);

async function compile(): Promise<void> {
    const { stdout, stderr } = await exec('compile.cmd');
    console.log(stdout);
    console.error(stderr);
}

async function copyFiles(): Promise<void> {
    await copyFile('src/index.html', 'bin/index.html');
    await copyFile('src/nwjs.package.json', 'bin/package.json');

    await copyDir('assets', 'bin/assets');
}

async function build() {
    await compile();
    await copyFiles();
}

build();