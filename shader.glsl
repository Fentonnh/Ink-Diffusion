// shader.glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_gridScale;
uniform float u_bleedIntensity;
uniform float u_invertDots;

varying vec2 vTexCoord;

// Classic random
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Classic 2D noise
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
           (d - b) * u.x * u.y;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    float scale = mix(5.0, 60.0, u_gridScale / 100.0);
    st *= scale;

    vec2 ipos = floor(st);
    vec2 fpos = fract(st);

    float bleed = mix(0.05, 0.5, u_bleedIntensity);
    float n = noise(ipos + u_time * 0.2);
    float dist = distance(fpos, vec2(0.5)) + (n - 0.5) * bleed;

    float radius = 0.3;
    float alpha = smoothstep(radius, radius - 0.1, dist);

    vec3 inkColor = u_invertDots > 0.5 ? vec3(1.0) : vec3(0.0);
    vec3 bgColor  = u_invertDots > 0.5 ? vec3(0.0) : vec3(1.0);
    vec3 color = mix(inkColor, bgColor, alpha);

    gl_FragColor = vec4(color, 1.0);
}
