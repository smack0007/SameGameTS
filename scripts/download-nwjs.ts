import { respositoryRootDirectory } from './environment';
import { Http } from "./utils/Http";
import { FileSystem } from './utils/FileSystem';
import * as extractZip from "extract-zip";
import { version } from 'os';

const versionRegex = new RegExp('href\\=\\"v([^/]+)/\\"', "g");

const baseUrl = "https://dl.nwjs.io";

const nwjsPath = `${respositoryRootDirectory}/ext/nwjs/`;

const platforms = [
    'win-x64'
];

console.info("Deleting current versions...");
Promise.all(platforms.map(platform => 
    FileSystem.exists(`${nwjsPath}/${platform}`).then(exists => {
        if (exists) {
            FileSystem.deleteDirectory(`${nwjsPath}/${platform}`, true);
        }
    })
)).then(() => {
    console.info("Creating platform directories...");
    return Promise.all(
        platforms.map(platform => {
            FileSystem.createDirectory(`${nwjsPath}/${platform}`);
        })
    );
}).then(() => {
    console.info("Fetching version list...");
    return Http.get(baseUrl);
}).then(html => {
    const versions: string[] = [];
    
    let result;
    while (result = versionRegex.exec(html)) {
        if (result[1].indexOf('-') === -1) {
            versions.push(result[1]);
        }
    }

    return versions;
}).then(versions => {
    const newestVersion = versions[versions.length - 1];
    console.info('Newest version: ' + newestVersion); 

    return Promise.all(platforms.map(platform => {
        const zipUrl = `${baseUrl}/v${newestVersion}/nwjs-sdk-v${newestVersion}-${platform}.zip`;
        const destPath = `${nwjsPath}/${platform}/nwjs-sdk.zip`;
        console.info(`${zipUrl} => ${destPath}`);   
        return Http.download(zipUrl, destPath).then(x => {
            return {
                version: newestVersion,
                platform: platform,
                zipPath: destPath
            };
        });
    }));
}).then(x => {
    console.info("Download finished. Unzipping...");

    return Promise.all(x.map(y => {
        return extractZip(y.zipPath, { dir: `${nwjsPath}/${y.platform}` }).then(() => y);
    }));
}).then(x => {
    console.info("Renaming zip output directories and removing zips...");
    
    return Promise.all(x.map(y => Promise.all([
        FileSystem.rename(`${nwjsPath}/${y.platform}/nwjs-sdk-v${y.version}-${y.platform}`, `${nwjsPath}/${y.platform}/sdk`),
        FileSystem.deleteFile(`${nwjsPath}/${y.platform}/nwjs-sdk.zip`)
    ])));
});