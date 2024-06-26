import { canvas, ctx, brightness, contrast } from "./main";

export let originalImageData: ImageData;
export const history: {
  imageData: ImageData;
  brightness: number;
  contrast: number;
}[] = [];
export const redoHistory: {
  imageData: ImageData;
  brightness: number;
  contrast: number;
}[] = [];
export let currentBrightness = 0;
export let currentContrast = 0;

export function handleUpload(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (!files) return console.log("No file is found!?");
  const file = files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const image = new Image();
    image.src = e.target?.result as string;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      saveHistory(originalImageData, 0, 0);
    };
  };
  reader.readAsDataURL(file);
}

export function handleAdjustments() {
  currentBrightness = Number(brightness.value);
  currentContrast = Number(contrast.value);
  applyBrightnessContrast(currentBrightness, currentContrast);
}

export function applyFilter(filter: string) {
  ctx.putImageData(originalImageData, 0, 0);
  ctx.filter = filter;
  ctx.drawImage(canvas, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  saveHistory(imageData, currentBrightness, currentContrast);
}

export function undo() {
  if (history.length > 1) {
    redoHistory.push(history.pop()!);
    const lastState = history[history.length - 1];
    ctx.putImageData(lastState.imageData, 0, 0);
    brightness.value = lastState.brightness.toString();
    contrast.value = lastState.contrast.toString();
    currentBrightness = lastState.brightness;
    currentContrast = lastState.contrast;
  }
}

export function redo() {
  if (redoHistory.length > 0) {
    const nextState = redoHistory.pop()!;
    history.push(nextState);
    ctx.putImageData(nextState.imageData, 0, 0);
    brightness.value = nextState.brightness.toString();
    contrast.value = nextState.contrast.toString();
    currentBrightness = nextState.brightness;
    currentContrast = nextState.contrast;
  }
}

export function saveImage() {
  const link = document.createElement("a");
  link.href = canvas.toDataURL();
  link.download = "edited_image.png";
  link.click();
}

export function saveHistory(
  imageData: ImageData,
  brightness: number,
  contrast: number
) {
  history.push({
    imageData: new ImageData(
      new Uint8ClampedArray(imageData.data),
      imageData.width,
      imageData.height
    ),
    brightness,
    contrast,
  });
  redoHistory.length = 0; // Clear the redo history
}

export function applyBrightnessContrast(brightness: number, contrast: number) {
  ctx.putImageData(originalImageData, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  brightness = brightness / 100;
  contrast = contrast / 100;
  const contrastFactor = (259 * (contrast + 1)) / (255 * (1 - contrast));

  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(contrastFactor * (data[i] - 128) + 128 + brightness * 255); // Red
    data[i + 1] = clamp(
      contrastFactor * (data[i + 1] - 128) + 128 + brightness * 255
    ); // Green
    data[i + 2] = clamp(
      contrastFactor * (data[i + 2] - 128) + 128 + brightness * 255
    ); // Blue
  }

  ctx.putImageData(imageData, 0, 0);
  saveHistory(imageData, brightness, contrast);
}

export function clamp(value: number): number {
  return Math.max(0, Math.min(255, value));
}
