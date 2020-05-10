
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

function createCamera() {
	const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 5;
	return camera;
}

function createObject(GeometryClass, ...args) {
	const geometry = new GeometryClass(...args);
	const wireframe = new THREE.WireframeGeometry(geometry);
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, reflectivity: 0.6 });
	const cube = new THREE.LineSegments(wireframe, material);
	cube.material.depthTest = false;
	cube.material.opacity = 1;

	return cube;
}

function createRender(renderer, cfg, geometryCfg) {
	const camera = createCamera();
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.addEventListener('change', render);
	controls.minDistance = 4;
	controls.maxDistance = 18;
	controls.enableZoom = false;
	controls.enablePan = false;
	controls.target.set(0, 0, - 0.2);
	controls.update();

	function render() {
		const scene = new THREE.Scene();
		const args = geometryCfg.params.map(({ key }) => cfg[key]);
		const cube = createObject(geometryCfg.clazz, ...args);
		// cube.rotation.x = Math.PI / 4;
		// cube.rotation.z = Math.PI / 4;
		scene.add(cube);
		scene.add(camera);
		renderer.render(scene, camera);
	}
	return render;
}

class RenderManager {
	constructor(geometryCfg) {
		this.renderer = createRenderer();

		if (geometryCfg) {
			this.invoke(geometryCfg);
		}
	}

	invoke(geometryCfg) {
		const cfg = geometryCfg.params.reduce((init, { key, value }) => (init[key] = value, init), {});
		const render = createRender(this.renderer, cfg, geometryCfg);

		if (this.gui) {
			(this.controllers || []).forEach(con => this.gui.remove(con));
			this.gui.destroy();
		}
		const gui = new dat.GUI();
		this.gui = gui;
		this.controllers = geometryCfg.params.map((item) => {
			let controller;
			if ('status' in item) {
				controller = gui.add(cfg, item.key, item.status);
			} else if ('items' in item) {
				controller = gui.add(cfg, item.key, item.items);
			} else if ('color' in item) {
				controller = gui.addColor(cfg, item.key);
			} else {
				const { min, max, step } = item;
				controller = gui.add(cfg, item.key, min, max, typeof step == 'number' ? step : 0.001);
			}
			controller.onChange(() => {
				render();
			});
			return controller;
		});
	
		render();
	}
}


const Geometries = {
	BoxGeometry: {
		clazz: THREE.BoxGeometry,
		params: [
			{ key: "width", value: 1, min: 1, step: 1 },
			{ key: "height", value: 1, min: 1, step: 1 },
			{ key: "depth", value: 1, min: 1, step: 1 },
			{ key: "widthSegments", value: 1, min: 1, step: 1 },
			{ key: "heightSegments", value: 1, min: 1, step: 1 },
			{ key: "depthSegments", value: 1, min: 1, step: 1 },
		]
	},
	CircleGeometry: {
		clazz: THREE.CircleGeometry,
		params: [
			{ key: "radius", value: 1, min: 0.1 },
			{ key: "segments", value: 8, min: 3, step: 1 },
			{ key: "thetaStart", value: 0, min: 0 },
			{ key: "thetaLength", value: 2 * Math.PI, min: 0 }
		]
	},
	ConeGeometry: {
		clazz: THREE.ConeGeometry,
		params: [
			{ key: "radius", value: 1, min: 0.1 },
			{ key: "height", value: 1, min: 0.1 },
			{ key: "radialSegments", value: 8, min: 3, step: 1 },
			{ key: "heightSegments", value: 1, min: 1, step: 1 },
			{ key: "openEnded", value: false },
			{ key: "thetaStart", value: 0, min: 0 },
			{ key: "thetaLength", value: 2 * Math.PI, min: 0 }
		],
	}
}

function createSelect() {
	const geometryCfg = Object.keys(Geometries);
	const selectElement = document.createElement('select');
	geometryCfg.forEach((option, index) => {
		const optionElement = document.createElement('option');
		optionElement.value = option;
		optionElement.innerText = option;
		if (index === 0) {
			optionElement.selected = true;
		}
		selectElement.appendChild(optionElement);
	});

	selectElement.addEventListener("change", onGeometryChange);

	const renderManager = new RenderManager();
	function onGeometryChange (event) {
		const geometry = Geometries[event.target.value];
		if (geometry) {
			renderManager.invoke(geometry);
		}
	}

	const wrapper = document.getElementById("options-wrapper");
	wrapper.appendChild(selectElement);
	renderManager.invoke(Geometries["BoxGeometry"]);
}

createSelect();
