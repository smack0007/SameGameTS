const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
const graphics = canvas.getContext("2d") as CanvasRenderingContext2D;

const blockImage: HTMLImageElement = document.getElementById("blockImage") as HTMLImageElement;

enum BlockColors {
  red = 0,
  blue,
  green,
  yellow
}

function init() {
  graphics.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let y = 0; y < 768; y += 32) {
    for (let x = 0; x < 1024; x += 32) {      
      graphics.drawImage(blockImage, 0, 0, 32, 32, x, y, 32, 32);

      const blockColor = Math.floor(Math.random() * 4) as BlockColors;

      const imageData = graphics.getImageData(x, y, 32, 32);

      for (let i = 0; i < imageData.data.length; i += 4) {
        switch (blockColor) {
          case BlockColors.red:
            imageData.data[i + 1] = 0;
            imageData.data[i + 2] = 0;
            break;

          case BlockColors.blue:
            imageData.data[i + 0] = 0;
            imageData.data[i + 2] = 0;
            break;

          case BlockColors.green:
            imageData.data[i + 0] = 0;
            imageData.data[i + 1] = 0;
            break;

          case BlockColors.yellow:
            imageData.data[i + 2] = 0;
            break;
        }
        
      }

      graphics.putImageData(imageData, x, y);
    }
  }
}

init();
