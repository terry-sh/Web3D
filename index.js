// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor( 0x000000, 1 );

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.8;
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild( renderer.domElement );

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );

// scene
const fov = 0.8 * 180 / Math.PI;
const el = renderer.domElement;
const defaultCamera = new THREE.PerspectiveCamera( fov, el.clientWidth / el.clientHeight, 0.01, 1000 );
scene.add(defaultCamera);

// loader
const loader = new THREE.GLTFLoader();
loader.load(
	// resource URL
	'./object.gltf',
	// called when the resource is loaded
	function ( gltf ) {
		init(gltf);
	},

	// called while loading is progressing
	function ( xhr ) {
		// console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened', error.message );
	}
);


function init(gltf) {
	const object = gltf.scene || gltf.scenes[0];
	scene.add(object);

	// gltf.animations; // Array<THREE.AnimationClip>
	// gltf.scene; // THREE.Group
	// gltf.scenes; // Array<THREE.Group>
	// gltf.cameras; // Array<THREE.Camera>
	// gltf.asset; // Object

	console.log(gltf);

	const box = new THREE.Box3().setFromObject(object);
	const size = box.getSize(new THREE.Vector3()).length();
	const center = box.getCenter(new THREE.Vector3());
	object.position.x += (object.position.x - center.x);
	object.position.y += (object.position.y - center.y);
	object.position.z += (object.position.z - center.z);

		defaultCamera.near = size / 100;
	defaultCamera.far = size * 100;
	defaultCamera.updateProjectionMatrix();
	const camera = defaultCamera;// gltf.camera || gltf.cameras[0];

	function render() {
		renderer.render(scene, camera);
	}
	object.traverse((node) => {
	  if (node.isLight) {
	    // this.state.addLights = false;
	  } else if (node.isMesh) {
	    // TODO(https://github.com/mrdoob/three.js/pull/18235): Clean up.
	    node.material.depthWrite = !node.material.transparent;
	  }
	});

	const cube = object.children[0];
	cube.rotation.x += 0.8;
	cube.rotation.y += 0.8;

	const light1  = new THREE.AmbientLight(0xFFFFFF, 0.3);
	light1.name = 'ambient_light';
	camera.add( light1 );

	const light2  = new THREE.DirectionalLight(0xFFFFFF, 0.8 * Math.PI);
	light2.position.set(0.5, 0, 0.866); // ~60º
	light2.name = 'main_light';
	camera.add( light2 );

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render ); // use if there is no animation loop
	controls.minDistance = 2;
	controls.maxDistance = 10;
	controls.target.set( 0, 0, - 0.2 );
	controls.update();

	window.addEventListener( 'resize', onWindowResize, false );
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );
		render();
	}

	/*
	const animate = function () {
		requestAnimationFrame( animate );

		cube.rotation.x += 0.005;
		cube.rotation.y += 0.005;

		render();
	};
	animate();
	*/
	render();
}

