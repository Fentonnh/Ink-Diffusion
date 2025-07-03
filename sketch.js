const sketch = (p) => {
  let gridScaleSlider, bleedSlider, invertCheckbox;
  let canvas;

  p.setup = () => {
    const canvasHolder = document.getElementById('canvas-holder');
    if (!canvasHolder) {
      console.error('Canvas holder not found!');
      return;
    }

    const h = window.innerHeight;
    const w = h * 9 / 16;

    canvas = p.createCanvas(w, h);
    canvas.parent(canvasHolder);

    gridScaleSlider = document.getElementById('gridScale');
    bleedSlider = document.getElementById('bleedIntensity');
    invertCheckbox = document.getElementById('invertDots');

    p.noStroke();
    p.frameRate(30);
  };

  p.draw = () => {
    if (!gridScaleSlider || !bleedSlider || !invertCheckbox) return;

    const gridSize = parseInt(gridScaleSlider.value);
    const bleed = parseFloat(bleedSlider.value);
    const invert = invertCheckbox.checked;

    p.background(invert ? 255 : 0);

    for (let y = 0; y < p.height; y += gridSize) {
      for (let x = 0; x < p.width; x += gridSize) {
        let noiseVal = p.noise(x * 0.005, y * 0.005, p.millis() * 0.0003);
        let intensity = p.map(noiseVal, 0, 1, 0, 255 * bleed);
        let size = p.map(noiseVal, 0, 1, 2, gridSize * 0.75);
        p.fill(invert ? 0 : 255, intensity);
        p.ellipse(x + gridSize / 2, y + gridSize / 2, size, size);
      }
    }
  };

  p.windowResized = () => {
    const h = window.innerHeight;
    const w = h * 9 / 16;
    p.resizeCanvas(w, h);
  };
};

new p5(sketch); // ← This runs everything only when the DOM is ready
