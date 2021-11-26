import * as THREE from "three";
import { Color, Mesh, MeshStandardMaterial } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { RoughnessMipmapper } from "three/examples/jsm/utils/RoughnessMipmapper";
import "./style.css";
import lizardPath from "./lizard2.glb?url";
import venicePath from "./venice_sunset_1k.hdr?url";
import { clamp } from "three/src/math/MathUtils";

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;

var vec = new THREE.Vector3(); // create once and reuse

class Mouse {
  pos = new THREE.Vector3(); // create once and reuse
  constructor() {
    window.addEventListener("mousemove", (event) => {
      vec.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      );

      vec.unproject(camera);

      vec.sub(camera.position).normalize();

      var distance = -camera.position.z / vec.z;

      this.pos.copy(camera.position).add(vec.multiplyScalar(distance));
    });
    window.addEventListener("touchmove", (event) => {
      vec.set(
        (event.touches[0].clientX / window.innerWidth) * 2 - 1,
        -(event.touches[0].clientY / window.innerHeight) * 2 + 1,
        0.5
      );

      vec.unproject(camera);

      vec.sub(camera.position).normalize();

      var distance = -camera.position.z / vec.z;

      this.pos.copy(camera.position).add(vec.multiplyScalar(distance));
    });
  }
}

const mouse = new Mouse();

function update() {
  if (mouse) {
    const center = camera.position.length();
    const maybeNeck = scene.getObjectByName("Neck");
    if (maybeNeck) {
      maybeNeck.rotation.z = clamp(
        -(((mouse.pos.x * Math.PI) / window.innerWidth) * 1024) / 2 / center,
        -Math.PI,
        0
      );
      maybeNeck.rotation.x = clamp(
        -(((mouse.pos.y * Math.PI) / window.innerWidth) * 1024) / 2 / center +
          Math.PI / 4,
        -Math.PI / 2,
        Math.PI / 2
      );
    }
    scene.getObjectByName("Head")?.lookAt(mouse.pos);
  }

  render();

  requestAnimationFrame(update);
}

function init() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.25,
    20
  );
  camera.position.set(-1.8, 0.6, 2.7);

  scene = new THREE.Scene();

  new RGBELoader().load(venicePath, function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = new Color(0, 0.5, 1);
    scene.environment = texture;

    render();

    // model

    // use of RoughnessMipmapper is optional
    const roughnessMipmapper = new RoughnessMipmapper(renderer);

    const loader = new GLTFLoader();
    loader.load(lizardPath, function (gltf) {
      gltf.scene.traverse(function (child) {
        if ((child as Mesh).isMesh) {
          roughnessMipmapper.generateMipmaps(
            (child as Mesh).material as MeshStandardMaterial
          );
        }
      });
      gltf.scene.scale.set(0.2, 0.2, 0.2);
      scene.add(gltf.scene);

      roughnessMipmapper.dispose();

      render();
    });
  });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render); // use if there is no animation loop
  controls.minDistance = 2;
  controls.maxDistance = 10;
  controls.target.set(0, 0, -0.2);
  controls.update();

  window.addEventListener("resize", onWindowResize);

  update();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

//

function render() {
  renderer.render(scene, camera);
}

init();
render();
