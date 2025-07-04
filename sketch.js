// sketch.js
let theShader;
let shaderTexture;
let gridSlider, bleedSlider, invertCheckbox, quoteInput;

function preload() {
  theShader = loadShader('shader.vert', 'shader.glsl');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  shaderTexture = createGraphics(width, height, WEBGL);
  shaderTexture.noStroke();

  // UI Elements
  createP('Grid Scale:').parent('ui');
  gridSlider = createSlider(2, 100, 40, 1);
  gridSlider.parent('ui');
  gridSlider.style('width', '200px');

  createP('Bleed Intensity:').parent('ui');
  bleedSlider = createSlider(0, 100, 25, 1);
  bleedSlider.parent('ui');
  bleedSlider.style('width', '200px');

  createP('Custom Quote:').parent('ui');
  quoteInput = createInput('The unknown is not your enemy.').parent('ui');
  quoteInput.style('width', '200px');

  invertCheckbox = createCheckbox('Invert Dots', false);
  invertCheckbox.parent('ui');
}

function draw() {
  shaderTexture.shader(theShader);

  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform('u_time', millis() / 1000.0);
  theShader.setUniform('u_gridScale', gridSlider.value());
  theShader.setUniform('u_bleed', bleedSlider.value() / 100.0);
  theShader.setUniform('u_invert', invertCheckbox.checked());

  shaderTexture.rect(0, 0, width, height);

  // Render shader texture to screen
  texture(shaderTexture);
  rect(-width / 2, -height / 2, width, height);

  // Draw text on top using blend mode for emergence
  resetMatrix();
  translate(-width / 2, -height / 2);
  drawingContext.globalCompositeOperation = 'overlay';
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text(quoteInput.value(), width / 2, height / 2);
  drawingContext.globalCompositeOperation = 'source-over';
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  shaderTexture.resizeCanvas(width, height);
}
