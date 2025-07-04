let shaderProgram;
let fontGraphics;

function preload() {
  // Load the shader with error handling
  shaderProgram = loadShader('shader.vert', 'shader.frag', onShaderLoadError);
}

function onShaderLoadError(err) {
  console.error("🛑 Shader failed to load:", err);
}

function setup() {
  const container = document.getElementById("canvas-container");
  let cnv = createCanvas(container.offsetWidth, container.offsetHeight, WEBGL);
  cnv.parent("canvas-container");

  // Check for shader compilation issue
  if (!shaderProgram) {
    console.error("🧨 shaderProgram is undefined. Shader failed to compile.");
    noLoop();
    return;
  }

  fontGraphics = createGraphics(width, height);
  fontGraphics.pixelDensity(1);
  fontGraphics.background(0);
  fontGraphics.fill(255);
  fontGraphics.textAlign(CENTER, CENTER);
  fontGraphics.textSize(64);
}

function windowResized() {
  const container = document.getElementById("canvas-container");
  resizeCanvas(container.offsetWidth, container.offsetHeight);
}

function draw() {
  fontGraphics.clear();

  let quote = document.getElementById("quoteInput").value || "The unknown is not your enemy,\nit is your birthplace.";
  fontGraphics.text(quote, width / 2, height / 2);

  shader(shaderProgram);
  shaderProgram.setUniform("u_resolution", [width, height]);
  shaderProgram.setUniform("u_time", millis() / 1000.0);
  shaderProgram.setUniform("u_tex", fontGraphics);
  shaderProgram.setUniform("u_gridScale", float(document.getElementById("grid-slider").value));
  shaderProgram.setUniform("u_bleed", float(document.getElementById("bleed-slider").value));
  shaderProgram.setUniform("u_invert", document.getElementById("invert-checkbox").checked ? 1.0 : 0.0);

  rect(-width / 2, -height / 2, width, height);
}
