/*
 * https://www.shadertoy.com/view/4sXSzs
 */
uniform float uTime;
uniform sampler2D tChannel0;
uniform sampler2D tChannel1;
uniform sampler2D tChannel2;

varying vec2 vUv;

void main(void) {
	// vec2 p = gl_FragCoord.xy / iResolution.xy;
	vec2 p = -1.0 + 2.0 * vUv;

	if(length(p) > 1.0){
		discard;
	}

	if(length(p) > 0.92){
		float mid = 0.5;
		float speed = 5.0;

		vec2 rotated = vec2(cos(uTime * speed) * (vUv.x - mid) + sin(uTime * speed) * (vUv.y - mid) + mid,
												cos(uTime * speed) * (vUv.y - mid) - sin(uTime * speed) * (vUv.x - mid) + mid);

		gl_FragColor = texture2D(tChannel0, rotated);
	} else{
		// vec2 q = p - vec2(0.5, 0.5);
		vec2 q = p;

		// q.x += sin(uTime* 0.6) * 0.2;
		// q.y += cos(uTime* 0.4) * 0.3;

		float len = length(q);

		float a = atan(q.y, q.x) + uTime * 0.3;
		float b = atan(q.y, q.x) + uTime * 0.3;
		float r1 = 0.3 / len + uTime * 0.5;
		float r2 = 0.2 / len + uTime * 0.5;

		float m = (1.0 + sin(uTime * 0.5)) / 2.0;
		vec4 tex1 = texture2D(tChannel1, vec2(a + 0.1 / len, r1 ));
		vec4 tex2 = texture2D(tChannel2, vec2(b + 0.1 / len, r2 ));
		vec3 col = vec3(mix(tex1, tex2, m));
		gl_FragColor = vec4(col * len * 1.5, 1.0);
	}
}
