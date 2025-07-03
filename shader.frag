#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

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

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
           (c - a) * u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    
    // Normalize so center is (0,0) and square aspect
    st -= 0.5;
    st *= u_resolution / min(u_resolution.x, u_resolution.y);

    float t = u_time * 0.2;

    // Combine multiple layers of noise for richness
    float n = 0.0;
    n += 0.5 * noise(st * 4.0 + t);
    n += 0.25 * noise(st * 8.0 - t * 1.2);
    n += 0.125 * noise(st * 16.0 + t * 2.5);

    vec3 inkColor = vec3(0.06, 0.03, 0.015); // dark warm ink
    vec3 color
