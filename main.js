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
const planetMaterial = new MeshBasicMaterial( {color: 0xffff00 }); 
const planet = new Mesh(planetGeometry, planetMaterial);
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
    case 'KeyW': controls.moveForward = true; console.log('ArrowUp');break;

    case 'ArrowDown':
    case 'KeyS': controls.moveBackward = true; break;

    case 'ArrowLeft':
    case 'KeyA': controls.moveLeft = true; break;

    case 'ArrowRight':
    case 'KeyD': controls.moveRight = true; break;

  }
});

window.addEventListener('keyup', (event) => {
  switch (event.code) {

    case 'ArrowUp':
    case 'KeyW': controls.moveForward = false; break;

    case 'ArrowDown':
    case 'KeyS': controls.moveBackward = false; break;

    case 'ArrowLeft':
    case 'KeyA': controls.moveLeft = false; break;

    case 'ArrowRight':
    case 'KeyD': controls.moveRight = false; break;

  }
});