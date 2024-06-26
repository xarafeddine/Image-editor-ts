import "./style.css";
import {
  handleUpload,
  handleAdjustments,
  applyFilter,
  undo,
  redo,
} from "./utils";

console.log("hello image editor");

export const currentHistory: {
  imageData: ImageData;
  brightness: number;
  contrast: number;
}[] = [];
export const redoHistory: {
  imageData: ImageData;
  brightness: number;
  contrast: number;
}[] = [];

export const canvas = document.getElementById("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d")!;

export const upload = document.getElementById("upload") as HTMLInputElement;
upload.addEventListener("change", handleUpload);

export const brightness = document.getElementById(
  "brightness"
) as HTMLInputElement;
export const contrast = document.getElementById("contrast") as HTMLInputElement;
brightness.addEventListener("input", handleAdjustments);
contrast.addEventListener("input", handleAdjustments);

const grayscale = document.getElementById("grayscale") as HTMLButtonElement;
const sepia = document.getElementById("sepia") as HTMLButtonElement;
const blur = document.getElementById("blur") as HTMLButtonElement;
grayscale.addEventListener("click", () => applyFilter("grayscale(100%)"));
sepia.addEventListener("click", () => applyFilter("sepia(100%)"));
blur.addEventListener("click", () => applyFilter("blur(5px)"));

const undoButton = document.getElementById("undo") as HTMLButtonElement;
const redoButton = document.getElementById("redo") as HTMLButtonElement;
undoButton.addEventListener("click", undo);
redoButton.addEventListener("click", redo);
