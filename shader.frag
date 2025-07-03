#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
         (c - a)* u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st -= 0.5;
  st *= u_resolution / min(u_resolution.x, u_resolution.y);

  float n = 0.0;
  float t = u_time * 0.3;

  // Multi-layer noise for diffusion look
  n += 0.5 * noise(st * 3.0 + t);
  n += 0.25 * noise(st * 6.0 - t * 1.5);
  n += 0.125 * noise(st * 12.0 + t * 2.0);

  float ring = smoothstep(0.3, 0.0, length(st)); // soft radial fade
  vec3 ink = vec3(0.05, 0.02, 0.01); // warm black-brown ink

  vec3 color = ink * n * ring;

  gl_FragColor = vec4(color, 1.0);
}
