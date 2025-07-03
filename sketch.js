let gridScaleSlider, bleedSlider, invertCheckbox;
let canvas;

function setup() {
  const canvasHolder = document.getElementById('canvas-holder');
  const h = window.innerHeight;
  const w = h * 9 / 16;

  canvas = createCanvas(w, h);
  canvas.parent(canvasHolder);

  gridScaleSlider = document.getElementById('gridScale');
  bleedSlider = document.getElementById('bleedIntensity');
  invertCheckbox = document.getElementById('invertDots');

  noStroke();
  frameRate(30);
}

function draw() {
  if (!gridScaleSlider || !bleedSlider || !invertCheckbox) return;

  const gridSize = parseInt(gridScaleSlider.value);
  const bleed = parseFloat(bleedSlider.value);
  const invert = invertCheckbox.checked;

  background(invert ? 255 : 0);

  for (let y = 0; y < height; y += gridSize) {
    for (let x = 0; x < width; x += gridSize) {
      let noiseVal = noise(x * 0.005, y * 0.005, millis() * 0.0003);
      let intensity = map(noiseVal, 0, 1, 0, 255 * bleed);
      let size = map(noiseVal, 0, 1, 2, gridSize * 0.75);
      fill(invert ? 0 : 255, intensity);
      ellipse(x + gridSize / 2, y + gridSize / 2, size, size);
    }
  }
}

function windowResized() {
  const h = window.innerHeight;
  const w = h * 9 / 16;
  resizeCanvas(w, h);
}
