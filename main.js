import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  MeshNormalMaterial,
  BoxGeometry,
  SphereGeometry,
  MeshBasicMaterial
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth /  window.innerHeight, 1, 1000);
camera.position.z = 5;

const renderer = new WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const starshipGeometry = new BoxGeometry(1, 1, 1);
const starshipMaterial = new MeshNormalMaterial();
const starship = new Mesh(starshipGeometry, starshipMaterial);
scene.add(starship);

const planetGeometry = new SphereGeometry(1, 32, 16); 
const planetMaterial = new MeshNormalMaterial(); 
const planet = new Mesh(planetGeometry, planetMaterial);
planet.position.x = 3;
planet.position.y = 3;
planet.position.z = -2;
scene.add(planet);

function animate() {
	requestAnimationFrame(animate);
  controls.update();
	renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('keydown', (event) => {
  switch (event.code) {

    case 'ArrowUp':
    case 'KeyW': {
      starship.position.z -= 1;
      console.log('FORWARD');
      break;
    }

    case 'ArrowDown':
    case 'KeyS': {
      starship.position.z += 1;
      console.log('BACKWARD');
      break;
    }

    case 'ArrowLeft':
    case 'KeyA': {
      starship.position.x -= 1;
      console.log('LEFT');
      break;
    }

    case 'ArrowRight':
    case 'KeyD': {
      starship.position.x += 1;
      console.log('RIGHT');
      break;
    }

  }
});