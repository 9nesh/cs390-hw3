precision mediump float;

// v_color is the interpolated color from the vertex shader
varying vec4 v_color;

void main() {
    // set the output color to the interpolated color from the vertex shader
    gl_FragColor = v_color;
}