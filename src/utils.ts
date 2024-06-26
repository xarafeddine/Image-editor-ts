import {
  canvas,
  ctx,
  brightness,
  contrast,
  redoHistory,
  currentHistory,
} from "./main";

let originalImage: { data: ImageData | null } = { data: null };

let currentBrightness = 0;
let currentContrast = 0;

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
      originalImage.data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      saveHistory(originalImage.data, 0, 0);
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
  if (!originalImage.data) return;
  ctx.putImageData(originalImage.data, 0, 0);
  ctx.filter = filter;
  ctx.drawImage(canvas, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  saveHistory(imageData, currentBrightness, currentContrast);
}

export function undo() {
  if (currentHistory.length > 1) {
    redoHistory.push(currentHistory.pop()!);
    const lastState = currentHistory[currentHistory.length - 1];
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
    currentHistory.push(nextState);
    ctx.putImageData(nextState.imageData, 0, 0);
    brightness.value = nextState.brightness.toString();
    contrast.value = nextState.contrast.toString();
    currentBrightness = nextState.brightness;
    currentContrast = nextState.contrast;
  }
}

export function saveHistory(
  imageData: ImageData,
  brightness: number,
  contrast: number
) {
  currentHistory.push({
    imageData: new ImageData(
      new Uint8ClampedArray(imageData.data),
      imageData.width,
      imageData.height
    ),
    brightness,
    contrast,
  });
  redoHistory.length = 0; // Clear the redo currentHistory
}

export function applyBrightnessContrast(brightness: number, contrast: number) {
  if (!originalImage.data) return;

  ctx.putImageData(originalImage.data, 0, 0);
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
