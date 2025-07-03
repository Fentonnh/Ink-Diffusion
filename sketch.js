let inkShader;

function preload() {
  inkShader = loadShader('shader.glsl', 'shader.glsl');
}

function setup() {
  const canvas = createCanvas(windowWidth - 300, windowHeight, WEBGL);
  canvas.parent('canvas-holder');
  noStroke();
}

function draw() {
  // UI input values
  const gridScale = parseFloat(document.getElementById('gridScale').value);
  const bleedAmount = parseFloat(document.getElementById('bleedAmount').value) / 100.0;
  const invertDots = document.getElementById('invertDots').checked ? 1.0 : 0.0;

  // Send uniforms
  shader(inkShader);
  inkShader.setUniform('u_resolution', [width, height]);
  inkShader.setUniform('u_time', millis() / 1000.0);
  inkShader.setUniform('u_scale', gridScale);
  inkShader.setUniform('u_bleed', bleedAmount);
  inkShader.setUniform('u_invert', invertDots);

  rect(-width / 2, -height / 2, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth - 300, windowHeight);
}
