"use client";

import { useEffect, useRef } from "react";
import type * as THREE from "three";

/**
 * Slowly rotating 3D satellite-servicing concept: a servicer CubeSat whose
 * two-link manipulator reaches toward a grapple fixture on a client satellite.
 * Three.js is loaded on demand, rendering pauses off-screen / in hidden tabs,
 * and everything is disposed on unmount.
 */
export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    import("three").then((T) => {
      const THREE: typeof import("three") = T;
      if (disposed || !mountRef.current) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      mount.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.style.display = "block";

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0.2, 1.2, 9.6);
      camera.lookAt(-0.1, -0.25, 0);

      // ---------- Lights ----------
      scene.add(new THREE.AmbientLight(0x9fb4d6, 0.9));
      const key = new THREE.DirectionalLight(0xffffff, 2.2);
      key.position.set(4, 5, 6);
      scene.add(key);
      const rim = new THREE.PointLight(0x22d3ee, 18, 20);
      rim.position.set(-4, 1, -3);
      scene.add(rim);
      const fill = new THREE.PointLight(0x3b82f6, 10, 20);
      fill.position.set(3, -3, 2);
      scene.add(fill);

      // ---------- Shared materials ----------
      const geometries: THREE.BufferGeometry[] = [];
      const materials: THREE.Material[] = [];
      const track = <T extends THREE.BufferGeometry>(g: T) => (geometries.push(g), g);
      const trackM = <T extends THREE.Material>(m: T) => (materials.push(m), m);

      const busMat = trackM(new THREE.MeshStandardMaterial({ color: 0x34496d, metalness: 0.55, roughness: 0.42 }));
      const foilMat = trackM(new THREE.MeshStandardMaterial({ color: 0x9aa7bb, metalness: 0.9, roughness: 0.3 }));
      const panelMat = trackM(
        new THREE.MeshStandardMaterial({
          color: 0x0e2556,
          metalness: 0.5,
          roughness: 0.25,
          emissive: 0x0b1d48,
          emissiveIntensity: 0.6,
        }),
      );
      const armMat = trackM(new THREE.MeshStandardMaterial({ color: 0xdfe6f0, metalness: 0.55, roughness: 0.35 }));
      const jointMat = trackM(
        new THREE.MeshStandardMaterial({ color: 0x22d3ee, emissive: 0x22d3ee, emissiveIntensity: 0.6, roughness: 0.4 }),
      );
      const edgeMat = trackM(new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.85 }));
      const gridMat = trackM(new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.45 }));

      const withEdges = (mesh: THREE.Mesh, mat: THREE.LineBasicMaterial = edgeMat) => {
        const edges = new THREE.LineSegments(track(new THREE.EdgesGeometry(mesh.geometry)), mat);
        mesh.add(edges);
        return mesh;
      };

      const world = new THREE.Group();
      scene.add(world);

      // ---------- Client satellite ----------
      const client = new THREE.Group();
      client.position.set(0.55, 0.2, 0);
      world.add(client);

      const bus = withEdges(new THREE.Mesh(track(new THREE.BoxGeometry(1.3, 1.3, 1.5)), busMat));
      client.add(bus);

      const makePanel = (side: 1 | -1) => {
        const g = new THREE.Group();
        const strut = new THREE.Mesh(track(new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8)), foilMat);
        strut.rotation.z = Math.PI / 2;
        strut.position.x = side * 0.9;
        g.add(strut);
        const panel = withEdges(new THREE.Mesh(track(new THREE.BoxGeometry(1.6, 0.04, 0.95)), panelMat));
        panel.position.x = side * 1.95;
        g.add(panel);
        const pts: THREE.Vector3[] = [];
        for (let i = 1; i < 4; i++) {
          const x = side * (1.15 + i * 0.4);
          pts.push(new THREE.Vector3(x, 0.025, -0.475), new THREE.Vector3(x, 0.025, 0.475));
        }
        pts.push(new THREE.Vector3(side * 1.15, 0.025, 0), new THREE.Vector3(side * 2.75, 0.025, 0));
        g.add(new THREE.LineSegments(track(new THREE.BufferGeometry().setFromPoints(pts)), gridMat));
        return g;
      };
      client.add(makePanel(1));
      // Only one wing on the servicer-facing side keeps the arm's approach clear.
      const dish = new THREE.Mesh(
        track(new THREE.SphereGeometry(0.42, 24, 12, 0, Math.PI * 2, 0, Math.PI / 3.2)),
        foilMat,
      );
      dish.rotation.x = Math.PI;
      dish.position.set(0, 1.05, 0);
      client.add(dish);
      const mast = new THREE.Mesh(track(new THREE.CylinderGeometry(0.025, 0.025, 0.4, 8)), foilMat);
      mast.position.set(0, 0.8, 0);
      client.add(mast);

      // Grapple fixture on the -X face
      const fixture = new THREE.Mesh(track(new THREE.CylinderGeometry(0.11, 0.14, 0.18, 16)), jointMat);
      fixture.rotation.z = Math.PI / 2;
      fixture.position.set(-0.74, -0.1, 0.25);
      client.add(fixture);

      // ---------- Servicer CubeSat ----------
      const servicer = new THREE.Group();
      servicer.position.set(-2.5, -1.3, 0.9);
      world.add(servicer);
      const sBody = withEdges(new THREE.Mesh(track(new THREE.BoxGeometry(0.7, 0.7, 1.0)), busMat));
      servicer.add(sBody);
      for (const side of [-1, 1] as const) {
        const p = withEdges(new THREE.Mesh(track(new THREE.BoxGeometry(0.03, 0.66, 0.96)), panelMat));
        p.position.set(side * 0.9, 0, 0);
        p.rotation.z = side * 0.35;
        servicer.add(p);
      }

      // Arm: shoulder → elbow → wrist, solved each frame with 2-link IK
      const L1 = 1.35;
      const L2 = 1.35;
      const shoulderLocal = new THREE.Vector3(0.1, 0.38, 0);
      const linkGeom = track(new THREE.CylinderGeometry(0.075, 0.075, 1, 16));
      const link1 = new THREE.Mesh(linkGeom, armMat);
      const link2 = new THREE.Mesh(linkGeom, armMat);
      const jointGeom = track(new THREE.SphereGeometry(0.13, 20, 14));
      const shoulder = new THREE.Mesh(jointGeom, jointMat);
      const elbow = new THREE.Mesh(jointGeom, jointMat);
      const wrist = new THREE.Mesh(jointGeom, jointMat);
      const gripper = new THREE.Group();
      const jawGeom = track(new THREE.BoxGeometry(0.05, 0.05, 0.26));
      for (const s of [-1, 1]) {
        const jaw = new THREE.Mesh(jawGeom, armMat);
        jaw.position.set(s * 0.08, 0, 0.13);
        jaw.rotation.y = s * -0.25;
        gripper.add(jaw);
      }
      world.add(link1, link2, shoulder, elbow, wrist, gripper);

      const up = new THREE.Vector3(0, 1, 0);
      const tmp = new THREE.Vector3();
      const placeLink = (mesh: THREE.Mesh, a: THREE.Vector3, b: THREE.Vector3) => {
        tmp.subVectors(b, a);
        const len = tmp.length();
        mesh.position.copy(a).addScaledVector(tmp, 0.5);
        mesh.scale.set(1, len, 1);
        mesh.quaternion.setFromUnitVectors(up, tmp.normalize());
      };

      const fixtureWorld = new THREE.Vector3();
      const base = new THREE.Vector3();
      const target = new THREE.Vector3();
      const elbowPos = new THREE.Vector3();
      const dir = new THREE.Vector3();
      const perp = new THREE.Vector3();
      const zAxis = new THREE.Vector3(0, 0, 1);

      const solveArm = (t: number) => {
        base.copy(shoulderLocal).add(servicer.position);
        client.updateMatrix();
        fixtureWorld.copy(fixture.position).applyMatrix4(client.matrix);
        // Approach and retreat along the line to the fixture.
        const approach = 0.35 + 0.3 * (0.5 + 0.5 * Math.sin(t * 0.45));
        target.copy(fixtureWorld).addScaledVector(dir.subVectors(base, fixtureWorld).normalize(), approach);

        const d = Math.min(base.distanceTo(target), L1 + L2 - 0.001);
        dir.subVectors(target, base).normalize();
        const a = (L1 * L1 - L2 * L2 + d * d) / (2 * d);
        const h = Math.sqrt(Math.max(L1 * L1 - a * a, 0));
        perp.crossVectors(dir, zAxis).normalize();
        if (perp.y < 0) perp.negate(); // elbow up
        elbowPos.copy(base).addScaledVector(dir, a).addScaledVector(perp, h);
        target.copy(base).addScaledVector(dir, d);

        shoulder.position.copy(base);
        elbow.position.copy(elbowPos);
        wrist.position.copy(target);
        placeLink(link1, base, elbowPos);
        placeLink(link2, elbowPos, target);
        gripper.position.copy(target);
        gripper.lookAt(fixtureWorld);
      };

      // ---------- Orbit ring + stars ----------
      const ringGeom = track(new THREE.RingGeometry(3.9, 3.915, 160));
      const ringMat = trackM(
        new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.25, side: THREE.DoubleSide }),
      );
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 2.3;
      ring.position.y = -0.3;
      scene.add(ring);

      const starCount = 500;
      const starPos = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        const r = 18 + Math.random() * 20;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        starPos.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), -Math.abs(r * Math.cos(ph))], i * 3);
      }
      const starGeom = track(new THREE.BufferGeometry());
      starGeom.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
      const starMat = trackM(
        new THREE.PointsMaterial({ color: 0xf5f7fa, size: 0.06, transparent: true, opacity: 0.7, sizeAttenuation: true }),
      );
      scene.add(new THREE.Points(starGeom, starMat));

      // ---------- Sizing ----------
      const resize = () => {
        const { clientWidth: w, clientHeight: h } = mount;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(mount);

      // ---------- Pointer parallax ----------
      const pointer = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      // ---------- Loop (paused when hidden) ----------
      let visible = true;
      const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
      io.observe(mount);

      const clock = new THREE.Clock();
      let raf = 0;
      let first = true;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible || document.hidden) {
          clock.getDelta();
          return;
        }
        const t = clock.getElapsedTime();
        world.rotation.y = -0.35 + Math.sin(t * 0.08) * 0.5 + pointer.x * 0.12;
        world.rotation.x = 0.08 + pointer.y * 0.05;
        world.position.y = Math.sin(t * 0.5) * 0.06;
        client.rotation.y = Math.sin(t * 0.2) * 0.05;
        ring.rotation.z = t * 0.02;
        solveArm(t);
        renderer.render(scene, camera);
        if (first) {
          first = false;
          onReady?.();
        }
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onPointer);
        geometries.forEach((g) => g.dispose());
        materials.forEach((m) => m.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [onReady]);

  return <div ref={mountRef} className="absolute inset-0" />;
}
