

export class AssetLoader {
    public static loadImages(...imageFileNames: string[]): Promise<HTMLImageElement[]> {
        const promises: Promise<HTMLImageElement>[] = [];

        for (const imageFileName of imageFileNames) {
            promises.push(new Promise<HTMLImageElement>((resolve) => {
                const image = new Image();
                image.addEventListener("load", () => resolve(image));
                image.src = imageFileName;
            }));
        }

        return Promise.all(promises);
    }
}