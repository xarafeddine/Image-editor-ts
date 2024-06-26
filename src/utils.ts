import { brightness, canvas, contrast, ctx } from "./main";

export let originalImageData: ImageData;

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
    };
  };
  reader.readAsDataURL(file);
}

export function applyFilter(filter: string) {
  ctx.filter = filter;
  ctx.drawImage(canvas, 0, 0);
}

export function handleAdjustments() {
  let currentBrightness = Number(brightness.value);
  let currentContrast = Number(contrast.value);
  applyBrightnessContrast(currentBrightness, currentContrast);
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
}

export function clamp(value: number): number {
  return Math.max(0, Math.min(255, value));
}
