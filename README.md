# Image Editor Web App

An image editor web app built using Vite, HTML, SCSS, and TypeScript. The image editor allows users to upload images, apply various filters, adjust brightness/contrast, and save the edited images.

## Features

- **Image Upload:** Users can upload images from their local device.
- **Filter Application:** Apply filters such as grayscale, sepia, blur, etc.
- **Brightness/Contrast Adjustment:** Adjust brightness and contrast using sliders.
- **Undo/Redo Functionality:** Undo and redo edits.
- **Save Image:** Save the edited image.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Bun](https://bun.sh/) (optional)

### Installation

1.  Clone the repository:

```sh
    git clone https://github.com/xarafeddine/Image-editor-ts

    cd Image-editor-ts
```

2.  Install dependencies:

```sh
    bun install
```

or if using npm:

```sh
    npm install
```

### Running the App

To start the development server, run:

```sh
    bun dev
```

or if using npm:

```sh
    npm run dev
```

The app will be available at http://localhost:<port>.

### Usage

Upload Image: Click the "Upload" button and select an image from your device.

Apply Filters: Use the filter buttons to apply effects like grayscale, sepia, and blur.

Adjust Brightness/Contrast: Use the sliders to adjust the brightness and contrast of the image.

Undo/Redo: Use the undo and redo buttons to revert or reapply edits.

Save Image: Click the "Save" button to download the edited image.
