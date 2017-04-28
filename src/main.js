import { load } from "Injector";
import * as THREE from "three";
import Square from "./geometry/Square";
import {Context} from "modulin-di";

let scene, camera, renderer;
let geometry, material, mesh;

init();
animate();

function init() {

  scene = new THREE.Scene();

  const width = window.innerWidth;
  const height = window.innerHeight;
  camera = new THREE.OrthographicCamera( -width, width, -height, height, 1, 100000 );
  camera.position.z = 1;

  geometry = new Square(200, 200);
  material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

}

function animate() {

  requestAnimationFrame( animate );

  mesh.rotation.z += 0.01;

  renderer.render( scene, camera );

}