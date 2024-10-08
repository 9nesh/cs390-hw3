# CS390 - Homework 3: Rotating 3D Cube with WebGL

This project demonstrates a rotating 3D cube implemented using WebGL. The cube rotates around a fixed point, with each face colored differently.

## Setup and Running

1. Clone the repository:
   ```
   git clone https://github.com/9nesh/cs390-hw3.git
   ```
2. Navigate to the project directory:
   ```
   cd cs390-hw3
   ```

3. Ensure you have a web server set up to serve the files. You can use Python's built-in HTTP server:
   ```
   python -m http.server
   ```
   Alternatively, if you're using Visual Studio Code, you can use the Live Server extension.

4. Open `index.html` in a web browser through the web server.       


## Features

- 3D cube rendering using WebGL
- Continuous rotation animation
- Custom shader implementation for vertex and fragment shaders
- Modular code structure with separate files for shaders and rotation logic

## Files

- `index.html`: The main HTML file that sets up the canvas and includes necessary scripts
- `main.js`: The core JavaScript file that initializes WebGL and sets up the rendering pipeline
- `vertex-shader.glsl`: The vertex shader source code
- `fragment-shader.glsl`: The fragment shader source code
- `rotation-library.glsl`: A GLSL library containing rotation-related functions
- `shaders/initShaders.js`: A utility module for initializing shaders

## Setup and Running

1. Ensure you have a web server set up to serve the files. You can use Python's built-in HTTP server:
   ```
   python -m http.server
   ```
   Alternatively, if you're using Visual Studio Code, you can use the Live Server extension.

2. Open `index.html` in a web browser through the web server.

## Implementation Details

- The cube is defined by vertices, colors, and indices in `main.js`.
- Rotation is implemented using a custom rotation matrix calculation in `rotation-library.glsl`.
- The vertex shader (`vertex-shader.glsl`) applies the rotation to each vertex.
- The fragment shader (`fragment-shader.glsl`) applies the interpolated colors to each fragment.

## Dependencies

- WebGL: For 3D graphics rendering
- gl-matrix library: For matrix and vector operations (included via CDN in `index.html`)

