let theShader;
let shaderTexture;
let gridSlider, bleedSlider, invertCheckbox;
let canvasContainer;

function preload() {
  theShader = loadShader('shader.vert', 'shader.glsl');
}

function setup() {
  // Create canvas in target container
  canvasContainer = document.getElementById('canvas-container');
  let c = createCanvas(1080, 1920, WEBGL);
  if (canvasContainer) {
    c.parent(canvasContainer);
  } else {
    console.warn('canvas-container not found in HTML.');
  }

  noStroke();

  // Set up shaderTexture
  shaderTexture = createGraphics(1080, 1920, WEBGL);
  shaderTexture.noStroke();

  // UI Elements
  gridSlider = document.getElementById('grid-slider');
  bleedSlider = document.getElementById('bleed-slider');
  invertCheckbox = document.getElementById('invert-checkbox');
}

function draw() {
  const gridScale = parseFloat(gridSlider?.value || 20.0);
  const bleedIntensity = parseFloat(bleedSlider?.value || 0.5);
  const invertDots = invertCheckbox?.checked ? 1.0 : 0.0;

  shaderTexture.shader(theShader);
  theShader.setUniform('u_resolution', [shaderTexture.width, shaderTexture.height]);
  theShader.setUniform('u_time', millis() / 1000.0);
  theShader.setUniform('u_gridScale', gridScale);
  theShader.setUniform('u_bleedIntensity', bleedIntensity);
  theShader.setUniform('u_invertDots', invertDots);

  shaderTexture.rect(0, 0, width, height);
  texture(shaderTexture);
  rect(-width / 2, -height / 2, width, height);
}
