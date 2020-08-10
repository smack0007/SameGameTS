import { Board } from './Game/Board';
import { BlockColors } from './Game/BlockColors';

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
canvas.addEventListener('mousedown', onCanvasMouseDown);

const graphics = canvas.getContext("2d") as CanvasRenderingContext2D;

const blockImage: HTMLImageElement = document.getElementById("blockImage") as HTMLImageElement;

const board = new Board();

function init() {
  graphics.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let y = 0; y < Board.Height; y++) {
    for (let x = 0; x < Board.Width; x++) {      
      const block = board.getBlock(x, y);
      const xOffset = x * 32;
      const yOffset = y * 32;

      graphics.drawImage(blockImage, 0, 0, 32, 32, xOffset, yOffset, 32, 32);

      const imageData = graphics.getImageData(xOffset, yOffset, 32, 32);

      for (let i = 0; i < imageData.data.length; i += 4) {
        switch (block.Color) {
          case BlockColors.Red:
            imageData.data[i + 1] = 0;
            imageData.data[i + 2] = 0;
            break;

          case BlockColors.Blue:
            imageData.data[i + 0] = 0;
            imageData.data[i + 2] = 0;
            break;

          case BlockColors.Green:
            imageData.data[i + 0] = 0;
            imageData.data[i + 1] = 0;
            break;

          case BlockColors.Yellow:
            imageData.data[i + 2] = 0;
            break;
        }
        
      }

      graphics.putImageData(imageData, xOffset, yOffset);
    }
  }
}

function onCanvasMouseDown(event: MouseEvent) {
  console.info(event);
}

init();
 