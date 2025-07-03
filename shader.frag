#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

// Basic random function
float random(vec2 st) {
  return fract(sin(dot(st, vec2(12.9898,78.233))) * 43758.5453123);
}

// 2D Value noise
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) +
         (c - a) * u.y * (1.0 - u.x) +
         (d - b - c + a) * u.x * u.y;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec2 pos = st * 8.0 + vec2(u_time * 0.1); // zoom and animate

  float n = noise(pos);

  vec3 color = vec3(n); // grayscale

  gl_FragColor = vec4(color, 1.0);
}
