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
  if (!shaderProgram || !shaderProgram._glProgram) return;

  fontBuffer.clear();
  const q = document.getElementById('quoteInput').value;
  fontBuffer.text(q || 'Enter a quote…', width / 2, height / 2);

  shader(shaderProgram);
  shaderProgram.setUniform('u_resolution', [width, height]);
  shaderProgram.setUniform('u_time', millis() / 1000);
  shaderProgram.setUniform('u_gridScale', parseFloat(document.getElementById('grid-slider').value));
  shaderProgram.setUniform('u_bleed', parseFloat(document.getElementById('bleed-slider').value));
  shaderProgram.setUniform('u_invert', document.getElementById('invert-checkbox').checked ? 1.0 : 0.0);
  shaderProgram.setUniform('u_tex', fontBuffer);

  rectMode(CENTER);
  rect(0, 0, width, height);
}
