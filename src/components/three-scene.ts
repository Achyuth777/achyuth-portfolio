import * as THREE from "three";
export function mountScene(
  root: HTMLElement,
  variant: string,
  onReady: () => void,
) {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
  } catch {
    return () => {};
  }
  const canvas = renderer.domElement;
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
  const color =
    variant === "network" ? 0xb8c9a0 : variant === "risk" ? 0xaeb3ed : 0xe8ab77;
  const metal = new THREE.MeshStandardMaterial({
    color: 0x665445,
    metalness: 0.8,
    roughness: 0.35,
  });
  const light = new THREE.MeshBasicMaterial({ color });
  const edge = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.45,
  });
  function box(
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number,
    mat: THREE.Material = metal,
  ) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    group.add(m);
    return m;
  }
  if (variant === "gate" || variant === "ledger") {
    for (let i = 0; i < 5; i++) {
      const z = 2 - i * 1.1;
      box(0.15, 3.6, 0.17, -1.65, 0, z);
      box(0.15, 3.6, 0.17, 1.65, 0, z);
      box(3.8, 0.16, 0.24, 0, 1.9, z);
      box(3.5, 0.06, 0.07, 0, 1.74, z, light);
      box(3.8, 0.08, 0.45, 0, -1.8, z);
    }
    const core = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.64),
      new THREE.MeshStandardMaterial({
        color,
        metalness: 0.7,
        roughness: 0.22,
        wireframe: variant === "ledger",
      }),
    );
    core.position.y = 0.25;
    group.add(core);
  } else {
    const pts: Array<THREE.Vector3> = [];
    for (let i = 0; i < 18; i++) {
      const a = i * 2.399;
      const r = 1.5 + (i % 3) * 0.28;
      const p = new THREE.Vector3(
        Math.cos(a) * r,
        (i / 17 - 0.5) * 3.2,
        Math.sin(a) * r,
      );
      pts.push(p);
      const node = new THREE.Mesh(
        new THREE.OctahedronGeometry(i % 4 === 0 ? 0.16 : 0.075),
        light,
      );
      node.position.copy(p);
      group.add(node);
    }
    const connections = [];
    for (let i = 0; i < pts.length; i++) {
      connections.push(pts[i], pts[(i + 3) % pts.length]);
    }
    group.add(
      new THREE.LineSegments(
        new THREE.BufferGeometry().setFromPoints(connections),
        edge,
      ),
    );
  }
  const floor = new THREE.GridHelper(14, 28, 0x735440, 0x30342f);
  floor.position.y = -1.9;
  scene.add(floor);
  scene.add(new THREE.HemisphereLight(0xf4dfc6, 0x26372f, 3));
  const key = new THREE.PointLight(color, 65);
  key.position.set(2, 4, 3);
  scene.add(key);
  const rim = new THREE.PointLight(0xaabfb5, 30);
  rim.position.set(-3, 1, -2);
  scene.add(rim);
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
    group.rotation.y += (targetX - group.rotation.y) * 0.045;
    group.rotation.x += (targetY - group.rotation.x) * 0.045;
    renderer.render(scene, camera);
    if (
      !reduced &&
      (Math.abs(targetX - group.rotation.y) > 0.0001 ||
        Math.abs(targetY - group.rotation.x) > 0.0001)
    )
      raf = requestAnimationFrame(render);
  };
  const wake = () => {
    if (!raf && !disposed) raf = requestAnimationFrame(render);
  };
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
      group.rotation.set(0, 0, 0);
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
      if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material)
          ? obj.material
          : [obj.material];
        mats.forEach((m) => m.dispose());
      }
    });
    metal.dispose();
    light.dispose();
    edge.dispose();
    renderer.dispose();
    canvas.remove();
  };
}
