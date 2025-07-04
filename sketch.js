let shaderProgram, fontBuffer;

function preload() {
  shaderProgram = loadShader("shader.vert", "shader.glsl");
}

function setup() {
  const canvasContainer = document.getElementById("canvas-container");
  const cnv = createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight, WEBGL);
  cnv.parent("canvas-container");

  fontBuffer = createGraphics(width, height);
  fontBuffer.pixelDensity(1);
  fontBuffer.textAlign(CENTER, CENTER);
  fontBuffer.textSize(48);
  fontBuffer.fill(255);
  noStroke();
}

function windowResized() {
  const canvasContainer = document.getElementById("canvas-container");
  resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);

  fontBuffer = createGraphics(width, height);
  fontBuffer.pixelDensity(1);
  fontBuffer.textAlign(CENTER, CENTER);
  fontBuffer.textSize(48);
  fontBuffer.fill(255);
}

function draw() {
  if (!shaderProgram || !shaderProgram._glProgram) return;

  fontBuffer.clear();
  let quoteInput = document.getElementById("quoteInput");
  let quote = quoteInput && quoteInput.value.trim() !== ""
    ? quoteInput.value
    : "The unknown is not your enemy,\nit is your birthplace.";

  fontBuffer.text(quote, width / 2, height / 2);

  shader(shaderProgram);
  shaderProgram.setUniform("u_resolution", [width, height]);
  shaderProgram.setUniform("u_time", millis() / 1000.0);
  shaderProgram.setUniform("u_tex", fontBuffer);
  shaderProgram.setUniform("u_gridScale", parseFloat(document.getElementById("grid-slider").value));
  shaderProgram.setUniform("u_bleed", parseFloat(document.getElementById("bleed-slider").value));
  shaderProgram.setUniform("u_invert", document.getElementById("invert-checkbox").checked ? 1.0 : 0.0);

  rectMode(CENTER);
  rect(0, 0, width, height);
}
