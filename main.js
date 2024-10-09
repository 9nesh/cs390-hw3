// Import the initShaders function from the shader initialization module
import { initShaders } from './shaders/initShaders.js';

// Declare global variables
let gl; // WebGL context
let program; // Shader program
let rotationAngle = 0; // Current rotation angle
let fixedPoint, rotationAxis; // Rotation parameters
let xAxis, yAxis, zAxis, speed;
// Function to process shader source code

async function processShaderSource(source) {
    // Regular expression to find #include directives
    const includeRegex = /#include\s+"([^"]+)"/g;
    let match;
    // Loop through all matches
    while ((match = includeRegex.exec(source)) !== null) {
        const includePath = match[1]; // Extract the path from the directive
        const includeSource = await fetch(includePath).then(response => response.text()); // Fetch the source code
        source = source.replace(match[0], includeSource); // Replace the directive with the source code
    }
    return source; // return the processed source code
}

// Function to load shader sources
// I made the loadShaders function asynchronous because it fetches shader sources from external files. 
// Using await allows the code to wait for these shaders to load before proceeding. 
// This ensures that the shaders are available before the WebGL setup continues.

async function loadShaders() {
    const vertexShaderSource = await fetch('vertex-shader.glsl').then(response => response.text()); // Fetch vertex shader source
    const fragmentShaderSource = await fetch('fragment-shader.glsl').then(response => response.text()); // Fetch fragment shader source
    const processedVertexShaderSource = await processShaderSource(vertexShaderSource); // Process vertex shader source
    return { vertexShaderSource: processedVertexShaderSource, fragmentShaderSource }; // Return shader sources
}

// Main function to initialize WebGL and set up the shader program
// used async because fetch is async and initShaders is async and also, I used a .catch block 
// (see last line of this code) to handle any errors that occur during the asynchronous operations. 
// This makes ita clean way to catch and log errors from the entire initialization process.

async function main() {
    const canvas = document.getElementById('glCanvas'); // Get the canvas element
    gl = canvas.getContext('webgl'); // Get the WebGL context

    if (!gl) {
        console.error('Unable to initialize WebGL.');
        return;
    }

    const { vertexShaderSource, fragmentShaderSource } = await loadShaders(); // Load shader sources

    program = initShaders(gl, vertexShaderSource, fragmentShaderSource); // Initialize shaders
    
    if (!program) {
        console.error('Failed to initialize shaders');
        return;
    }
    
    gl.useProgram(program); // Use the shader program       

    // Set up cube vertices and colors
    // this is structured as a cube with 6 faces, each with 4 vertices and 4 colors 
    const vertices = [
        // Front face
        -0.5, -0.5,  0.5,
         0.5, -0.5,  0.5,
         0.5,  0.5,  0.5,
        -0.5,  0.5,  0.5,
        // Back face
        -0.5, -0.5, -0.5,
        -0.5,  0.5, -0.5,
         0.5,  0.5, -0.5,
         0.5, -0.5, -0.5,
        // Top face
        -0.5,  0.5, -0.5,
        -0.5,  0.5,  0.5,
         0.5,  0.5,  0.5,
         0.5,  0.5, -0.5,
        // Bottom face
        -0.5, -0.5, -0.5,
         0.5, -0.5, -0.5,
         0.5, -0.5,  0.5,
        -0.5, -0.5,  0.5,
        // Right face
         0.5, -0.5, -0.5,
         0.5,  0.5, -0.5,
         0.5,  0.5,  0.5,
         0.5, -0.5,  0.5,
        // Left face
        -0.5, -0.5, -0.5,
        -0.5, -0.5,  0.5,
        -0.5,  0.5,  0.5,
        -0.5,  0.5, -0.5
    ];

    // colors array specifies the color of each vertex in the cube. 
    // Each set of four values in the array represents the RGBA color components for a vertex.
    const colors = [
        // Front face (red)
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        // Back face (green)
        0.0, 1.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        // Top face (blue)
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        // Bottom face (yellow)
        1.0, 1.0, 0.0, 1.0,
        1.0, 1.0, 0.0, 1.0,
        1.0, 1.0, 0.0, 1.0,
        1.0, 1.0, 0.0, 1.0,
        // Right face (magenta)
        1.0, 0.0, 1.0, 1.0,
        1.0, 0.0, 1.0, 1.0,
        1.0, 0.0, 1.0, 1.0,
        1.0, 0.0, 1.0, 1.0,
        // Left face (cyan)
        0.0, 1.0, 1.0, 1.0,
        0.0, 1.0, 1.0, 1.0,
        0.0, 1.0, 1.0, 1.0,
        0.0, 1.0, 1.0, 1.0
    ];

    // indices array specifies which vertices to connect to form triangles. 
// Each set of three indices in the array represents a triangle.
    const indices = [
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23    // left
    ];

    // Create and bind vertex buffer
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Create and bind color buffer
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    // Create and bind index buffer
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // Set up attribute pointers
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionAttributeLocation); // Enable the attribute

    const colorAttributeLocation = gl.getAttribLocation(program, 'a_color'); // Get the attribute location
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer); // Bind the color buffer
    gl.vertexAttribPointer(colorAttributeLocation, 4, gl.FLOAT, false, 0, 0); // Set up the attribute pointer
    gl.enableVertexAttribArray(colorAttributeLocation); // Enable the attribute

    // Set up uniform locations
    const fixedPointLocation = gl.getUniformLocation(program, 'u_fixedPoint');
    const rotationAxisLocation = gl.getUniformLocation(program, 'u_rotationAxis');
    const rotationAngleLocation = gl.getUniformLocation(program, 'u_rotationAngle');

    // Set initial values for rotation
    fixedPoint = [0.0, 0.0, 0.0];
    rotationAxis = [1.0, 1.0, 1.0]; // vector along the main diagonal of the unit cube
    gl.uniform3fv(fixedPointLocation, fixedPoint);
    gl.uniform3fv(rotationAxisLocation, rotationAxis);

    function setupControls() {
        xAxis = document.getElementById('xAxis');
        yAxis = document.getElementById('yAxis');
        zAxis = document.getElementById('zAxis');
        speed = document.getElementById('speed');
    
        [xAxis, yAxis, zAxis, speed].forEach(control => {
            control.addEventListener('input', updateRotationParameters);
        });
    }
    
    function updateFactDisplay() {
        document.getElementById('rotationAxisDisplay').textContent = `[${rotationAxis.map(v => v.toFixed(2))}]` + " (normalized)"; // display the rotation axis as a vector by using map to convert each component to a string with two decimal places. 
        document.getElementById('rotationAngleDisplay').textContent = ((rotationAngle * 180 / Math.PI) % 360).toFixed(2) + " degrees"; // display the rotation angle in degrees instead of radians
        document.getElementById('rotationSpeedDisplay').textContent = speed.value + " (radians per frame)"; // display the rotation speed
    }

    function updateRotationParameters() {
        // update the rotation axis based on the values of the x, y, and z axis controls
        // Setting X to 1 and others to 0 rotates around the X-axis
        // Setting Y to 1 and others to 0 rotates around the Y-axis
        // Setting Z to 1 and others to 0 rotates around the Z-axis
        // Setting all to 1 rotates around the diagonal of the cube
        rotationAxis = [
            parseFloat(xAxis.value),
            parseFloat(yAxis.value),
            parseFloat(zAxis.value)
        ];
        gl.uniform3fv(rotationAxisLocation, rotationAxis);
        updateFactDisplay();
    }
    
    setupControls();
    updateRotationParameters();

    function render() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        rotationAngle += parseFloat(speed.value); 
        gl.uniform1f(rotationAngleLocation, rotationAngle);

        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

        updateFactDisplay();

        requestAnimationFrame(render);
    }

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    render();
}

// Call the main function and catch any errors
main().catch(console.error);