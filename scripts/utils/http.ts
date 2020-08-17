import * as fs from "fs";
import * as http from "https";
import * as https from "https";

export interface FileInfo {
    path: string;
    mime: string;
    size: number;
}

function getProtocol(url: string): typeof http {
    return !url.charAt(4).localeCompare("s") ? https : http;
}

export const httpDownload = function (url: string, filePath: string): Promise<FileInfo> {
    const protocol = getProtocol(url);

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        let fileInfo: FileInfo | null = null;

        const request = protocol.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(
                    new Error(`Failed to get '${url}' (${response.statusCode})`)
                );
                return;
            }

            fileInfo = {
                path: filePath,
                mime: response.headers["content-type"] as string,
                size: parseInt(response.headers["content-length"] as string, 10),
            };

            response.pipe(file);
        }).on("error", (err) => {
            fs.unlink(filePath, () => reject(err));
        });

        file.on("finish", () => resolve(fileInfo as FileInfo));

        file.on("error", err => fs.unlink(filePath, () => reject(err)));

        request.end();
    });
};

export const httpGet = function (url: string): Promise<string> {
    const protocol = getProtocol(url);
    
    return new Promise<string>((resolve, reject) => {
        const request = protocol
            .get(url, (response) => {
                let content = "";

                response.setEncoding("utf-8");

                response.on("data", (chunk) => {
                    content += chunk;
                });

                response.on("end", () => {
                    resolve(content);
                });
            })
            .on("error", (error) => {
                reject(error);
            });

        request.end();
    });
};
