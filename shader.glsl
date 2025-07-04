// shader.glsl
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_gridScale;
uniform float u_bleed;
uniform float u_invert;
uniform sampler2D u_tex;

void main() {
  vec2 uv = vTexCoord;
  float scale = u_gridScale;
  vec2 gridUV = floor(uv * scale) / scale;

  float brightness = texture2D(u_tex, gridUV).r;
  float radius = brightness * 0.15 + 0.005;
  radius += sin(u_time + gridUV.x * 10.0 + gridUV.y * 10.0) * u_bleed * 0.05;

  float dist = length(fract(uv * scale) - 0.5);
  float ink = smoothstep(radius, radius - 0.01, dist);

  float result = mix(ink, 1.0 - ink, u_invert);
  gl_FragColor = vec4(vec3(result), 1.0);
}
