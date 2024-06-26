import { handleUpload } from "./utils";

console.log("hello image editor");
const upload = document.getElementById("upload") as HTMLInputElement;
export const canvas = document.getElementById("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d")!;

upload.addEventListener("change", handleUpload);
