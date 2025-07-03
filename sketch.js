let inkShader;
let pg;

function preload() {
  inkShader = loadShader('shader.glsl', 'shader.glsl');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  pg = createGraphics(width, height, WEBGL);
}

function draw() {
  inkShader.setUniform('u_resolution', [width, height]);
  inkShader.setUniform('u_time', millis() / 1000.0);
  inkShader.setUniform('u_texture', pg);

  pg.shader(inkShader);
  pg.rect(0, 0, width, height);

  image(pg, -width / 2, -height / 2, width, height);
}
