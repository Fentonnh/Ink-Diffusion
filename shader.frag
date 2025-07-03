#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

// Simple hash noise
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// Value noise
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x)
       + (c - a) * u.y * (1.0 - u.x)
       + (d - b) * u.x * u.y;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  st -= 0.5;
  st *= u_resolution / min(u_resolution.x, u_resolution.y);

  float t = u_time * 0.3;

  float n = 0.0;
  n += 0.5  * noise(st * 3.0 + t);
  n += 0.25 * noise(st * 6.0 - t * 1.5);
  n += 0.125 * noise(st * 12.0 + t * 2.0);

  // TEMP DEBUG: boost brightness so you can see if it’s working
  vec3 ink = vec3(n);

  gl_FragColor = vec4(ink, 1.0);
}
