import { canvas, ctx } from "./main";

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
      };
    };
    reader.readAsDataURL(file);
  }