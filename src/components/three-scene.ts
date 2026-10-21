import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
export function mountScene(
  root: HTMLElement,
  variant: string,
  onReady: () => void,
  installation = false,
) {
  let renderer: THREE.WebGLRenderer;
  const canvas = document.createElement("canvas");
  const attributes = {
    alpha: true,
    antialias: true,
    powerPreference: "low-power" as const,
  };
  try {
    const context = canvas.getContext("webgl2", attributes) as WebGL2RenderingContext | null;
    if (!context) return () => {};

    renderer = new THREE.WebGLRenderer({ canvas, context, ...attributes });
  } catch {
    return () => {};
  }
  canvas.setAttribute("aria-hidden", "true");
  root.appendChild(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(6, 4.2, 9);
  camera.lookAt(0, 0.3, 0);
  renderer.setPixelRatio(
    Math.min(devicePixelRatio, innerWidth < 720 ? 1 : 1.5),
  );
  renderer.setClearColor(0x101211, 0);
  const group = new THREE.Group();
  scene.add(group);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  const color = 0xef8138;
  const metal = new THREE.MeshStandardMaterial({
    color: 0x111313,
    metalness: 1,
    roughness: 0.19,
    envMapIntensity: 2.4,
  });
  const warm = new THREE.MeshStandardMaterial({
    color: 0xb6551f,
    metalness: 0.72,
    roughness: 0.24,
    emissive: 0xe45c09,
    emissiveIntensity: 0.75,
  });
  const silver = new THREE.MeshStandardMaterial({
    color: 0x757b77,
    metalness: 0.95,
    roughness: 0.22,
    envMapIntensity: 1.6,
  });
  const edge = new THREE.LineBasicMaterial({
    color: 0x9faaa5,
    transparent: true,
    opacity: 0.25,
  });
  function tube(
    points: THREE.Vector3[],
    radius: number,
    material: THREE.Material,
    segments = 96,
  ) {
    const mesh = new THREE.Mesh(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        segments,
        radius,
        8,
        false,
      ),
      material,
    );
    group.add(mesh);
    return mesh;
  }
  function ring(
    radius: number,
    width: number,
    z: number,
    material: THREE.Material,
    arc = Math.PI * 2,
  ) {
    const mesh = new THREE.Mesh(
      new THREE.TorusGeometry(radius, width, 12, 100, arc),
      material,
    );
    mesh.position.z = z;
    group.add(mesh);
    return mesh;
  }
  if (variant === "network" || variant === "gate") {
    for (let strand = 0; strand < 2; strand++) {
      const points = Array.from({ length: 121 }, (_, i) => {
        const t = i / 120;
        const a = t * Math.PI * 5 + strand * Math.PI;
        return new THREE.Vector3(
          Math.cos(a) * 0.78,
          (t - 0.5) * 5,
          Math.sin(a) * 0.78,
        );
      });
      tube(points, 0.12, metal, 160);
      tube(
        points.map((p) => new THREE.Vector3(p.x * 1.09, p.y, p.z * 1.09)),
        0.018,
        silver,
        160,
      );
    }
    for (let i = 0; i < 27; i++) {
      const t = i / 26,
        a = t * Math.PI * 5,
        y = (t - 0.5) * 5;
      const x = Math.cos(a) * 0.78,
        z = Math.sin(a) * 0.78;
      tube(
        [
          new THREE.Vector3(x, y, z),
          new THREE.Vector3(0, y + 0.06, 0),
          new THREE.Vector3(-x, y, -z),
        ],
        0.035,
        i % 4 === 0 ? warm : metal,
        12,
      );
      if (i % 3 === 0) {
        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.145, 12, 12),
          silver,
        );
        sphere.position.set(x, y, z);
        group.add(sphere);
      }
      // Fine structural filaments echo the reference's material detail without a particle field.
      for (let j = 0; j < 2; j++) {
        const sign = j === 0 ? 1 : -1;
        const start = new THREE.Vector3(sign * x, y, sign * z);
        const end = start.clone().multiply(new THREE.Vector3(1.45, 1, 1.45));
        end.y += Math.sin(i * 2.1) * 0.25;
        group.add(
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([start, end]),
            edge,
          ),
        );
      }
    }
    group.rotation.z = -0.58;
  } else if (variant === "ledger") {
    for (let i = 0; i < 7; i++) {
      const z = (i - 3) * 0.34;
      ring(1.35, 0.1, z, metal);
      const band = ring(1.35, 0.025, z + 0.1, warm, Math.PI * 1.25);
      band.rotation.z = i * 0.7;
      ring(0.68, 0.055, z, silver);
    }
    for (let i = 0; i < 16; i++) {
      const a = (i * Math.PI) / 8;
      const r = 1.08;
      tube(
        [
          new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, -1.2),
          new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 1.2),
        ],
        0.045,
        metal,
        8,
      );
    }
    group.rotation.y = 0.7;
    group.rotation.x = 0.25;
  } else {
    for (let i = 0; i < 5; i++) {
      const r = 0.72 + i * 0.28;
      const frame = ring(r, 0.065, 0, metal);
      frame.rotation.x = i * 0.3;
      frame.rotation.y = i * 0.2;
      const arc = ring(r, 0.02, 0, warm, Math.PI * (0.6 + i * 0.12));
      arc.rotation.copy(frame.rotation);
      arc.rotation.z = i * 0.9;
    }
    const lens = new THREE.Mesh(
      new THREE.SphereGeometry(0.58, 32, 24),
      new THREE.MeshPhysicalMaterial({
        color: 0x1a1c19,
        metalness: 1,
        roughness: 0.08,
        clearcoat: 1,
        envMapIntensity: 3,
      }),
    );
    group.add(lens);
    for (let i = 0; i < 9; i++) {
      const a = (i * Math.PI * 2) / 9;
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), warm);
      node.position.set(Math.cos(a) * 1.85, Math.sin(a) * 1.85, 0.1);
      group.add(node);
    }
  }
  // The installation surrounds the technical core with fractured, machined shells.
  // Geometry and material are original; the reference informs warm light and macro framing.
  const fragments: {
    mesh: THREE.Mesh;
    closed: THREE.Vector3;
    open: THREE.Vector3;
    angle: number;
  }[] = [];
  let shellMaterial: THREE.MeshStandardMaterial | undefined;
  let plinthMaterial: THREE.MeshStandardMaterial | undefined;
  if (installation) {
    group.scale.setScalar(0.76);
    shellMaterial = new THREE.MeshStandardMaterial({
      color: 0x6e3016,
      metalness: 0.38,
      roughness: 0.8,
    });
    // Deterministic vertex displacement creates real relief without a texture download.
    const rock = new THREE.IcosahedronGeometry(1, 3);
    const pos = rock.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i),
        y = pos.getY(i),
        z = pos.getZ(i);
      const n =
        1 +
        0.065 * Math.sin(x * 29 + y * 17) * Math.cos(z * 23 - x * 11) +
        0.025 * Math.sin(y * 71 + z * 37);
      pos.setXYZ(i, x * n, y * n, z * n);
    }
    rock.computeVertexNormals();
    for (let i = 0; i < 9; i++) {
      const a = (i * Math.PI * 2) / 9;
      const mesh = new THREE.Mesh(rock, shellMaterial);
      mesh.scale.set(0.65 + (i % 3) * 0.16, 0.85 + (i % 2) * 0.2, 0.48);
      mesh.rotation.set(i * 0.42, i * 0.7, a * 0.4);
      const closed = new THREE.Vector3(
        Math.cos(a) * 1.6,
        Math.sin(a) * 1.8,
        0.35 + Math.sin(i * 2) * 0.3,
      );
      const open = new THREE.Vector3(
        Math.cos(a) * 2.85,
        Math.sin(a) * 2.5 - 0.15,
        -0.6 + Math.sin(i) * 0.4,
      );
      mesh.position.copy(closed);
      scene.add(mesh);
      fragments.push({ mesh, closed, open, angle: mesh.rotation.z });
    }
    plinthMaterial = new THREE.MeshStandardMaterial({
      color: 0x29170d,
      metalness: 0.55,
      roughness: 0.42,
    });
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(2.5, 2.7, 0.17, 72),
      plinthMaterial,
    );
    base.position.y = -2.45;
    scene.add(base);
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(2.46, 0.015, 6, 100),
      warm,
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.y = -2.35;
    scene.add(rim);
    const grooves = new THREE.Group();
    for (let i = 0; i < 36; i++) {
      const a = (i * Math.PI * 2) / 36;
      const tick = new THREE.Mesh(
        new THREE.BoxGeometry(0.014, 0.012, i % 3 === 0 ? 0.16 : 0.08),
        silver,
      );
      tick.position.set(Math.sin(a) * 2.25, -2.35, Math.cos(a) * 2.25);
      tick.rotation.y = a;
      grooves.add(tick);
    }
    scene.add(grooves);
  }
  const baseRotation = group.rotation.clone();
  const hemisphere = new THREE.HemisphereLight(0xffe8cd, 0x11100d, 1.4);
  scene.add(hemisphere);
  const key = new THREE.DirectionalLight(0xffe5c9, 4);
  key.position.set(2, 4, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xc6d6e0, 3);
  rim.position.set(-3, 1, -2);
  scene.add(rim);
  const amber = new THREE.PointLight(color, 35);
  amber.position.set(-1, -2, 2);
  scene.add(amber);
  camera.position.set(0, 1, 8.4);
  camera.lookAt(0, 0, 0);
  let targetReveal = Number(root.dataset.reveal) || 0,
    currentReveal = targetReveal;
  let targetZoom = Number(root.dataset.zoom) || 1,
    currentZoom = targetZoom;
  let raf = 0,
    visible = true,
    disposed = false;
  let targetX = 0,
    targetY = 0;
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  let reduced = media.matches;
  const render = () => {
    raf = 0;
    if (disposed || !visible || document.hidden) return;
    group.rotation.y += (baseRotation.y + targetX - group.rotation.y) * 0.065;
    group.rotation.x += (baseRotation.x + targetY - group.rotation.x) * 0.065;
    currentZoom += (targetZoom - currentZoom) * (reduced ? 1 : 0.09);
    currentReveal += (targetReveal - currentReveal) * (reduced ? 1 : 0.065);
    const eased = currentReveal * currentReveal * (3 - 2 * currentReveal);
    for (const f of fragments) {
      f.mesh.position.lerpVectors(f.closed, f.open, eased);
      f.mesh.rotation.z = f.angle + eased * 0.45;
    }
    // Portrait stages keep the entire artifact visible; close-ups remain explicit.
    const fit = camera.aspect < 1 ? 1 / Math.max(0.58, camera.aspect) : 1;
    camera.position.z = ((installation ? 10.4 : 8.4) * fit) / currentZoom;
    camera.position.x = installation ? targetX * 0.9 : 0;
    camera.lookAt(0, installation ? -0.2 : 0, 0);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    if (
      !reduced &&
      (Math.abs(baseRotation.y + targetX - group.rotation.y) > 0.0001 ||
        Math.abs(baseRotation.x + targetY - group.rotation.x) > 0.0001 ||
        Math.abs(targetZoom - currentZoom) > 0.001 ||
        Math.abs(targetReveal - currentReveal) > 0.001)
    )
      raf = requestAnimationFrame(render);
  };
  const wake = () => {
    if (!raf && !disposed) raf = requestAnimationFrame(render);
  };
  const zoom = (event: Event) => {
    targetZoom = Math.max(
      1,
      Math.min(2, (event as CustomEvent<number>).detail),
    );
    wake();
  };
  root.addEventListener("scene-zoom", zoom);
  const reveal = (event: Event) => {
    targetReveal = Math.max(
      0,
      Math.min(1, (event as CustomEvent<number>).detail),
    );
    wake();
  };
  root.addEventListener("scene-reveal", reveal);
  const resize = () => {
    const r = root.getBoundingClientRect();
    renderer.setSize(r.width, r.height);
    camera.aspect = r.width / Math.max(1, r.height);
    camera.updateProjectionMatrix();
    wake();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(root);
  const move = (e: PointerEvent) => {
    if (reduced || e.pointerType === "touch") return;
    const r = root.getBoundingClientRect();
    targetX = ((e.clientX - r.left) / r.width - 0.5) * 0.35;
    targetY = ((e.clientY - r.top) / r.height - 0.5) * 0.12;
    wake();
  };
  const reset = () => {
    targetX = targetY = 0;
    wake();
  };
  root.addEventListener("pointermove", move);
  root.addEventListener("pointerleave", reset);
  const io = new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    if (visible) wake();
    else (cancelAnimationFrame(raf), (raf = 0));
  });
  io.observe(root);
  const preference = () => {
    reduced = media.matches;
    if (reduced) {
      targetX = targetY = 0;
      group.rotation.copy(baseRotation);
    }
    wake();
  };
  const visibility = () => {
    if (!document.hidden) wake();
  };
  media.addEventListener("change", preference);
  document.addEventListener("visibilitychange", visibility);
  const lost = (e: Event) => {
    e.preventDefault();
    canvas.style.display = "none";
    root.classList.remove("scene-ready");
    cancelAnimationFrame(raf);
    disposed = true;
  };
  canvas.addEventListener("webglcontextlost", lost);
  resize();
  onReady();
  wake();
  return () => {
    disposed = true;
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    root.removeEventListener("pointermove", move);
    root.removeEventListener("pointerleave", reset);
    media.removeEventListener("change", preference);
    document.removeEventListener("visibilitychange", visibility);
    canvas.removeEventListener("webglcontextlost", lost);
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material)
          ? obj.material
          : [obj.material];
        mats.forEach((m) => m.dispose());
      }
    });
    root.removeEventListener("scene-zoom", zoom);
    root.removeEventListener("scene-reveal", reveal);
    environment.dispose();
    warm.dispose();
    silver.dispose();
    metal.dispose();

    edge.dispose();
    shellMaterial?.dispose();
    plinthMaterial?.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  };
}
