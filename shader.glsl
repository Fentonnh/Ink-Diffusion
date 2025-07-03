#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_gridScale;
uniform float u_bleed;
uniform float u_invert;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = smoothstep(0.0, 1.0, f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;
  vec2 grid = floor(st * u_gridScale);

  float n = noise(grid + u_time * 0.2);
  float bleed = smoothstep(0.5, 0.5 + u_bleed * 0.2, n);

  float d = distance(fract(st * u_gridScale), vec2(0.5));
  float dotmask = smoothstep(0.25, 0.05, d);

  float ink = dotmask * bleed;

  float col = u_invert > 0.5 ? ink : 1.0 - ink;

  gl_FragColor = vec4(vec3(col), 1.0);
}
