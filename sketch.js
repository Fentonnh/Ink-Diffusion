let theShader;

function preload() {
  theShader = loadShader("shader.vert", "shader.frag",
    () => console.log("Shader loaded"),
    (err) => console.error("Shader failed:", err)
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  shader(theShader);
  theShader.setUniform("u_time", millis() / 1000.0);
  theShader.setUniform("u_resolution", [width, height]);

  // DRAW FULL SCREEN RECTANGLE to trigger the shader
  rect(-width / 2, -height / 2, width, height);
}
