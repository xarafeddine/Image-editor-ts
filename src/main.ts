import { applyFilter, handleAdjustments, handleUpload } from "./utils";

console.log("hello image editor");


export const canvas = document.getElementById("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d")!;

export const brightness = document.getElementById(
  "brightness"
) as HTMLInputElement;
export const contrast = document.getElementById("contrast") as HTMLInputElement;

const upload = document.getElementById("upload") as HTMLInputElement;
const grayscale = document.getElementById("grayscale") as HTMLButtonElement;
const sepia = document.getElementById("sepia") as HTMLButtonElement;
const blur = document.getElementById("blur") as HTMLButtonElement;

upload.addEventListener("change", handleUpload);

grayscale.addEventListener("click", () => applyFilter("grayscale(100%)"));
sepia.addEventListener("click", () => applyFilter("sepia(100%)"));
blur.addEventListener("click", () => applyFilter("blur(5px)"));

brightness.addEventListener("input", handleAdjustments);
contrast.addEventListener("input", handleAdjustments);
