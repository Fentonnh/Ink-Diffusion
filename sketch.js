let shaderProgram;
let fontGraphics;

function preload() {
  shaderProgram = loadShader('shader.vert', 'shader.glsl');
}

function setup() {
  const container = document.getElementById("canvas-container");
  let cnv = createCanvas(container.offsetWidth, container.offsetHeight, WEBGL);
  cnv.parent("canvas-container");

  fontGraphics = createGraphics(width, height);
  fontGraphics.pixelDensity(1);
  fontGraphics.textFont('sans-serif');
  fontGraphics.textAlign(CENTER, CENTER);
  fontGraphics.textSize(48);
  fontGraphics.fill(255);
}

function windowResized() {
  const container = document.getElementById("canvas-container");
  resizeCanvas(container.offsetWidth, container.offsetHeight);
  fontGraphics = createGraphics(width, height);
  fontGraphics.pixelDensity(1);
  fontGraphics.textFont('sans-serif');
  fontGraphics.textAlign(CENTER, CENTER);
  fontGraphics.textSize(48);
  fontGraphics.fill(255);
}

function draw() {
  fontGraphics.clear();

  let quoteInput = document.getElementById("quoteInput");
  let quote = quoteInput && quoteInput.value.trim() !== ""
              ? quoteInput.value
              : "The unknown is not your enemy,\nit is your birthplace.";

  fontGraphics.text(quote, width / 2, height / 2);

  shader(shaderProgram);
  shaderProgram.setUniform("u_resolution", [width, height]);
  shaderProgram.setUniform("u_time", millis() / 1000.0);
  shaderProgram.setUniform("u_tex", fontGraphics);
  shaderProgram.setUniform("u_gridScale", parseFloat(document.getElementById("grid-slider").value));
  shaderProgram.setUniform("u_bleed", parseFloat(document.getElementById("bleed-slider").value));
  shaderProgram.setUniform("u_invert", document.getElementById("invert-checkbox").checked ? 1.0 : 0.0);

  rect(-width / 2, -height / 2, width, height);
}
