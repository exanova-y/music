let angle = 0;
const cubeSize = 100;
const projectionDistance = 2;

function setup() {
    createCanvas(800, 800, WEBGL);
    angleMode(RADIANS);
}

function draw() {
    background(220);
    
    // Set up the camera
    orbitControl();
    
    // Rotate the entire scene
    rotateX(angle); 
    
    rotateY(angle * 0.7);
    
    // Define cube vertices in 3D space
    const vertices = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
    ];

    const inner_vertices = vertices.map(v => [v[0]*0.5, v[1]*0.5, v[2]*0.5]);
    console.log(inner_vertices)
    
    // Apply hyperbolic transformation and draw edges
    stroke(0);
    strokeWeight(2);
    noFill();
    
    // Draw edges
    beginShape(LINES);
    // Bottom face
    connectVertices(vertices[0], vertices[1]);
    connectVertices(vertices[1], vertices[2]);
    connectVertices(vertices[2], vertices[3]);
    connectVertices(vertices[3], vertices[0]);
    
    // Top face
    connectVertices(vertices[4], vertices[5]);
    connectVertices(vertices[5], vertices[6]);
    connectVertices(vertices[6], vertices[7]);
    connectVertices(vertices[7], vertices[4]);
    
    // Connecting edges
    connectVertices(vertices[0], vertices[4]);
    connectVertices(vertices[1], vertices[5]);
    connectVertices(vertices[2], vertices[6]);
    connectVertices(vertices[3], vertices[7]);
    endShape();
    
    angle += 0.01;
}

function connectVertices(v1, v2) { // inputs are arrays [x, y, z]
    // Draw the line between points directly using array indices
    vertex(v1[0] * cubeSize, v1[1] * cubeSize, v1[2] * cubeSize);
    vertex(v2[0] * cubeSize, v2[1] * cubeSize, v2[2] * cubeSize);
}

// function hyperbolicTransform(point) {
//     // Convert to hyperbolic space using Poincaré model
//     let x = point[0];
//     let y = point[1];
//     let z = point[2];
    
//     // Calculate distance from origin
//     let d = sqrt(x*x + y*y + z*z);
    
//     // Apply hyperbolic transformation
//     let factor = (1 + d/projectionDistance) / (1 + d*d/(projectionDistance*projectionDistance));
    
//     return {
//         x: x * factor,
//         y: y * factor,
//         z: z * factor
//     };
// }
