let inkShader;
let pg;

function preload() {
  inkShader = loadShader('shader.glsl', 'shader.glsl');
}

function setup() {
  const canvas = createCanvas(windowWidth - 300, windowHeight, WEBGL);
  canvas.parent('canvas-holder');
  noStroke();

  pg = createGraphics(width, height, WEBGL);

  // Setup initial uniforms from UI
  document.getElementById('gridScale').addEventListener('input', () => {});
  document.getElementById('bleedAmount').addEventListener('input', () => {});
  document.getElementById('invertDots').addEventListener('change', () => {});
}

function draw() {
  const gridScale = parseFloat(document.getElementById('gridScale').value);
  const bleedAmount = parseFloat(document.getElementById('bleedAmount').value) / 100.0;
  const invertDots = document.getElementById('invertDots').checked ? 1.0 : 0.0;

  inkShader.setUniform('u_resolution', [width, height]);
  inkShader.setUniform('u_time', millis() / 1000.0);
  inkShader.setUniform('u_texture', pg);
  inkShader.setUniform('u_scale', gridScale);
  inkShader.setUniform('u_bleed', bleedAmount);
  inkShader.setUniform('u_invert', invertDots);

  pg.shader(inkShader);
  pg.rect(0, 0, width, height);
  image(pg, -width / 2, -height / 2, width, height);
}
