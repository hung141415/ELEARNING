/**
 * Three.js Interactive Hero Background
 * Tailored for Dark Navy Blue (#071120) & Light Brown (#C4A07C) Luxury Minimalist Theme
 */

(function () {
  const container = document.getElementById('three-hero-canvas');
  if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  let scene, camera, renderer;
  let particlesMesh, ringGroup;
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.z = 240;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Constellation in Light Brown (#C4A07C) & Navy Accents
    const particleCount = window.innerWidth < 768 ? 60 : 130;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const brownAccent = new THREE.Color(0xc4a07c); // Light Brown
    const goldLight = new THREE.Color(0xe0c4a4);   // Soft Light Brown
    const blueIce = new THREE.Color(0x3b82f6);     // Subtle Blue Mist

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 380;
      positions[i3 + 1] = (Math.random() - 0.5) * 280;
      positions[i3 + 2] = (Math.random() - 0.5) * 180;

      const rand = Math.random();
      let chosenColor = rand > 0.5 ? brownAccent : (rand > 0.25 ? goldLight : blueIce);
      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle circle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(224, 196, 164, 0.8)');
    grad.addColorStop(1, 'rgba(7, 17, 32, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();

    const particleTexture = new THREE.CanvasTexture(canvas);

    const pMaterial = new THREE.PointsMaterial({
      size: 5,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    particlesMesh = new THREE.Points(geometry, pMaterial);
    scene.add(particlesMesh);

    // Floating Elegant Geometric Rings (Light Brown wireframes)
    ringGroup = new THREE.Group();

    // Torus Ring 1 (Light Brown)
    const torusGeom1 = new THREE.TorusGeometry(80, 0.5, 16, 100);
    const torusMat1 = new THREE.MeshBasicMaterial({
      color: 0xc4a07c,
      transparent: true,
      opacity: 0.28,
      wireframe: true
    });
    const ring1 = new THREE.Mesh(torusGeom1, torusMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    ringGroup.add(ring1);

    // Torus Ring 2 (Soft Golden Glow)
    const torusGeom2 = new THREE.TorusGeometry(105, 0.35, 16, 100);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: 0xe0c4a4,
      transparent: true,
      opacity: 0.18,
      wireframe: true
    });
    const ring2 = new THREE.Mesh(torusGeom2, torusMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 4;
    ringGroup.add(ring2);

    scene.add(ringGroup);

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
  }

  function onWindowResize() {
    if (!container) return;
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.06;
    mouseY = (event.clientY - windowHalfY) * 0.06;
  }

  function animate() {
    requestAnimationFrame(animate);

    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    if (particlesMesh) {
      particlesMesh.rotation.y += 0.0006;
      particlesMesh.rotation.x += 0.0003;
      particlesMesh.position.x = targetX * 0.3;
      particlesMesh.position.y = -targetY * 0.3;
    }

    if (ringGroup) {
      ringGroup.rotation.x += 0.001;
      ringGroup.rotation.y += 0.0015;
      ringGroup.position.x = -targetX * 0.4;
      ringGroup.position.y = targetY * 0.4;
    }

    renderer.render(scene, camera);
  }

  if (typeof THREE !== 'undefined') {
    init();
    animate();
  } else {
    window.addEventListener('load', () => {
      if (typeof THREE !== 'undefined') {
        init();
        animate();
      }
    });
  }
})();
