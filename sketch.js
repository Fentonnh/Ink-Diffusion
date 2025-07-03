let shaderProgram;
let gridSlider, bleedSlider, invertCheckbox;

function preload() {
  shaderProgram = loadShader('shader.vert', 'shader.glsl');
}

function setup() {
  let cnv = createCanvas(windowWidth - 250, windowHeight, WEBGL);
  cnv.parent('canvas-container');
  noStroke();

  gridSlider = select('#grid');
  bleedSlider = select('#bleed');
  invertCheckbox = select('#invert');
}

function draw() {
  shader(shaderProgram);

  shaderProgram.setUniform('u_resolution', [width, height]);
  shaderProgram.setUniform('u_time', millis() / 1000.0);
  shaderProgram.setUniform('u_gridScale', gridSlider.value());
  shaderProgram.setUniform('u_bleed', bleedSlider.value());
  shaderProgram.setUniform('u_invert', invertCheckbox.checked() ? 1.0 : 0.0);

  rect(-width / 2, -height / 2, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth - 250, windowHeight);
}
