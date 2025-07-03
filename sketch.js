let inkShader;

function preload() {
  inkShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  shader(inkShader);
}

function draw() {
  inkShader.setUniform('u_time', millis() / 1000.0);
  inkShader.setUniform('u_resolution', [width, height]);
  rect(-width / 2, -height / 2, width, height);
}
