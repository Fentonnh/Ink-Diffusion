// shader.frag
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_tex;
uniform float u_gridScale;
uniform float u_bleed;
uniform float u_invert;

varying vec2 vTexCoord;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec2 uv = vTexCoord; // Use vTexCoord passed from vertex shader

  float scale = u_gridScale;
  vec2 grid = floor(uv * scale);
  vec2 gridUV = grid / scale;

  vec4 textColor = texture2D(u_tex, uv);
  float brightness = textColor.r;

  float radius = brightness * 0.1 + 0.01;
  float n = hash(grid);
  radius += sin(u_time * 2.0 + n * 10.0) * u_bleed * 0.05;

  float distToCenter = length(fract(uv * scale) - 0.5);
  float ink = smoothstep(radius, radius - 0.01, distToCenter);

  float output = u_invert > 0.5 ? 1.0 - ink : ink;
  gl_FragColor = vec4(vec3(output), 1.0);
}
