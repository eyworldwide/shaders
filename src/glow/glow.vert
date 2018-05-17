// https://stackoverflow.com/questions/42820017/apply-a-glow-effect-onto-a-three-textgeometry-object-in-three-js
uniform vec3 viewVector;
uniform float uTime;
uniform float z;
uniform float shininess;
varying float intensity;
varying vec2 vUv; 

void main() {
  vUv = uv;

  vec3 vNormal = normalize( normalMatrix * normal );
  vec3 vNormel = normalize( normalMatrix * viewVector );
  intensity = pow( 10.0 - dot(vNormal, vNormel), 0.0 + shininess * sin((uTime + z * 0.2) * 0.005));
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
