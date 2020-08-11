import * as http from "https";

export const httpGet = function(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const request = http.get(url, response => {
            let content = "";

            response.setEncoding("utf-8");

            response.on("data", chunk => {
                content += chunk;
            });

            response.on("end", () => {
                resolve(content);
            });
        }).on("error", error => {
            reject(error);
        });

        request.end();
    });
};

