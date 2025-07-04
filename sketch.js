let shaderProgram;
let fallbackImg;

function preload() {
  // Adjust path if needed — 'assets/' recommended
  shaderProgram = loadShader("shader.vert", "shader.frag",
    () => console.log("✅ Shader loaded."),
    err => console.error("❌ Shader failed to load:", err)
  );
}

function setup() {
  const container = document.getElementById("canvas-container");
  let cnv = createCanvas(container.offsetWidth, container.offsetHeight, WEBGL);
  cnv.parent("canvas-container");

  // Create a 1x1 white texture as a placeholder
  fallbackImg = createImage(1, 1);
  fallbackImg.loadPixels();
  fallbackImg.pixels[0] = 255;
  fallbackImg.pixels[1] = 255;
  fallbackImg.pixels[2] = 255;
  fallbackImg.pixels[3] = 255;
  fallbackImg.updatePixels();

  console.log("✅ Setup complete.");
}

function windowResized() {
  const container = document.getElementById("canvas-container");
  resizeCanvas(container.offsetWidth, container.offsetHeight);
}

function draw() {
  background(0);

  shader(shaderProgram);

  shaderProgram.setUniform("u_resolution", [width, height]);
  shaderProgram.setUniform("u_time", millis() / 1000.0);
  shaderProgram.setUniform("u_tex", fallbackImg);
  shaderProgram.setUniform("u_gridScale", 40.0);
  shaderProgram.setUniform("u_bleed", 0.3);
  shaderProgram.setUniform("u_invert", 0.0);

  rect(-width / 2, -height / 2, width, height);
}
