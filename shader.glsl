#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;

float luminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Add wave-like distortion to simulate ink bleed
    vec2 animatedUV = uv + 0.01 * vec2(
        sin(uv.y * 40.0 + u_time * 0.6),
        cos(uv.x * 40.0 + u_time * 0.6)
    );

    // Create halftone grid
    float scale = 100.0;
    vec2 gridUV = floor(animatedUV * scale) / scale;
    vec2 center = (floor(animatedUV * scale) + 0.5) / scale;

    vec3 color = texture2D(u_texture, animatedUV).rgb;
    float bright = luminance(color);

    float dist = distance(animatedUV, center);

    float bleed = 0.03 + 0.01 * sin(u_time + bright * 10.0);
    float radius = (1.0 - bright) * 0.5 / scale + bleed;

    float dot = smoothstep(radius + 0.001, radius - 0.001, dist);

    gl_FragColor = vec4(vec3(dot), 1.0);
}
