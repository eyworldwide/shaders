uniform vec3 glowColor;
varying float intensity;
uniform sampler2D image;
varying vec2 vUv;

void main() {
	vec3 glow = glowColor * intensity;
	vec4 color = texture2D(image, vUv);

	if(color.a - 0.1 < 0.0) {
		discard;
	}

  gl_FragColor = vec4(color.rgb * glow, 1.0 );
}
