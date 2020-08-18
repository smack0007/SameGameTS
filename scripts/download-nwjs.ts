import { respositoryRootDirectory } from './environment';
import { httpGet, httpDownload } from "./utils/http";

const versionRegex = new RegExp('href\\=\\"v([^/]+)/\\"', "g");

const baseUrl = "https://dl.nwjs.io";

const nwjsPath = `${respositoryRootDirectory}/ext/nwjs/`;

httpGet(baseUrl).then(html => {
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

    const zipUrl = `${baseUrl}/v${newestVersion}/nwjs-sdk-v${newestVersion}-win-x64.zip`;
    const destPath = `${nwjsPath}/sdk/nwjs.zip`;
    console.info(`${zipUrl} => ${destPath}`);    
    return httpDownload(zipUrl, destPath);
}).then(x => {
    console.info("Download finished.");
});