import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Criar a cena
const scene = new THREE.Scene();

// Criar a câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Criar o renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adicionar controles do mouse para manipulação da câmera
const controls = new OrbitControls(camera, renderer.domElement);

// Adicionar redimensionamento da tela e suporte a tela cheia
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'f') {
    toggleFullScreen();
  }
});

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// Adicionar iluminação ambiente
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
ambientLight.intensity = 5.5;
scene.add(ambientLight);

// Adicionar luzes pontuais
const light1 = new THREE.PointLight(0xff0000, 1, 10);
light1.position.set(0, 0, 0);
scene.add(light1);

const light2 = new THREE.PointLight(0x00ff00, 1, 10);
light2.position.set(0, 0, 0);
scene.add(light2);

const light3 = new THREE.PointLight(0x0000ff, 1, 10);
light3.position.set(0, 0, 0);
light1.intensity = 4.0;
light2.intensity = 3.5;
light3.intensity = 4.8;
scene.add(light1);
scene.add(light2);
scene.add(light3);

// Configurar o plano de fundo como uma cor sólida
scene.background = new THREE.Color(0x0000ff);

// Carregar texturas
const textureLoader = new THREE.TextureLoader();
const texture1 = textureLoader.load('textures/texture1.jpg');
const texture2 = textureLoader.load('textures/texture2.jpg');
const texture3 = textureLoader.load('textures/texture3.jpg');

// Criar geometrias
const geometry1 = new THREE.BoxGeometry();
const geometry2 = new THREE.SphereGeometry();
const geometry3 = new THREE.ConeGeometry();

// Criar materiais com as texturas
const material1 = new THREE.MeshPhongMaterial({ map: texture1 });
const material2 = new THREE.MeshPhongMaterial({ map: texture2 });
const material3 = new THREE.MeshPhongMaterial({ map: texture3 });

// Criar objetos com as geometrias e materiais
const object1 = new THREE.Mesh(geometry1, material1);
scene.add(object1);

const object2 = new THREE.Mesh(geometry2, material2);
scene.add(object2);

const object3 = new THREE.Mesh(geometry3, material3);
scene.add(object3);

const object4 = new THREE.Mesh(geometry1, material1);
scene.add(object4);

const object5 = new THREE.Mesh(geometry2, material2);
scene.add(object5);

const object6 = new THREE.Mesh(geometry3, material3);
scene.add(object6);

const object7 = new THREE.Mesh(geometry1, material1);
scene.add(object7);

const object8 = new THREE.Mesh(geometry2, material2);
scene.add(object8);

const object9 = new THREE.Mesh(geometry3, material3);
scene.add(object9);

const object10 = new THREE.Mesh(geometry1, material1);
scene.add(object10);

const objects = [object1, object2, object3, object4, object5, object6, object7, object8, object9, object10];

// Definir o raio da órbita
const orbitRadius = 4;

// Configurar animação
function animate() {
  requestAnimationFrame(animate);

  // Atualizar a posição dos objetos
  const time = Date.now() * 0.001; // Tempo em segundos
  const orbitSpeed = 0.5; // Velocidade da órbita
  const angleIncrement = (Math.PI * 2) / objects.length; // Incremento do ângulo para cada objeto

  for (let i = 0; i < objects.length; i++) {
    const object = objects[i];
    const angle = time * orbitSpeed + i * angleIncrement; // Ângulo atual da órbita

    // Calcular a posição do objeto na órbita circular
    const x = Math.cos(angle) * orbitRadius;
    const z = Math.sin(angle) * orbitRadius;

    object.position.set(x, 0, z);
    object.rotation.y += 0.01; // Rotação do objeto em torno de seu próprio eixo
  }

  renderer.render(scene, camera);
}

animate();
