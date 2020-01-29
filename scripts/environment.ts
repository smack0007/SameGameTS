import * as path from 'path';

export const respositoryRootDirectory = path.join(__dirname, "..");

export function outputEnvironmentVariables(output: (x: string) => void = console.info) {
    output('\n=== Environment ===');
    output(`respositoryRootDirectory = '${respositoryRootDirectory}'`);
    output('======\n');
}