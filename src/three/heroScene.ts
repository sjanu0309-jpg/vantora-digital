import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * Signature hero scene: a 3D interpretation of the VANTORA "V" mark with a
 * growth arrow, metallic silver + electric-blue materials, cyan energy trails
 * and floating particles. Vanilla Three.js, loaded lazily.
 */
export interface HeroSceneHandle {
  dispose: () => void;
  setActive: (active: boolean) => void;
}

const COLORS = {
  navy: 0x071426,
  deep: 0x0b3b78,
  electric: 0x087bff,
  cyan: 0x20d4ff,
  silver: 0xd8dee8,
};

function dotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.25, 'rgba(160,230,255,0.85)');
  grd.addColorStop(1, 'rgba(32,212,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function shape(points: [number, number][]) {
  const s = new THREE.Shape();
  points.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  s.closePath();
  return s;
}

export function createHeroScene(
  container: HTMLElement,
  opts: { mobile: boolean; reducedMotion: boolean },
): HeroSceneHandle {
  const renderer = new THREE.WebGLRenderer({ antialias: !opts.mobile, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, opts.mobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden', 'true');

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.2, 9);

  // Lights — cinematic, controlled
  scene.add(new THREE.AmbientLight(0x6c8cff, 0.35));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(-4, 5, 6);
  scene.add(key);
  const rimBlue = new THREE.PointLight(COLORS.electric, 40, 20);
  rimBlue.position.set(3.5, 1.5, 2.5);
  scene.add(rimBlue);
  const rimCyan = new THREE.PointLight(COLORS.cyan, 25, 18);
  rimCyan.position.set(-3, -2, 3);
  scene.add(rimCyan);

  const root = new THREE.Group();
  scene.add(root);
  const mark = new THREE.Group();
  root.add(mark);

  // ---- The V mark (based on the supplied logo: silver left stroke, blue right stroke)
  const extrude: THREE.ExtrudeGeometryOptions = {
    depth: 0.42,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.05,
    bevelSegments: opts.mobile ? 2 : 4,
    curveSegments: 4,
  };
  const silver = new THREE.MeshPhysicalMaterial({
    color: COLORS.silver,
    metalness: 1,
    roughness: 0.18,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.4,
  });
  const blue = new THREE.MeshPhysicalMaterial({
    color: COLORS.electric,
    metalness: 0.75,
    roughness: 0.15,
    clearcoat: 1,
    emissive: new THREE.Color(COLORS.deep),
    emissiveIntensity: 0.6,
    envMapIntensity: 1.3,
  });
  const glow = new THREE.MeshStandardMaterial({
    color: COLORS.cyan,
    emissive: new THREE.Color(COLORS.electric),
    emissiveIntensity: 0.9,
    metalness: 0.4,
    roughness: 0.3,
  });

  const left = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shape([[-1.45, 1.15], [-0.7, 1.15], [0.02, -0.55], [0.02, -1.2], [-0.32, -1.2]]), extrude),
    silver,
  );
  const right = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shape([[0.02, -0.55], [0.6, 0.85], [1.22, 0.85], [0.32, -1.2], [0.02, -1.2]]), extrude),
    blue,
  );
  // inner blue facet on the silver stroke (logo detail)
  const facet = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shape([[-1.0, 1.0], [-0.82, 1.0], [-0.12, -0.72], [-0.28, -0.72]]), { ...extrude, depth: 0.5 }),
    blue,
  );
  facet.position.z = 0.02;

  // Growth arrow rising from the right stroke
  const shaft = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shape([[0.95, 0.55], [1.12, 0.55], [1.78, 1.72], [1.62, 1.8]]), { ...extrude, depth: 0.22 }),
    glow,
  );
  const head = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shape([[1.35, 1.82], [2.15, 2.25], [1.95, 1.38]]), { ...extrude, depth: 0.24 }),
    glow,
  );
  shaft.position.z = head.position.z = 0.1;

  [left, right, facet, shaft, head].forEach((m) => mark.add(m));
  mark.position.set(-0.32, -0.25, -0.21);

  // Halo ring echoing the circular logo badge
  const ringMat = new THREE.MeshBasicMaterial({ color: COLORS.cyan, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.75, 0.012, 8, 160), ringMat);
  root.add(ring);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.006, 8, 160), ringMat.clone());
  (ring2.material as THREE.MeshBasicMaterial).opacity = 0.25;
  ring2.rotation.x = 1.2;
  root.add(ring2);

  // Glow disc behind the mark
  const halo = new THREE.Mesh(
    new THREE.PlaneGeometry(9, 9),
    new THREE.MeshBasicMaterial({ map: dotTexture(), color: COLORS.electric, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  halo.position.z = -1.5;
  root.add(halo);

  // ---- Energy trails (cyan curves with travelling sparks)
  const trails: { curve: THREE.CatmullRomCurve3; spark: THREE.Sprite; speed: number; offset: number }[] = [];
  const sparkMat = new THREE.SpriteMaterial({ map: dotTexture(), color: COLORS.cyan, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true });
  const trailCount = opts.mobile ? 3 : 5;
  for (let i = 0; i < trailCount; i++) {
    const a = (i / trailCount) * Math.PI * 2;
    const r = 2.2 + Math.random() * 0.9;
    const pts = [];
    for (let k = 0; k <= 8; k++) {
      const t = a + k * 0.55;
      pts.push(new THREE.Vector3(Math.cos(t) * r, Math.sin(t) * r * 0.62 + (k - 4) * 0.12, Math.sin(t * 1.3) * 1.2));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const line = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 80, 0.006, 4, false),
      new THREE.MeshBasicMaterial({ color: i % 2 ? COLORS.cyan : COLORS.electric, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    root.add(line);
    const spark = new THREE.Sprite(sparkMat);
    spark.scale.setScalar(0.28);
    root.add(spark);
    trails.push({ curve, spark, speed: 0.05 + Math.random() * 0.05, offset: Math.random() });
  }

  // ---- Floating particles
  const count = opts.mobile ? 450 : 1300;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 22;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const particles = new THREE.Points(
    pGeo,
    new THREE.PointsMaterial({ size: 0.06, map: dotTexture(), color: 0x9fdcff, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  scene.add(particles);

  // ---- Sizing
  const resize = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the mark fully visible on narrow screens
    camera.position.z = w / h < 0.8 ? 12.5 : w / h < 1.1 ? 10.5 : 9.5;
    root.position.x = w / h > 0.85 && window.innerWidth > 1023 ? 0.7 : 0;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  // ---- Interaction
  const pointer = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  const clock = new THREE.Clock();
  let active = true;
  let raf = 0;
  const intro = { t: 0 };

  const render = () => {
    raf = 0;
    if (!active) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    const motion = opts.reducedMotion ? 0 : 1;

    // cinematic reveal: rise + spin-in over ~2s
    intro.t = Math.min(1, intro.t + dt / 2.2);
    const e = 1 - Math.pow(1 - intro.t, 3);
    mark.scale.setScalar(0.6 + 0.4 * e);
    mark.rotation.y = (1 - e) * -1.6 + Math.sin(t * 0.5) * 0.18 * motion;
    mark.rotation.x = Math.sin(t * 0.35) * 0.06 * motion;
    mark.position.y = -0.25 + (1 - e) * -1.2 + Math.sin(t * 0.9) * 0.06 * motion;

    // scroll-based transformation
    const scroll = Math.min(1, window.scrollY / Math.max(window.innerHeight, 1));
    root.rotation.y = scroll * 0.9;
    root.rotation.x = scroll * -0.25;
    root.position.y = scroll * 1.4;

    ring.rotation.z = t * 0.12 * motion;
    ring2.rotation.z = -t * 0.08 * motion;
    ring2.rotation.y = Math.sin(t * 0.2) * 0.3 * motion;
    glow.emissiveIntensity = 0.8 + Math.sin(t * 2.2) * 0.25 * motion;

    trails.forEach((tr) => {
      const u = (tr.offset + t * tr.speed * motion) % 1;
      tr.curve.getPointAt(u, tr.spark.position);
    });
    particles.rotation.y = t * 0.015 * motion;
    particles.position.y = Math.sin(t * 0.2) * 0.15 * motion;

    // subtle camera drift following the pointer
    camera.position.x += (pointer.x * 0.6 * motion - camera.position.x) * 0.04;
    camera.position.y += (0.2 - pointer.y * 0.4 * motion - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    raf = requestAnimationFrame(render);
  };
  raf = requestAnimationFrame(render);

  const onVisibility = () => setActive(!document.hidden);
  document.addEventListener('visibilitychange', onVisibility);

  function setActive(next: boolean) {
    if (next === active) return;
    active = next;
    if (active && !raf) {
      clock.getDelta();
      raf = requestAnimationFrame(render);
    }
  }

  return {
    setActive,
    dispose() {
      active = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose());
      });
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
