
// modified initShaders.js to accept shader source code directlyinstead of shader element IDs. 
// this change allows for more flexibility in shader loading, enabling shaders to be loaded from external files or generated dynamically. 
// The function now uses console.error for logging instead of alert, which is more suitable for debugging.
// Introduced a helper function "loadShader" to reduce code duplication and improve modularity. 
// These changes make the function more versatile and easier to use in modern WebGL applications.

// Function to initialize shaders
function initShaders(gl, vShaderSource, fShaderSource) {
    // Function to load shader
    function loadShader(gl, type, source) {
        const shader = gl.createShader(type); // Create shader
        gl.shaderSource(shader, source); // Set shader source
        gl.compileShader(shader); // Compile shader
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { // Check if compilation failed
            console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader)); // Log error
            gl.deleteShader(shader); // Delete shader
            return null; // Return null
        }
        return shader; // Return shader
    }

    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vShaderSource); // Load vertex shader
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fShaderSource); // Load fragment shader

    const shaderProgram = gl.createProgram(); // Create shader program
    gl.attachShader(shaderProgram, vertexShader); // Attach vertex shader
    gl.attachShader(shaderProgram, fragmentShader); // Attach fragment shader
    gl.linkProgram(shaderProgram); // Link program

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) { // Check if linking failed
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram)); // Log error
        return null; 
    }

    return shaderProgram; 
}

export { initShaders };