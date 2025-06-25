import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import './Background.css';

const SpookyThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000");

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor("#000", 1);
    if (mountNode) {
      mountNode.innerHTML = '';
      mountNode.appendChild(renderer.domElement);
    }

    // Spooky animated spheres
    const colors = [0xff0000, 0xffa500, 0xffff00]; // red, orange, yellow
    const spheres = [];
    for (let i = 0; i < 12; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 0.25 + 0.15, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        emissive: colors[Math.floor(Math.random() * colors.length)],
        emissiveIntensity: 0.7,
        metalness: 0.2,
        roughness: 0.7,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4
      );
      scene.add(sphere);
      spheres.push(sphere);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xff0000, 1, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Animation
    let frameId;
    const animate = () => {
      spheres.forEach((sphere, i) => {
        sphere.position.x += Math.sin(Date.now() * 0.0005 + i) * 0.003;
        sphere.position.y += Math.cos(Date.now() * 0.0007 + i) * 0.003;
        sphere.rotation.x += 0.005;
        sphere.rotation.y += 0.005;
      });
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mountNode) mountNode.innerHTML = '';
    };
  }, []);

  return <div className="spooky-bg-canvas" ref={mountRef} />;
};

export default SpookyThreeBackground;
