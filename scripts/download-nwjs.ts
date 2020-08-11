import { httpGet } from "./utils/http";

const versionRegex = new RegExp('href\\=\\"v([^/]+)/\\"', "g");

httpGet("https://dl.nwjs.io").then(html => {
    const versions: string[] = [];
    
    let result;
    while (result = versionRegex.exec(html)) {
        if (result[1].indexOf('-') === -1) {
            versions.push(result[1]);
        }
    }

    return versions;
}).then(versions => {
    console.info('Newest version: ' + versions[versions.length - 1]);
});

