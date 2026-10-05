/**
 * Three.js Ambient Particle Grid Background
 * Project: TOEIC ONLINE PRO Checkout
 * Luxury Dark Navy & Champagne Gold Constellation Wave
 */

(function () {
  'use strict';

  // Check reduced motion preference
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery.matches) return;

  const container = document.getElementById('three-canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b1838, 0.0018);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.z = 700;
  camera.position.y = 120;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Particles Geometry
  const particleCount = 280;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  // Gold (#c4a07c) & Emerald/Cyan (#10b981 / #34d399) colors
  const colorGold = new THREE.Color(0xc4a07c);
  const colorCyan = new THREE.Color(0x34d399);
  const colorNavy = new THREE.Color(0x2b5ea7);

  const initialPositions = [];

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 1600;
    const y = (Math.random() - 0.5) * 800;
    const z = (Math.random() - 0.5) * 1000;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    initialPositions.push({ x, y, z, speed: 0.2 + Math.random() * 0.4 });

    const mixedColor = new THREE.Color();
    const ratio = Math.random();
    if (ratio < 0.6) {
      mixedColor.copy(colorGold);
    } else if (ratio < 0.85) {
      mixedColor.copy(colorCyan);
    } else {
      mixedColor.copy(colorNavy);
    }

    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Circular Soft Glow Particle Texture
  function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(224,196,164,0.8)');
    grad.addColorStop(0.8, 'rgba(196,160,124,0.15)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  const particleMaterial = new THREE.PointsMaterial({
    size: 9,
    map: createParticleTexture(),
    transparent: true,
    opacity: 0.75,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(geometry, particleMaterial);
  scene.add(particleSystem);

  // Subtle Interactive Pointer Response
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  function onPointerMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.35;
    mouseY = (event.clientY - windowHalfY) * 0.25;
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });

  // Handle Resize
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize, false);

  // Animation Loop with low power impact
  let clock = new THREE.Clock();
  let isVisible = true;

  document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
  });

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    const elapsedTime = clock.getElapsedTime();

    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    camera.position.x = targetX * 0.8;
    camera.position.y = 120 - targetY * 0.5;
    camera.lookAt(0, 0, 0);

    // Gently wave vertices
    const pos = geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const init = initialPositions[i];
      pos[i * 3 + 1] = init.y + Math.sin(elapsedTime * init.speed + init.x * 0.01) * 35;
      pos[i * 3] = init.x + Math.cos(elapsedTime * 0.3 + init.z * 0.005) * 15;
    }
    geometry.attributes.position.needsUpdate = true;

    particleSystem.rotation.y = elapsedTime * 0.02;

    renderer.render(scene, camera);
  }

  animate();
})();
