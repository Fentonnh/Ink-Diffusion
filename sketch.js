let shaderProgram, fontG;

function preload() {
  shaderProgram = loadShader('shader.vert', 'shader.glsl');
}

function setup() {
  let cH = document.getElementById("canvas-container");
  let cnv = createCanvas(cH.offsetWidth, cH.offsetHeight, WEBGL);
  cnv.parent("canvas-container");
  fontG = createGraphics(width, height);
  fontG.pixelDensity(1);
  fontG.textAlign(CENTER, CENTER);
  fontG.textSize(48);
  fontG.fill(255);
  noStroke();
}

function windowResized() {
  let cH = document.getElementById("canvas-container");
  resizeCanvas(cH.offsetWidth, cH.offsetHeight);
  fontG = createGraphics(width, height);
  fontG.pixelDensity(1);
  fontG.textAlign(CENTER, CENTER);
  fontG.textSize(48);
  fontG.fill(255);
}

function draw() {
  if (!shaderProgram._glProgram) return;

  fontG.clear();
  let q = document.getElementById("quoteInput").value;
  fontG.text(q || "Enter a quote...", width/2, height/2);

  shader(shaderProgram);
  shaderProgram.setUniform("u_resolution", [width, height]);
  shaderProgram.setUniform("u_time", millis()/1000);
  shaderProgram.setUniform("u_gridScale", parseFloat(document.getElementById("grid-slider").value));
  shaderProgram.setUniform("u_bleed", parseFloat(document.getElementById("bleed-slider").value));
  shaderProgram.setUniform("u_invert", document.getElementById("invert-checkbox").checked ? 1.0 : 0.0);
  shaderProgram.setUniform("u_tex", fontG);

  rectMode(CENTER);
  rect(0, 0, width, height);
}
