
function createRenderer() {
	const renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0xffffff, 1);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 0.8;
	renderer.physicallyCorrectLights = true;
	renderer.outputEncoding = THREE.sRGBEncoding;
	document.body.appendChild(renderer.domElement);
	return renderer;
}

function createObject() {
	const geometry = new THREE.BoxGeometry(1, 1, 1, 3, 3, 3);
	const wireframe = new THREE.WireframeGeometry(geometry);
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, reflectivity: 0.6 });
	// const cube = new THREE.Mesh( wireframe, material );
	const cube = new THREE.LineSegments(wireframe, material);
	cube.material.depthTest = false;
	cube.material.opacity = 0.5;
	cube.material.transparent = true;

	return cube;
}

function createCamera() {
	// camera
	const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 5;

	const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3);
	ambientLight.name = 'ambient_light';
	camera.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8 * Math.PI);
	directionalLight.position.set(0.5, 0, 0.866); // ~60º
	directionalLight.name = 'main_light';
	camera.add(directionalLight);
	return camera;
}

const renderer = createRenderer();
const scene = new THREE.Scene();
const cube = createObject();
cube.rotation.x = Math.PI / 4;
cube.rotation.z = Math.PI / 4;
scene.add(cube);

const camera = createCamera();
scene.add(camera);

function animate() {
	requestAnimationFrame(animate);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);
};

animate();

