// rotation-library.glsl
// Library of functions for rotating objects in 3D space.
// Includes a function to create a rotation matrix based on an axis and an angle,
// and a function to rotate a point around a fixed point using this matrix. 

// This function creates a rotation matrix based on an axis and an angle.
mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis); // normalize the axis vector so it has a magnitude of 1
    float s = sin(angle); // sine of the angle
    float c = cos(angle); // cosine of the angle
    float oc = 1.0 - c; // 1 - cosine of the angle
    // this creates a 4x4 matrix for the rotation
    // This matrix is constructed using the Rodrigues' rotation formula, which gives:
    // R = I + (sin θ)K + (1 - cos θ)K²
    // where I is the identity matrix, K is the skew-symmetric cross product matrix of the axis vector, and θ is the angle of rotation.
    return mat4(
        oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
        oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
        oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
        0.0,                                0.0,                                0.0,                                1.0
    ); 
    // The last row and column are set to [0, 0, 0, 1] to make it a 4x4 matrix (for compatibility with homogeneous coordinates)
}

// This function rotates a point around a fixed point using a rotation matrix.
vec3 rotateAroundPoint(vec3 point, vec3 fixedPoint, vec3 axis, float angle) {
    mat4 rotMat = rotationMatrix(axis, angle); // create the rotation matrix
    vec3 translatedPoint = point - fixedPoint; // translate the point to the origin of the coordinate system
    vec3 rotatedPoint = (rotMat * vec4(translatedPoint, 1.0)).xyz; // rotate the point
    return rotatedPoint + fixedPoint; // translate the point back to its original position
}