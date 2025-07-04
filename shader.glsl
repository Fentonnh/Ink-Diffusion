// shader.glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_gridScale;
uniform float u_bleed;
uniform float u_invert;
uniform sampler2D u_tex;

varying vec2 vTexCoord;

void main() {
  vec2 uv = vTexCoord;
  vec2 grid = floor(uv * u_gridScale) / u_gridScale;

  vec4 textSample = texture2D(u_tex, grid);
  float brightness = textSample.r;

  float radius = brightness * 0.1 + 0.01;
  radius += sin(u_time + grid.x * 10.0 + grid.y * 10.0) * u_bleed * 0.05;

  float dist = length(fract(uv * u_gridScale) - 0.5);
  float ink = smoothstep(radius, radius - 0.01, dist);

  float finalOutput = mix(ink, 1.0 - ink, u_invert);
  gl_FragColor = vec4(vec3(finalOutput), 1.0);
}
