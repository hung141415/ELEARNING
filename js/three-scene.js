/**
 * THREE.JS CLAYMORPHISM 3D SCENE
 * Soft clay spheres, toruses, and geometric shapes with realistic studio lighting
 * Responsive mouse parallax and floating physics
 */

(function () {
  'use strict';

  // Check user prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const container = document.getElementById('webgl-canvas-container');
  if (!container || typeof THREE === 'undefined') {
    return;
  }

  // Scene setup
  const scene = new THREE.Scene();

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 32;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Lighting - Studio clay lighting setup
  const ambientLight = new THREE.AmbientLight(0xf0f5ff, 1.2);
  scene.add(ambientLight);

  // Main Key light (Warm soft white)
  const keyLight = new THREE.DirectionalLight(0xfff5ea, 1.5);
  keyLight.position.set(15, 20, 20);
  scene.add(keyLight);

  // Cool Navy Rim light (Creates crisp clay edge highlight)
  const rimLight = new THREE.DirectionalLight(0x73a5e8, 1.4);
  rimLight.position.set(-20, -10, 10);
  scene.add(rimLight);

  // Top soft fill light
  const topLight = new THREE.PointLight(0xffffff, 0.8, 50);
  topLight.position.set(0, 15, 10);
  scene.add(topLight);

  // Clay Materials (High roughness, very low metalness, soft specular)
  const materials = {
    navyDeep: new THREE.MeshStandardMaterial({
      color: 0x142845,
      roughness: 0.45,
      metalness: 0.08,
      flatShading: false
    }),
    navySoft: new THREE.MeshStandardMaterial({
      color: 0x244a78,
      roughness: 0.42,
      metalness: 0.05
    }),
    clayWhite: new THREE.MeshStandardMaterial({
      color: 0xf4f7fc,
      roughness: 0.48,
      metalness: 0.04
    }),
    clayCoral: new THREE.MeshStandardMaterial({
      color: 0xff5e36,
      roughness: 0.4,
      metalness: 0.05
    }),
    clayAmber: new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.42,
      metalness: 0.06
    }),
    clayCyan: new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.44,
      metalness: 0.04
    })
  };

  // Group of floating shapes
  const floatingGroup = new THREE.Group();
  scene.add(floatingGroup);

  const shapes = [];

  // Helper to add clay object
  function addClayShape(geometry, material, pos, rotSpeed, floatSpeed, amp) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(pos.x, pos.y, pos.z);
    floatingGroup.add(mesh);
    shapes.push({
      mesh,
      basePos: { ...pos },
      rotSpeed,
      floatSpeed,
      amp,
      timeOffset: Math.random() * 10
    });
    return mesh;
  }

  // 1. Big Navy Torus (Top Left)
  addClayShape(
    new THREE.TorusGeometry(3.5, 1.2, 32, 64),
    materials.navySoft,
    { x: -16, y: 8, z: -8 },
    { x: 0.005, y: 0.008, z: 0.003 },
    0.8,
    0.8
  );

  // 2. Smooth Coral Clay Sphere (Top Right - Hero accent)
  addClayShape(
    new THREE.SphereGeometry(2.4, 48, 48),
    materials.clayCoral,
    { x: 17, y: 11, z: -6 },
    { x: 0.004, y: 0.006, z: 0 },
    1.1,
    0.9
  );

  // 3. Crisp White Clay Sphere with Inset look (Middle Left)
  addClayShape(
    new THREE.SphereGeometry(2.8, 48, 48),
    materials.clayWhite,
    { x: -18, y: -4, z: -10 },
    { x: 0.003, y: 0.005, z: 0 },
    0.9,
    1.2
  );

  // 4. Amber Clay Torus / Ring (Middle Right)
  addClayShape(
    new THREE.TorusGeometry(2.0, 0.65, 32, 48),
    materials.clayAmber,
    { x: 18, y: -6, z: -8 },
    { x: 0.007, y: -0.005, z: 0.004 },
    1.2,
    0.7
  );

  // 5. Deep Navy Pill / Cylinder Capsule (Center-Bottom background)
  const cylinderGeo = new THREE.CylinderGeometry(1.2, 1.2, 3.5, 32);
  addClayShape(
    cylinderGeo,
    materials.navyDeep,
    { x: -10, y: -14, z: -14 },
    { x: 0.006, y: 0.008, z: 0.005 },
    0.7,
    0.6
  );

  // 6. Cyan Clay Sphere (Floating particle)
  addClayShape(
    new THREE.SphereGeometry(1.3, 32, 32),
    materials.clayCyan,
    { x: 12, y: -16, z: -12 },
    { x: 0.005, y: 0.003, z: 0 },
    1.3,
    0.8
  );

  // 7. Small White Floating Bubbles
  addClayShape(
    new THREE.SphereGeometry(0.9, 24, 24),
    materials.clayWhite,
    { x: 6, y: 15, z: -15 },
    { x: 0.002, y: 0.004, z: 0 },
    1.5,
    0.5
  );

  addClayShape(
    new THREE.SphereGeometry(1.1, 24, 24),
    materials.clayCoral,
    { x: -6, y: -10, z: -16 },
    { x: 0.004, y: 0.002, z: 0 },
    1.0,
    0.6
  );

  // Mouse Parallax Interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Responsive Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    if (!prefersReducedMotion) {
      // Smooth camera / group parallax
      targetX += (mouseX * 2.2 - targetX) * 0.04;
      targetY += (mouseY * 2.2 - targetY) * 0.04;

      floatingGroup.position.x = targetX;
      floatingGroup.position.y = targetY;

      // Animate individual clay shapes
      shapes.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.rotation.z += item.rotSpeed.z;

        // Gentle floating wave
        const floatY = Math.sin(elapsedTime * item.floatSpeed + item.timeOffset) * item.amp;
        item.mesh.position.y = item.basePos.y + floatY;
      });
    }

    renderer.render(scene, camera);
  }

  animate();
})();
