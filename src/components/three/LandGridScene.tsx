"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type PointerRef = RefObject<{ x: number; y: number }>;

type LandGridSceneProps = {
  /** Lower on mobile to keep the frame budget cheap. */
  segments: number;
  particleCount: number;
  pointerRef: PointerRef;
};

/**
 * A slowly-breathing wireframe "land grid" with a drifting field of gold
 * particles above it — an abstract nod to subdivided plots and the
 * "network of trusted connections" the brand is built on, without
 * literally rendering a map. Deliberately unlit/basic materials only:
 * no lights, no shadows, minimal draw calls.
 */
export default function LandGridScene({
  segments,
  particleCount,
  pointerRef,
}: LandGridSceneProps) {
  const groundGeometry = useMemo(() => {
    // Small footprint, kept well back from the camera — this is meant to
    // read as a faint texture near the base of the frame, not a
    // screen-filling landscape.
    return new THREE.PlaneGeometry(14, 9, segments, segments);
  }, [segments]);

  const particleGeometry = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = Math.random() * 1.8 + 0.1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [particleCount]);

  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Breathing ground displacement — kept gentle (small amplitude)
    const pos = groundGeometry.attributes.position;
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(i, Math.sin(x * 0.5 + t * 0.5) * 0.14 + Math.cos(y * 0.5 + t * 0.35) * 0.14);
    }
    pos.needsUpdate = true;

    // Slow independent particle drift
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.012;
    }

    // Gentle camera parallax toward the pointer position — small range so
    // the whole scene never swings far enough to feel busy.
    const pointer = pointerRef.current;
    const { camera } = state;
    const targetX = pointer.x * 0.6;
    const targetY = 3.4 - pointer.y * 0.25;
    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.y += (targetY - camera.position.y) * 0.03;
    camera.lookAt(0, -0.6, -4);

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={groundGeometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, -6]}>
        <meshBasicMaterial color="#d9bd7d" wireframe transparent opacity={0.22} />
      </mesh>
      <points ref={pointsRef} geometry={particleGeometry}>
        <pointsMaterial color="#f4ecd6" size={0.035} sizeAttenuation transparent opacity={0.55} />
      </points>
    </group>
  );
}
