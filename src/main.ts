import {
  handleUpload,
  handleAdjustments,
  applyFilter,
  undo,
  redo,
  saveImage,
} from "./utils";

console.log("hello image editor");

export const canvas = document.getElementById("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d")!;

const upload = document.getElementById("upload") as HTMLInputElement;
export const brightness = document.getElementById(
  "brightness"
) as HTMLInputElement;
export const contrast = document.getElementById("contrast") as HTMLInputElement;
const grayscale = document.getElementById("grayscale") as HTMLButtonElement;
const sepia = document.getElementById("sepia") as HTMLButtonElement;
const blur = document.getElementById("blur") as HTMLButtonElement;
const undoButton = document.getElementById("undo") as HTMLButtonElement;
const redoButton = document.getElementById("redo") as HTMLButtonElement;
const saveButton = document.getElementById("save") as HTMLButtonElement;

upload.addEventListener("change", handleUpload);
brightness.addEventListener("input", handleAdjustments);
contrast.addEventListener("input", handleAdjustments);
grayscale.addEventListener("click", () => applyFilter("grayscale(100%)"));
sepia.addEventListener("click", () => applyFilter("sepia(100%)"));
blur.addEventListener("click", () => applyFilter("blur(5px)"));
undoButton.addEventListener("click", undo);
redoButton.addEventListener("click", redo);
saveButton.addEventListener("click", saveImage);
