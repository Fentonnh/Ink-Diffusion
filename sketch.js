let gridScaleSlider, bleedSlider, invertCheckbox;
let canvas;

function setup() {
  const canvasParent = select('#canvas-holder');
  const h = windowHeight;
  const w = h * 9 / 16;

  canvas = createCanvas(w, h);
  canvas.parent(canvasParent.elt);
  canvas.style('display', 'block');

  gridScaleSlider = select('#gridScale');
  bleedSlider = select('#bleedIntensity');
  invertCheckbox = select('#invertDots');

  noStroke();
  frameRate(30);
}

function draw() {
  if (!gridScaleSlider || !bleedSlider || !invertCheckbox) return;

  const gridSize = int(gridScaleSlider.value());
  const bleed = float(bleedSlider.value());
  const invert = invertCheckbox.elt.checked;

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
  const h = windowHeight;
  const w = h * 9 / 16;
  resizeCanvas(w, h);
}
