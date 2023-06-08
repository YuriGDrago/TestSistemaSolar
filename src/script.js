import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.module.js';

let scene, camera, renderer;
let controls;
const objects = [];

init();
animate();

function init() {
  // Cria a cena
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000); // Define a cor de fundo da cena

  // Cria a câmera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 30;

  // Cria o renderizador
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Cria os controles de órbita
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Habilita o modo de tela cheia
  const fullScreenButton = document.createElement('button');
  fullScreenButton.innerHTML = 'Tela Cheia';
  fullScreenButton.addEventListener('click', () => {
    if (document.body.requestFullscreen) {
      document.body.requestFullscreen();
    } else if (document.body.mozRequestFullScreen) {
      document.body.mozRequestFullScreen();
    } else if (document.body.webkitRequestFullscreen) {
      document.body.webkitRequestFullscreen();
    } else if (document.body.msRequestFullscreen) {
      document.body.msRequestFullscreen();
    }
  });
  document.body.appendChild(fullScreenButton);

  // Cria o sol
  const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);
  objects.push(sun);

  // Cria uma luz pontual (Sol)
  const sunLight = new THREE.PointLight(0xffffff, 1);
  sunLight.position.set(0, 0, 0);
  scene.add(sunLight);

  // Cria os planetas
  const planetGeometry = new THREE.SphereGeometry(2, 32, 32);

  // Importando as texturas existentes na biblioteca Three.js
  const textureLoader = new THREE.TextureLoader();
  const mercuryTexture = textureLoader.load('textures/planets/mercury.jpg');
  const venusTexture = textureLoader.load('textures/planets/venus.jpg');
  const earthTexture = textureLoader.load('textures/planets/earth.jpg');
  const marsTexture = textureLoader.load('textures/planets/mars.jpg');
  const jupiterTexture = textureLoader.load('textures/planets/jupiter.jpg');
  const saturnTexture = textureLoader.load('textures/planets/saturn.jpg');
  const uranusTexture = textureLoader.load('textures/planets/uranus.jpg');
  const neptuneTexture = textureLoader.load('textures/planets/neptune.jpg');

  // ...

  // Criando os materiais com as texturas
  const mercuryMaterial = new THREE.MeshBasicMaterial({ map: mercuryTexture });
  const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
  const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
  const marsMaterial = new THREE.MeshBasicMaterial({ map: marsTexture });
  const jupiterMaterial = new THREE.MeshBasicMaterial({ map: jupiterTexture });
  const saturnMaterial = new THREE.MeshBasicMaterial({ map: saturnTexture });
  const uranusMaterial = new THREE.MeshBasicMaterial({ map: uranusTexture });
  const neptuneMaterial = new THREE.MeshBasicMaterial({ map: neptuneTexture });

  // ...

  // Criando as malhas dos planetas com os materiais
  const mercury = new THREE.Mesh(planetGeometry, mercuryMaterial);
  mercury.position.x = 12;
  scene.add(mercury);
  objects.push(mercury);

  const venus = new THREE.Mesh(planetGeometry, venusMaterial);
  venus.position.x = 16;
  scene.add(venus);
  objects.push(venus);

  const earth = new THREE.Mesh(planetGeometry, earthMaterial);
  earth.position.x = 20;
  scene.add(earth);
  objects.push(earth);

  const mars = new THREE.Mesh(planetGeometry, marsMaterial);
  mars.position.x = 24;
  scene.add(mars);
  objects.push(mars);

  const jupiter = new THREE.Mesh(planetGeometry, jupiterMaterial);
  jupiter.position.x = 30;
  scene.add(jupiter);
  objects.push(jupiter);

  const saturn = new THREE.Mesh(planetGeometry, saturnMaterial);
  saturn.position.x = 36;
  scene.add(saturn);
  objects.push(saturn);

  const uranus = new THREE.Mesh(planetGeometry, uranusMaterial);
  uranus.position.x = 42;
  scene.add(uranus);
  objects.push(uranus);

  const neptune = new THREE.Mesh(planetGeometry, neptuneMaterial);
  neptune.position.x = 48;
  scene.add(neptune);
  objects.push(neptune);

  // ...

  function animate() {
    requestAnimationFrame(animate);

    // Faz os planetas orbitarem
    objects.forEach(function (planet) {
      planet.position.x -= 0.05;
      if (planet.position.x < -50) {
        planet.position.x = 50;
      }
    });

    // Atualiza os controles
    controls.update();

    // Renderiza a cena
    renderer.render(scene, camera);
  }
}

init();
