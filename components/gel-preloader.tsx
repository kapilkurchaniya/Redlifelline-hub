"use client"

import { useEffect, useState, useRef } from "react"

export function GelPreloader() {
  const [isVisible, setIsVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    let animationFrameId: number
    let scene: any, camera: any, renderer: any, gelBlob: any, textMesh: any

    const initThreeJS = async () => {
      // Dynamically import Three.js
      const THREE = await import("three")

      // Scene setup
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0xffffff)

      // Camera setup
      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 5

      // Renderer setup
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true,
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      // Lighting setup - multiple lights for photorealistic effect
      const keyLight = new THREE.DirectionalLight(0xffffff, 1.2)
      keyLight.position.set(5, 5, 5)
      scene.add(keyLight)

      const fillLight = new THREE.DirectionalLight(0xff6b6b, 0.6)
      fillLight.position.set(-3, 2, -3)
      scene.add(fillLight)

      const rimLight = new THREE.DirectionalLight(0xff3333, 0.8)
      rimLight.position.set(0, -5, -5)
      scene.add(rimLight)

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
      scene.add(ambientLight)

      // Create gel blob with subsurface scattering effect
      const geometry = new THREE.IcosahedronGeometry(1.5, 32)

      // Custom shader for realistic gel material with subsurface scattering
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x7f1d1d) }, // dark crimson
          color2: { value: new THREE.Color(0xdc2626) }, // red-600
          color3: { value: new THREE.Color(0xef4444) }, // red-500
          color4: { value: new THREE.Color(0xf87171) }, // red-400
          lightPosition: { value: new THREE.Vector3(5, 5, 5) },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float time;
          
          // Noise function for organic deformation
          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
          vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
          
          float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i  = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
          }
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            
            vec3 pos = position;
            float noise1 = snoise(pos * 0.8 + time * 0.3) * 0.15;
            float noise2 = snoise(pos * 1.5 + time * 0.5) * 0.08;
            float noise3 = snoise(pos * 2.5 - time * 0.4) * 0.04;
            
            // Pulsation effect synchronized with "heartbeat"
            float pulse = sin(time * 2.0) * 0.05;
            
            pos += normal * (noise1 + noise2 + noise3 + pulse);
            
            vPosition = pos;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          uniform vec3 color4;
          uniform vec3 lightPosition;
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vec3 normal = normalize(vNormal);
            vec3 lightDir = normalize(lightPosition - vPosition);
            
            // Diffuse lighting
            float diffuse = max(dot(normal, lightDir), 0.0);
            
            // Fresnel effect for edge glow
            vec3 viewDir = normalize(cameraPosition - vPosition);
            float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
            
            // Subsurface scattering - light penetrates and scatters
            float backlight = max(dot(normal, -lightDir), 0.0);
            float subsurface = pow(backlight, 2.0) * 0.5;
            
            // Multi-layer gradient mixing
            float gradientMix = (vPosition.y + 1.5) / 3.0;
            vec3 baseColor = mix(color1, color2, gradientMix);
            baseColor = mix(baseColor, color3, fresnel * 0.5);
            
            // Add glow and subsurface effect
            vec3 glowColor = color4 * fresnel * 1.5;
            vec3 subsurfaceColor = color3 * subsurface;
            
            // Combine lighting effects
            vec3 finalColor = baseColor * (0.3 + diffuse * 0.7) + glowColor + subsurfaceColor;
            
            // Pulsing glow synchronized with animation
            float glowPulse = sin(time * 2.0) * 0.1 + 0.9;
            finalColor *= glowPulse;
            
            gl_FragColor = vec4(finalColor, 0.95);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
      })

      gelBlob = new THREE.Mesh(geometry, material)
      scene.add(gelBlob)

      // Animate
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate)

        const time = Date.now() * 0.001
        material.uniforms.time.value = time

        // Gentle rotation
        gelBlob.rotation.x = time * 0.1
        gelBlob.rotation.y = time * 0.15

        // Pulsing scale
        const scale = 1 + Math.sin(time * 2) * 0.05
        gelBlob.scale.set(scale, scale, scale)

        // Animate light intensity for heartbeat effect
        keyLight.intensity = 1.2 + Math.sin(time * 2) * 0.2

        renderer.render(scene, camera)
      }

      animate()

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }

    initThreeJS()

    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 2700)

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 3300)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      if (renderer) {
        renderer.dispose()
      }
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white via-red-50 to-white transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div
        className={`relative z-10 text-center space-y-6 transition-all duration-700 ${
          fadeOut ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="relative">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-700 via-red-600 to-red-500 bg-clip-text text-transparent tracking-tight animate-pulse-glow">
            Red Lifeline Hub Foundation
          </h1>
          <div className="absolute inset-0 blur-xl bg-gradient-to-r from-red-600 via-red-500 to-red-400 opacity-30 animate-pulse-glow"></div>
        </div>

        <p className="text-sm text-red-600 tracking-widest uppercase font-semibold animate-fade-in">
          Saving Lives Together
        </p>

        <div className="flex items-center justify-center gap-2 mt-8">
          <div className="loading-dot"></div>
          <div className="loading-dot" style={{ animationDelay: "0.2s" }}></div>
          <div className="loading-dot" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out 0.5s both;
        }

        .loading-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #dc2626, #ef4444);
          animation: loading-bounce 1.4s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(220, 38, 38, 0.5);
        }

        @keyframes loading-bounce {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.3);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
