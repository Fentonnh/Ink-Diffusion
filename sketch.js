let shaderProgram;
let gridSlider, bleedSlider, invertCheckbox;

function preload() {
  shaderProgram = loadShader('shader.vert', 'shader.glsl');
}

function setup() {
  const container = select('#canvas-container');
  let canvas = createCanvas(container.width, container.height, WEBGL);
  canvas.parent('canvas-container');

  noStroke();
  pixelDensity(1);

  gridSlider = select('#grid');
  bleedSlider = select('#bleed');
  invertCheckbox = select('#invert');
}

function windowResized() {
  const container = select('#canvas-container');
  resizeCanvas(container.width, container.height);
}

function draw() {
  shader(shaderProgram);

  shaderProgram.setUniform('u_resolution', [width, height]);
  shaderProgram.setUniform('u_time', millis() / 1000.0);
  shaderProgram.setUniform('u_gridScale', float(gridSlider.value()));
  shaderProgram.setUniform('u_bleed', float(bleedSlider.value()));
  shaderProgram.setUniform('u_invert', invertCheckbox.checked() ? 1.0 : 0.0);

  rect(0, 0, width, height);
}
