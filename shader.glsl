#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_scale;
uniform float u_bleed;
uniform float u_invert;

float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float luminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    vec2 animatedUV = uv + 0.01 * vec2(
        sin(uv.y * 40.0 + u_time * 0.6),
        cos(uv.x * 40.0 + u_time * 0.6)
    );

    float scale = u_scale;
    vec2 gridUV = floor(animatedUV * scale) / scale;
    vec2 center = (floor(animatedUV * scale) + 0.5) / scale;

    float bright = noise(animatedUV + u_time);
    float dist = distance(animatedUV, center);

    float bleed = 0.03 + u_bleed * sin(u_time + bright * 10.0);
    float radius = (1.0 - bright) * 0.5 / scale + bleed;

    float dot = smoothstep(radius + 0.001, radius - 0.001, dist);

    // Invert if checkbox is checked
    dot = mix(dot, 1.0 - dot, u_invert);

    gl_FragColor = vec4(vec3(dot), 1.0);
}
