
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
	},
	CylinderGeometry: {
		clazz: THREE.CylinderGeometry,
		params: [
			{ key: "radiusTop", value: 1, min: 0.1 },
			{ key: "radiusBottom", value: 1, min: 0.1 },
			{ key: "height", value: 1, min: 0.1 },
			{ key: "radialSegments", value: 8, min: 3, step: 1 },
			{ key: "heightSegments", value: 1, min: 1, step: 1 },
			{ key: "openEnded", value: false },
			{ key: "thetaStart", value: 0, min: 0 },
			{ key: "thetaLength", value: 2 * Math.PI, min: 0 }
		],
	},
	DodecahedronGeometry: {
		clazz: THREE.DodecahedronGeometry,
		params: [
			{ key: "radius", value: 1, min: 0.1 },
			{ key: "detail", value: 0, min: 0, step: 1 }
		]
	},
	IcosahedronGeometry: {
		clazz: THREE.IcosahedronGeometry,
		params: [
			{ key: "radius", value: 1, min: 0.1 },
			{ key: "detail", value: 0, min: 0, step: 1 },
		]
	},
	OctahedronGeometry: {
		clazz: THREE.OctahedronGeometry,
		params: [
			{ key: "radius", value: 1, min: 0.1 },
			{ key: "detail", value: 0, min: 0, step: 1 },
		]
	},
	PlaneGeometry: {
		clazz: THREE.PlaneGeometry,
		params: [
			{ key: "width", value: 1, min: 0.1 },
			{ key: "height", value: 1, min: 0.1 },
			{ key: "widthSegments", value: 1, min: 1, step: 1 },
			{ key: "heightSegments", value: 1, min: 1, step: 1 },
		]
	},
	RingGeometry: {
		clazz: THREE.RingGeometry,
		params: [
			{ key: "innerRadius", value: 0.5, min: 0.1 },
			{ key: "outerRadius", value: 1, min: 0.1 },
			{ key: "thetaSegments", value: 8, min: 3, step: 1 },
			{ key: "phiSegments", value: 8, min: 1, step: 1 },
			{ key: "thetaStart", value: 0, min: 0 },
			{ key: "thetaLength", value: 2 * Math.PI, min: 0 },
		]
	},
	SphereGeometry: {
		clazz: THREE.SphereGeometry,
		params: [
			{ key: "radius", value: 1, min: 0.1 },
			{ key: "widthSegments", value: 8, min: 3, step: 1 },
			{ key: "heightSegments", value: 6, min: 2, step: 1 },
			{ key: "phiStart", value: 0 },
			{ key: "phiLength", value: 2 * Math.PI },
			{ key: "thetaStart", value: 0 },
			{ key: "thetaLength", value: Math.PI },
		]
	},
	TetrahedronGeometry: {
		clazz: THREE.TetrahedronGeometry,
		params: [
			{ key: "radius", value: 1, min: 0.1 },
			{ key: "detail", value: 0, min: 0, step: 1 },
		]
	},
	TorusGeometry: {
		clazz: THREE.TorusGeometry,
		params: [
			{ key: "radius", value: 1, min: 0.01 },
			{ key: "tube", value: 0.4, min: 0.01, step: 0.01 },
			{ key: "radialSegments", value: 8, min: 1, step: 1 },
			{ key: "tubularSegments", value: 6, min: 1, step: 1 },
			{ key: "arc", value: 2 * Math.PI },
		]
	},
	TorusKnotGeometry: {
		clazz: THREE.TorusKnotGeometry,
		params: [
			{ key: "radius", value: 1, min: 0.01 },
			{ key: "tube", value: 0.4, min: 0.01, step: 0.01 },
			{ key: "tubularSegments", value: 64, min: 1, step: 1 },
			{ key: "radialSegments", value: 8, min: 1, step: 1 },
			{ key: "p", value: 2, min: 1, step: 1 },
			{ key: "q", value: 3, min: 1, step: 1 },
		]
	}
}

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

function createControls(camera, renderer) {
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.minDistance = 4;
	controls.maxDistance = 18;
	controls.enableZoom = false;
	controls.enablePan = false;
	controls.target.set(0, 0, - 0.2);
	controls.update();
	return controls;
}

function initStats(type) {
	const panelType = (typeof type !== 'undefined' && type) && !isNaN(type) ? parseInt(type) : 0;
	const stats = new Stats();

	stats.showPanel(panelType);
	document.body.appendChild(stats.dom);
	return stats;
}

function createObject(GeometryClass, generalConfig, ...args) {
	const geometry = new GeometryClass(...args);
	if (generalConfig.enableWireframe) {
		const material = new THREE.MeshBasicMaterial({
			color: generalConfig.material,
			wireframe: true,
			reflectivity: 0.6,
			depthTest: false,
			opacity: 0.5,
		});
		const object = new THREE.Mesh(geometry, material);
		return object;
	} else {
		const color = parseInt((generalConfig.material || '#ff0000').replace('#', '0x'), 16);
		const material = new THREE.MeshBasicMaterial({
			color
		});
		const object = new THREE.Mesh(geometry, material);
		return object;
	}
}

class RenderManager {
	constructor() {
		this.renderer = createRenderer();
		this.camera = createCamera();
		this.controls = createControls(this.camera, this.renderer);
		this.stats = initStats();
		this.render = () => {};

		this.generalConfig = {
			type: "BoxGeometry",
			enableWireframe: true,
			material: "#000000"
		}
		const generalCfgUI = new dat.GUI();
		const typeController = generalCfgUI.add(this.generalConfig, "type", Object.keys(Geometries));
		typeController.onChange(this.onGeometryChange.bind(this));
		const generalControllers = [
			generalCfgUI.add(this.generalConfig, "enableWireframe"),
			generalCfgUI.addColor(this.generalConfig, "material")
		];
		generalControllers.forEach(con => {
			con.onChange(() => this.render());
		});
		this.generalControllers = generalControllers;
		this.generalCfgUI = generalCfgUI;

		window.addEventListener("resize", this.onResize.bind(this)); 
	}

	onGeometryChange(type) {
		const geometry = Geometries[type];
		if (geometry) {
			this.rebuild(geometry);
		}
	}

	buildRender(cfg, geometryCfg) {
		const renderer = this.renderer;
		const camera = this.camera;
		const render = () => {
			this.stats.update();
	
			const scene = new THREE.Scene();
			const args = geometryCfg.params.map(({ key }) => cfg[key]);
			const cube = createObject(geometryCfg.clazz, this.generalConfig, ...args);
			// cube.rotation.x = Math.PI / 4;
			// cube.rotation.z = Math.PI / 4;
			scene.add(cube);
			scene.add(camera);
			renderer.render(scene, camera);
		}

		this.controls.removeEventListener('change', this.render);
		return render;
	}

	rebuild(geometryCfg) {
		const props = geometryCfg.params.reduce((init, { key, value }) => (init[key] = value, init), {});
		const render = this.buildRender(props, geometryCfg);

		if (this.propsGui) {
			(this.propsControllers || []).forEach(con => this.propsGui.remove(con));
		} else {
			this.propsGui = new dat.GUI();
		}

		this.propsControllers = null;
		this.propsControllers = geometryCfg.params.map((item) => {
			const gui = this.propsGui;

			let controller;
			if ('status' in item) {
				controller = gui.add(props, item.key, item.status);
			} else if ('items' in item) {
				controller = gui.add(props, item.key, item.items);
			} else if ('color' in item) {
				controller = gui.addColor(props, item.key);
			} else {
				const { min, max, step } = item;
				controller = gui.add(props, item.key, min, max, typeof step == 'number' ? step : 0.001);
			}
			controller.onChange(render);
			return controller;
		});

		render();
		this.render = render;
		this.controls.addEventListener('change', this.render);
	}

	onResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.render();
	}
}


const renderManager = new RenderManager();
renderManager.rebuild(Geometries["BoxGeometry"]);
