attribute vec3 a_position;
attribute vec4 a_color;

uniform vec3 u_fixedPoint; // The point around which the object will rotate
uniform vec3 u_rotationAxis; // The axis around which the object will rotate                
uniform float u_rotationAngle; // The angle of rotation in degrees

varying vec4 v_color;

// Include the rotation library
#include "rotation-library.glsl"

void main() {
    vec3 rotatedPosition = rotateAroundPoint(a_position, u_fixedPoint, u_rotationAxis, u_rotationAngle); // Rotate the position 
    gl_Position = vec4(rotatedPosition, 1.0); // Set the position
    v_color = a_color; // Set the color
}