const Te=["#1e3fd8","#f6f8ff","#a5d8ff","#38bdf8"],Ae=" =+xX0S8#@",Re='"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',_e={horizon:0,pinch:1,rise:2,eclipse:3},ye={none:0,wave:1,burst:2},Le=`#version 300 es
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,pe=`
float hash12(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}
`,Se=`#version 300 es
precision highp float;
precision highp int;
uniform float uAspect;
uniform float uTime;
uniform int uShape;
uniform vec3 uRamp[8];
uniform int uCount;
uniform float uScale;
uniform float uSoftness;
uniform float uFlow;
uniform vec2 uSeed;
uniform vec4 uTrail[24];
uniform float uRadius;
uniform vec4 uClicks[4];
uniform int uClickEffect;
uniform float uIntro;
uniform float uFrame;
in vec2 vUv;
layout(location = 0) out vec4 outColor;
layout(location = 1) out vec4 outAux;
${pe}
vec2 hash22(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * vec3(0.1031, 0.103, 0.0973));
  q += dot(q, q.yzx + 33.33);
  return fract((q.xx + q.yz) * q.zy) * 2.0 - 1.0;
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = dot(hash22(i), f);
  float b = dot(hash22(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
  float c = dot(hash22(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
  float d = dot(hash22(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));
  return 0.5 + 0.5 * mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

vec3 labToRgb(vec3 lab) {
  float l = lab.x + 0.3963377774 * lab.y + 0.2158037573 * lab.z;
  float m = lab.x - 0.1055613458 * lab.y - 0.0638541728 * lab.z;
  float s = lab.x - 0.0894841775 * lab.y - 1.2914855480 * lab.z;
  l = l * l * l;
  m = m * m * m;
  s = s * s * s;
  return vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  );
}

vec3 encode(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

vec3 horizon(vec2 p, float time, out float order) {
  float span = 0.5 * max(uAspect, 1.0);
  float x = p.x / span;
  float arch = -0.17 - 0.2 * x * x + 0.02 * sin(time * 0.6);
  float soft = mix(0.05, 0.22, uSoftness);
  float edge = p.y - arch;
  float rim = 0.38 * smoothstep(-soft, 0.42, edge);
  vec2 sun = vec2(0.08 * sin(time * 0.31) * span, 0.58);
  float spread = length((p - sun) / vec2(0.95 * span, 0.75));
  float sky = mix(0.55, 1.0, smoothstep(0.2, 0.95, spread));
  order = clamp(edge * 1.3, 0.0, 1.0);
  return vec3(rim, sky, smoothstep(0.18, 0.62, edge));
}

vec3 pinch(vec2 p, float time, out float order) {
  float span = 0.5 * max(uAspect, 0.75);
  float x = p.x / span;
  float sway = 0.02 * sin(x * 1.7 + time * 0.55);
  float breathe = 1.0 + 0.06 * sin(time * 0.8);
  float width = (0.13 + 0.22 * x * x) * breathe * mix(0.85, 1.2, uSoftness);
  float y = abs(p.y - sway) / width;
  float t = exp(-pow(y, 2.2)) * (0.42 + 0.58 * exp(-x * x * 1.8));
  order = clamp(abs(p.y - sway) * 2.4 + abs(x) * 0.3, 0.0, 1.0);
  return vec3(t, t, 0.0);
}

vec3 rise(vec2 p, float time, out float order) {
  float wide = max(uAspect, 0.9);
  vec2 center = vec2(0.05 * sin(time * 0.45) * wide, -0.7);
  vec2 radius = vec2(0.82 * wide, 0.64 * (1.0 + 0.04 * sin(time * 0.8)));
  float d = length((p - center) / radius);
  float soft = mix(0.6, 1.15, uSoftness);
  float t = clamp(pow(clamp(1.0 - d, 0.0, 1.0), soft) * 1.35, 0.0, 1.0);
  order = clamp((d - 0.2) * 1.3, 0.0, 1.0);
  return vec3(t, t, 0.0);
}

vec3 eclipse(vec2 p, float time, out float order) {
  float fit = min(1.0, uAspect * 1.25);
  float r = 0.23 * fit * (1.0 + 0.015 * sin(time * 0.9));
  float angle = atan(p.y, p.x);
  float rays = noise(vec2(cos(angle), sin(angle)) * 2.2 + time * 0.08) * 0.8 + 0.6;
  float d = length(p) - r;
  float reach = mix(0.07, 0.15, uSoftness) * rays * fit;
  float t = smoothstep(-0.006, 0.006 + 0.02 * uSoftness, d) * exp(-max(d, 0.0) / reach);
  order = clamp(d * 2.0, 0.0, 1.0);
  return vec3(t, t, 0.0);
}

vec4 tone(float t) {
  float x = smoothstep(0.3, 1.0, t) * float(uCount - 1);
  int index = int(floor(x));
  return vec4(mix(uRamp[index], uRamp[min(index + 1, uCount - 1)], fract(x)), smoothstep(0.0, 0.38, t));
}

void main() {
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
  float time = uTime;
  vec2 q = p / uScale;
  vec2 warp = vec2(
    noise(q * 1.6 + uSeed + vec2(0.0, time * 0.3)),
    noise(q * 1.6 + uSeed.yx + vec2(4.3, -time * 0.24))
  ) - 0.5;
  q += warp * uFlow * (uShape == 3 ? 0.04 : 0.18);
  float order = 0.0;
  vec3 shape;
  if (uShape == 0) shape = horizon(q, time, order);
  else if (uShape == 1) shape = pinch(q, time, order);
  else if (uShape == 2) shape = rise(q, time, order);
  else shape = eclipse(q, time, order);

  float reveal = clamp((uIntro * 1.45 - order) / 0.45, 0.0, 1.0);
  reveal = reveal * reveal * (3.0 - 2.0 * reveal);

  float scramble = 0.0;
  for (int i = 0; i < 24; i++) {
    vec4 point = uTrail[i];
    if (point.z <= 0.0) continue;
    vec2 d = p - point.xy;
    scramble = max(scramble, point.z * exp(-dot(d, d) / (uRadius * uRadius)));
  }
  for (int i = 0; i < 4; i++) {
    vec4 c = uClicks[i];
    if (c.w <= 0.0) continue;
    float d = length(p - c.xy);
    if (uClickEffect == 1) {
      scramble = max(scramble, exp(-pow((d - c.z * 0.75) / 0.06, 2.0)) * c.w);
    } else if (uClickEffect == 2) {
      float size = 0.08 + 0.22 * (1.0 - exp(-c.z * 5.0));
      scramble = max(scramble, (1.0 - smoothstep(size * 0.6, size, d)) * c.w);
    }
  }
  vec2 t = clamp(shape.xy * mix(0.7, 1.0, reveal), 0.0, 1.0);
  vec4 mixed = mix(tone(t.x), tone(t.y), shape.z);
  vec3 color = encode(labToRgb(mixed.rgb));
  float alpha = mixed.a * reveal;
  float dither = (hash12(gl_FragCoord.xy + uFrame * 13.7) - 0.5) / 255.0;
  outColor = clamp(vec4(color * alpha + dither, alpha + dither), 0.0, 1.0);
  outAux = vec4(reveal, scramble, 0.0, 1.0);
}`,ve=`
uniform sampler2D uField;
uniform sampler2D uAux;
uniform sampler2D uAtlas;
uniform vec2 uResolution;
uniform vec2 uCell;
uniform vec2 uOffset;
uniform vec2 uAtlasGrid;
uniform float uCount;
uniform float uDensity;
uniform float uOpacity;
uniform float uFlicker;
uniform float uDepth;
uniform float uGlyphTime;
uniform float uSeedValue;
uniform float uLight;
${pe}
float sampleGlyph(float index, vec2 local, vec2 coord, float soft) {
  float column = mod(index, uAtlasGrid.x);
  float row = floor(index / uAtlasGrid.x);
  vec2 atlasUv = vec2((column + local.x) / uAtlasGrid.x, (row + 1.0 - local.y) / uAtlasGrid.y);
  vec2 continuous = coord / uAtlasGrid;
  float scale = exp2(soft);
  return textureGrad(uAtlas, atlasUv, dFdx(continuous) * scale, dFdy(continuous) * scale).a;
}

vec4 glyphAt(vec2 px) {
  vec2 coord = (px - uOffset) / uCell;
  vec2 cell = floor(coord);
  vec2 local = coord - cell;
  vec2 uv = clamp(((cell + 0.5) * uCell + uOffset) / uResolution, vec2(0.0), vec2(1.0));
  vec4 field = texture(uField, uv);
  vec4 aux = texture(uAux, uv);
  vec3 visible = uLight > 0.5 ? field.rgb + (1.0 - field.a) : field.rgb;
  float luma = dot(visible, vec3(0.2126, 0.7152, 0.0722));
  float value = uLight > 0.5 ? clamp((1.0 - luma) * 1.5, 0.0, 1.0) : luma;
  float pick = hash12(cell + uSeedValue * 7.31);
  float level = hash12(cell * 1.73 + 4.1 + uSeedValue);
  float tick = floor(uGlyphTime * 9.0 + level * 9.0);
  float wobble = (hash12(cell * 2.31 + tick * 17.7) - 0.5) * uFlicker * 0.4 + (level - 0.5) * 0.1;
  float tone = clamp(pow(value, 0.75) + wobble, 0.0, 1.0);
  float index = floor(tone * (uCount - 1.0) + 0.5);
  float decode = max(aux.g, 1.0 - aux.r);
  if (decode > 0.02) {
    float frame = floor(uGlyphTime * 20.0);
    if (hash12(cell * 3.7 + frame * 5.3) < decode * 1.25) index = 1.0 + floor(hash12(cell + frame * 1.37) * (uCount - 1.0));
  }
  float present = step(pick, uDensity * mix(1.0, 0.3 + tone * 1.1, 0.55));
  float cutoff = smoothstep(0.03, 0.1, value);
  float focus = step(hash12(cell * 0.71 + 9.2 + uSeedValue), uDepth);
  float coverage = sampleGlyph(index, local, coord, focus * 1.2);
  float alpha = uOpacity * present * cutoff * coverage * mix(1.0, 0.35 + 0.65 * level, 0.55) * (1.0 - focus * 0.5);
  if (uLight < 0.5) {
    vec3 light = field.rgb * 0.55 + vec3(0.03) * field.a;
    return vec4(light * alpha, 0.6 * field.a * alpha);
  }
  vec3 ink = visible * 0.8;
  return vec4(ink * alpha, alpha);
}
`,be=`#version 300 es
precision highp float;
uniform float uDownscale;
in vec2 vUv;
out vec4 outColor;
${ve}
void main() {
  outColor = glyphAt(gl_FragCoord.xy * uDownscale);
}`,ge=`#version 300 es
precision highp float;
uniform sampler2D uSource;
uniform vec2 uStep;
in vec2 vUv;
out vec4 outColor;
void main() {
  vec4 sum = texture(uSource, vUv) * 0.2270270270;
  sum += texture(uSource, vUv + uStep * 1.3846153846) * 0.3162162162;
  sum += texture(uSource, vUv - uStep * 1.3846153846) * 0.3162162162;
  sum += texture(uSource, vUv + uStep * 3.2307692308) * 0.0702702703;
  sum += texture(uSource, vUv - uStep * 3.2307692308) * 0.0702702703;
  outColor = sum;
}`,Ce=`#version 300 es
precision highp float;
uniform sampler2D uHalo;
uniform float uGlow;
uniform float uGradient;
uniform float uGrain;
uniform float uFrame;
in vec2 vUv;
out vec4 outColor;
${ve}
void main() {
  vec4 base = texture(uField, vUv) * uGradient;
  vec4 glyph = glyphAt(gl_FragCoord.xy);
  vec4 halo = texture(uHalo, vUv) * uGlow;
  vec4 color;
  if (uLight < 0.5) {
    color = base + glyph + halo;
  } else {
    color = glyph + base * (1.0 - glyph.a);
    color += halo * 0.6 * (1.0 - color.a);
  }
  float grain = (hash12(gl_FragCoord.xy + uFrame * vec2(17.0, 59.0)) + hash12(gl_FragCoord.xy * 1.31 + uFrame * 7.0) - 1.0) * uGrain;
  float body = clamp(color.a, 0.0, 1.0);
  color.rgb += grain * (0.25 + body) * 0.5;
  color.a = clamp(color.a, 0.0, 1.0);
  color.rgb = clamp(color.rgb, 0.0, color.a);
  outColor = color;
}`,h=(e,c,r)=>Math.min(r,Math.max(c,e)),$=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,we=([e,c,r])=>{const a=$(e),l=$(c),u=$(r),t=Math.cbrt(.4122214708*a+.5363325363*l+.0514459929*u),f=Math.cbrt(.2119034982*a+.6806995451*l+.1073969566*u),m=Math.cbrt(.0883024619*a+.2817188376*l+.6299787005*u);return[.2104542553*t+.793617785*f-.0040720468*m,1.9779984951*t-2.428592205*f+.4505937099*m,.0259040371*t+.7827717662*f-.808675766*m]},me=(e,c,r)=>{const a=e.createShader(c);return a?(e.shaderSource(a,r),e.compileShader(a),a):null},z=(e,c)=>{const r=me(e,e.VERTEX_SHADER,Le),a=me(e,e.FRAGMENT_SHADER,c),l=e.createProgram();return!r||!a||!l?null:(e.attachShader(l,r),e.attachShader(l,a),e.linkProgram(l),e.deleteShader(r),e.deleteShader(a),{program:l,uniforms:{}})},de=(e,c)=>{if(!e.getProgramParameter(c.program,e.LINK_STATUS))return!1;const r=e.getProgramParameter(c.program,e.ACTIVE_UNIFORMS);for(let a=0;a<r;a++){const l=e.getActiveUniform(c.program,a);if(!l)continue;const u=l.name.replace(/\[0\]$/,"");c.uniforms[u]=e.getUniformLocation(c.program,u)}return!0},Y=(e,c)=>({textures:Array.from({length:c},()=>{const a=e.createTexture();return e.bindTexture(e.TEXTURE_2D,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),a}),framebuffer:e.createFramebuffer(),width:0,height:0}),J=(e,c,r,a)=>{c.width===r&&c.height===a||(c.width=r,c.height=a,e.bindFramebuffer(e.FRAMEBUFFER,c.framebuffer),c.textures.forEach((l,u)=>{e.bindTexture(e.TEXTURE_2D,l),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,r,a,0,e.RGBA,e.UNSIGNED_BYTE,null),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+u,e.TEXTURE_2D,l,0)}),e.bindFramebuffer(e.FRAMEBUFFER,null))},he=(e,c,r)=>{const a=[...new Set([...c].filter(R=>R!==`
`&&R!=="\r"))];a.length||a.push(" ");const l=`300 ${Math.round(100*.78)}px ${r}`,u=Math.min(16,a.length),t=Math.ceil(a.length/u),f=document.createElement("canvas");f.width=60*u,f.height=100*t;const m=f.getContext("2d");m&&(m.font=l,m.textAlign="center",m.textBaseline="middle",m.fillStyle="#fff",a.forEach((R,M)=>{const U=M%u,L=Math.floor(M/u);m.fillText(R,U*60+60/2,L*100+100/2+3)}));const F=e.createTexture();return e.bindTexture(e.TEXTURE_2D,F),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,f),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),{texture:F,count:a.length,grid:[u,t]}},Fe=e=>{const c=(Array.isArray(e.colors)&&e.colors.length?e.colors:Te).slice(0,8);return{colors:c.length>1?c:[c[0],c[0]],shape:_e[e.shape??"horizon"]??0,characters:e.characters||Ae,cellSize:h(e.cellSize??18,6,64),density:h(e.density??.8,0,1),glyphOpacity:h(e.glyphOpacity??.85,0,1),glow:h(e.glow??.2,0,2),depthOfField:h(e.depthOfField??0,0,1),flicker:h(e.flicker??.2,0,1),softness:h(e.softness??.5,0,1),scale:h(e.scale??1,.4,2.5),flow:h(e.flow??.5,0,2),speed:Math.max(0,e.speed??1),gradientOpacity:h(e.gradientOpacity??.9,0,1),grain:h(e.grain??.08,0,.4),variation:Math.max(0,e.variation??0),mouseInteraction:e.mouseInteraction??!0,scrambleRadius:h(e.scrambleRadius??.1,.02,.4),clickEffect:ye[e.clickEffect??"wave"]??1,intro:e.intro??!0,lightMode:e.lightMode??!1,fontFamily:e.fontFamily||Re,dpr:e.dpr}};function Me(e,c={}){const r=Fe(c),a=document.createElement("canvas");a.className="gradient-ascii-canvas",a.setAttribute("aria-hidden","true"),e.appendChild(a);const l=()=>a.remove(),u=a.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!u)return l;const t=u,f=t.getExtension("KHR_parallel_shader_compile"),m=z(t,Se),F=z(t,be),R=z(t,ge),M=z(t,Ce);if(!m||!F||!R||!M)return l;const U=m,L=F,I=R,P=M,S=[U,L,I,P];if(!f&&!S.every(i=>de(t,i)))return S.forEach(i=>t.deleteProgram(i.program)),l;const j=t.createVertexArray(),_=Y(t,2),x=Y(t,1),G=Y(t,1),b=document.createElement("canvas").getContext("2d",{willReadFrequently:!0}),xe=i=>{if(!b)return[0,0,0];b.clearRect(0,0,1,1),b.fillStyle="#000000",b.fillStyle=i,b.fillRect(0,0,1,1);const[o,s,n]=b.getImageData(0,0,1,1).data;return[o/255,s/255,n/255]},y=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,T={width:1,height:1,ratio:1},Q=new Float32Array(24);r.colors.forEach((i,o)=>Q.set(we(xe(i)),o*3));const H=new Float32Array(16),A=[],B=new Float32Array(96),p=[],d={x:0,y:0,inside:!1};let E=null,Z=0,ee=0,D=r.intro&&!y?0:1,k=0,V=0,g=0,C=0,N=!0,O=!1,q=!f;const te=()=>!f||S.every(i=>t.getProgramParameter(i.program,f.COMPLETION_STATUS_KHR)),oe=()=>{if(!t.isContextLost()){if(!q&&!te()){requestAnimationFrame(oe);return}S.forEach(i=>t.deleteProgram(i.program))}};E=he(t,r.characters,r.fontFamily),document.fonts?.load?.(`300 64px ${r.fontFamily}`,r.characters).then(()=>{O||(E&&t.deleteTexture(E.texture),E=he(t,r.characters,r.fontFamily),W())},()=>{});const re=(i,o,s)=>{if(!E)return;const n=i.uniforms,v=r.cellSize*T.ratio,w=v*(60/100);t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,_.textures[0]),t.uniform1i(n.uField,0),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,_.textures[1]),t.uniform1i(n.uAux,1),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,E.texture),t.uniform1i(n.uAtlas,2),t.uniform2f(n.uResolution,o,s),t.uniform2f(n.uCell,w,v),t.uniform2f(n.uOffset,(o-Math.ceil(o/w)*w)/2,(s-Math.ceil(s/v)*v)/2),t.uniform2f(n.uAtlasGrid,E.grid[0],E.grid[1]),t.uniform1f(n.uCount,E.count),t.uniform1f(n.uDensity,r.density),t.uniform1f(n.uOpacity,r.glyphOpacity),t.uniform1f(n.uFlicker,y?0:r.flicker),t.uniform1f(n.uDepth,r.depthOfField),t.uniform1f(n.uGlyphTime,ee),t.uniform1f(n.uSeedValue,r.variation),t.uniform1f(n.uLight,r.lightMode?1:0)};function W(){if(!q)return;const i=T.width/T.height;t.bindVertexArray(j),t.disable(t.BLEND),t.bindFramebuffer(t.FRAMEBUFFER,_.framebuffer),t.drawBuffers([t.COLOR_ATTACHMENT0,t.COLOR_ATTACHMENT1]),t.viewport(0,0,_.width,_.height),t.useProgram(U.program);const o=U.uniforms;t.uniform1f(o.uAspect,i),t.uniform1f(o.uTime,Z),t.uniform1i(o.uShape,r.shape),t.uniform3fv(o.uRamp,Q),t.uniform1i(o.uCount,r.colors.length),t.uniform1f(o.uScale,r.scale),t.uniform1f(o.uSoftness,r.softness),t.uniform1f(o.uFlow,r.flow),t.uniform2f(o.uSeed,r.variation*3.17,r.variation*1.91),t.uniform4fv(o.uTrail,B),t.uniform1f(o.uRadius,r.scrambleRadius),t.uniform4fv(o.uClicks,H),t.uniform1i(o.uClickEffect,r.clickEffect),t.uniform1f(o.uIntro,D),t.uniform1f(o.uFrame,k),t.drawArrays(t.TRIANGLES,0,3);const s=r.glow>.001;s&&(t.bindFramebuffer(t.FRAMEBUFFER,x.framebuffer),t.drawBuffers([t.COLOR_ATTACHMENT0]),t.viewport(0,0,x.width,x.height),t.useProgram(L.program),re(L,a.width,a.height),t.uniform1f(L.uniforms.uDownscale,a.width/x.width),t.drawArrays(t.TRIANGLES,0,3),t.useProgram(I.program),t.activeTexture(t.TEXTURE0),t.uniform1i(I.uniforms.uSource,0),t.bindFramebuffer(t.FRAMEBUFFER,G.framebuffer),t.bindTexture(t.TEXTURE_2D,x.textures[0]),t.uniform2f(I.uniforms.uStep,1/x.width,0),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,x.framebuffer),t.bindTexture(t.TEXTURE_2D,G.textures[0]),t.uniform2f(I.uniforms.uStep,0,1/x.height),t.drawArrays(t.TRIANGLES,0,3)),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,a.width,a.height),t.useProgram(P.program),re(P,a.width,a.height);const n=P.uniforms;t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,x.textures[0]),t.uniform1i(n.uHalo,3),t.uniform1f(n.uGlow,s?r.glow:0),t.uniform1f(n.uGradient,r.gradientOpacity),t.uniform1f(n.uGrain,r.grain),t.uniform1f(n.uFrame,k),t.drawArrays(t.TRIANGLES,0,3)}const ae=()=>{T.width=Math.max(1,e.clientWidth),T.height=Math.max(1,e.clientHeight),T.ratio=Math.min(r.dpr||window.devicePixelRatio||1,2),a.width=Math.max(1,Math.round(T.width*T.ratio)),a.height=Math.max(1,Math.round(T.height*T.ratio)),J(t,_,Math.max(1,Math.round(a.width/2)),Math.max(1,Math.round(a.height/2)));const i=Math.max(1,Math.round(a.width/4)),o=Math.max(1,Math.round(a.height/4));J(t,x,i,o),J(t,G,i,o),W(),X()},Ee=i=>{for(p.forEach(o=>{o.age+=i});p.length&&p[p.length-1].age>.7;)p.pop();for(let o=0;o<24;o++){const s=p[o];if(!s){B[o*4+2]=0;continue}const n=1-s.age/.7;B.set([s.x,s.y,n*n,0],o*4)}for(A.forEach(o=>{o.age+=i});A.length&&A[A.length-1].age>1.2;)A.pop();for(let o=0;o<4;o++){const s=A[o];if(!s){H[o*4+3]=0;continue}const n=s.age/1.2,v=Math.min(1,s.age/.08)*(1-n)*(1-n);H.set([s.x,s.y,s.age,v],o*4)}},K=i=>{if(g=0,O||!N||document.hidden)return;if(!q){if(!t.isContextLost()&&!te()){g=requestAnimationFrame(K);return}if(!S.every(n=>de(t,n))){fe();return}q=!0}const o=C?h((i-C)/1e3,.001,.05):1/60;C=i,y||(Z+=o*r.speed*.5,ee+=o*Math.max(r.speed,.15)),D<1&&(D=Math.min(1,D+o/2.4)),V+=o,!y&&V>1/24&&(V=0,k=(k+1)%97),Ee(o),W(),!y||D<1||A.length>0||p.length>0?g=requestAnimationFrame(K):C=0};function X(){!g&&!O&&N&&!document.hidden&&(g=requestAnimationFrame(K))}const ie=i=>{const o=e.getBoundingClientRect(),s=(i.clientX-o.left)/Math.max(1,o.width),n=1-(i.clientY-o.top)/Math.max(1,o.height),v=o.width/Math.max(1,o.height);d.inside=s>=0&&s<=1&&n>=0&&n<=1,d.x=(s-.5)*v,d.y=n-.5},ne=i=>{if(ie(i),!d.inside||!r.mouseInteraction||y)return;const o=p[0],s=o?Math.hypot(d.x-o.x,d.y-o.y):1/0;if(!(s<.015)){if(o&&o.age<.1){const n=Math.min(6,Math.floor(s/.03));for(let v=1;v<=n;v++){const w=v/(n+1);p.unshift({x:o.x+(d.x-o.x)*w,y:o.y+(d.y-o.y)*w,age:0})}}p.unshift({x:d.x,y:d.y,age:0}),p.length=Math.min(p.length,24),X()}},ce=i=>{ie(i),!(!d.inside||!r.clickEffect||y)&&(A.unshift({x:d.x,y:d.y,age:0}),A.length>4&&A.pop(),X())},se=()=>{C=0,X()},le=new ResizeObserver(ae);le.observe(e);const ue=new IntersectionObserver(i=>{N=i.some(o=>o.isIntersecting),N&&(C=0,X())});ue.observe(e),window.addEventListener("pointermove",ne,{passive:!0}),window.addEventListener("pointerdown",ce,{passive:!0}),document.addEventListener("visibilitychange",se),ae();function fe(){O||(O=!0,cancelAnimationFrame(g),le.disconnect(),ue.disconnect(),window.removeEventListener("pointermove",ne),window.removeEventListener("pointerdown",ce),document.removeEventListener("visibilitychange",se),[_,x,G].forEach(i=>{i.textures.forEach(o=>t.deleteTexture(o)),t.deleteFramebuffer(i.framebuffer)}),E&&t.deleteTexture(E.texture),t.deleteVertexArray(j),a.isConnected?oe():(S.forEach(i=>t.deleteProgram(i.program)),t.getExtension("WEBGL_lose_context")?.loseContext()))}return fe}document.querySelectorAll("[data-gradient-ascii]").forEach(e=>{let c={};try{c=JSON.parse(e.dataset.gradientAscii||"{}")}catch{}Me(e,c)});
