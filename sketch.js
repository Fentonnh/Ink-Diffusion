let theShader;
let gridSlider, bleedSlider, invertCheckbox;

function preload() {
  theShader = loadShader('shader.vert', 'shader.glsl');
}

function setup() {
  const canvas = createCanvas(windowWidth - 250, windowHeight, WEBGL);
  canvas.parent('canvas-container');
  noStroke();

  gridSlider = select('#grid');
  bleedSlider = select('#bleed');
  invertCheckbox = select('#invert');
}

function draw() {
  shader(theShader);

  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform('u_time', millis() / 1000.0);
  theShader.setUniform('u_gridScale', float(gridSlider.value()));
  theShader.setUniform('u_bleed', float(bleedSlider.value()));
  theShader.setUniform('u_invert', invertCheckbox.checked() ? 1.0 : 0.0);

  rect(-width / 2, -height / 2, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth - 250, windowHeight);
}
