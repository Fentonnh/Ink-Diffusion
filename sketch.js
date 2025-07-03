let gridScaleSlider, bleedSlider, invertCheckbox;
let theShader;

function preload() {
  theShader = loadShader('shader.vert', 'shader.glsl');
}

function setup() {
  const canvas = createCanvas(windowHeight * 9 / 16, windowHeight, WEBGL);
  canvas.parent('canvas-container');
  noStroke();

  // UI bindings
  gridScaleSlider = select('#gridScale');
  bleedSlider = select('#bleedIntensity');
  invertCheckbox = select('#invertDots');
}

function draw() {
  shader(theShader);

  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform('u_time', millis() / 1000.0);
  theShader.setUniform('u_gridScale', float(gridScaleSlider.value()));
  theShader.setUniform('u_bleed', float(bleedSlider.value()));
  theShader.setUniform('u_invert', invertCheckbox.checked() ? 1.0 : 0.0);

  rect(0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowHeight * 9 / 16, windowHeight);
}
