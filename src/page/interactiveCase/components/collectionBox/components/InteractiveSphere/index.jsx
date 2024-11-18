import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const InteractiveSphere = () => {
  const mountRef = useRef(null); // 用于保存 canvas 的引用
  const rendererRef = useRef(null); // 用于保存 renderer 的引用

  useEffect(() => {
    // 初始化场景、相机和渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);

    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer; // 保存 renderer 引用

    // 半透明球体
    const sphereGeometry = new THREE.SphereGeometry(4.85, 16, 16);
    const sphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x000000) },
        opacity: { value: 0.8 },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float opacity;
        varying vec3 vNormal;
        void main() {
            float alpha = opacity * smoothstep(0.5, 1.0, vNormal.z);
            gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.FrontSide,
      depthWrite: false,
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // 小球体
    const smallBallGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const smallBalls = [];
    const radius = 5;
    const numPoints = 88;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    // 添加小球体
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / goldenRatio;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const smallBallMaterial = new THREE.MeshBasicMaterial({
        color: getRandomBrightColor(),
        depthWrite: true,
        depthTest: true,
        side: THREE.FrontSide,
      });
      const smallBall = new THREE.Mesh(smallBallGeometry, smallBallMaterial);
      smallBall.position.set(x * radius, y * radius, z * radius);
      sphere.add(smallBall);
      smallBalls.push(smallBall);
    }

    // 创建灯光
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const autoRotationSpeed = 0.0005;
    let currentAngularVelocity = new THREE.Vector3(0, 1, 0).normalize().multiplyScalar(autoRotationSpeed);

    // 渲染循环
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.quaternion.multiplyQuaternions(
        new THREE.Quaternion().setFromEuler(new THREE.Euler(currentAngularVelocity.x, currentAngularVelocity.y, currentAngularVelocity.z)),
        sphere.quaternion
      );
      renderer.render(scene, camera);
    };
    animate();

    // 处理窗口调整
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      const renderer = rendererRef.current; // 从引用中获取 renderer
      if (renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      // 清除事件监听器
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement); // 移除渲染器
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

// 辅助函数：获取随机颜色
function getRandomBrightColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 40 + 10);
  const lightness = Math.floor(Math.random() * 40 + 40);
  const rgb = hslToRgb(hue, saturation, lightness);
  return (rgb.r << 16) | (rgb.g << 8) | rgb.b;
}

// HSL 转 RGB
function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r, g, b;
  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

export default InteractiveSphere;
