let shaderProgram, fontBuffer;

function preload() {
  shaderProgram = loadShader('shader.vert', 'shader.glsl');
}

function setup() {
  const container = document.getElementById('canvas-container');
  const cnv = createCanvas(container.offsetWidth, container.offsetHeight, WEBGL);
  cnv.parent('canvas-container');

  fontBuffer = createGraphics(width, height);
  fontBuffer.pixelDensity(1);
  fontBuffer.textAlign(CENTER, CENTER);
  fontBuffer.textSize(48);
  fontBuffer.fill(255);
  noStroke();
}

function windowResized() {
  const container = document.getElementById('canvas-container');
  resizeCanvas(container.offsetWidth, container.offsetHeight);

  fontBuffer = createGraphics(width, height);
  fontBuffer.pixelDensity(1);
  fontBuffer.textAlign(CENTER, CENTER);
  fontBuffer.textSize(48);
  fontBuffer.fill(255);
}

function draw() {
  // TEMPORARY TEST: comment out fontGraphics to test shader
  // fontGraphics.clear();
  // let quote = "TESTING";
  // fontGraphics.text(quote, width / 2, height / 2);

  shader(shaderProgram);

  shaderProgram.setUniform("u_resolution", [width, height]);
  shaderProgram.setUniform("u_time", millis() / 1000.0);
  
  // Give it a default non-transparent texture
  shaderProgram.setUniform("u_tex", fontGraphics);
  shaderProgram.setUniform("u_gridScale", 40.0);
  shaderProgram.setUniform("u_bleed", 0.3);
  shaderProgram.setUniform("u_invert", 0.0);

  rect(-width / 2, -height / 2, width, height);
}

