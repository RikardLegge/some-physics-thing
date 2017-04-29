import * as THREE from "three";
import Square from "./geometry/Square";
import {Engine, Render, Bodies, World} from "./Matter";

let scene, camera, renderer;
let material;
let engine, bodies = [];

init();
renderDebug();

function addRectangle(x,y,w,h,{physics={}}={}) {
  const geometry = new Square(w, h);

  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  const body = Bodies.rectangle(x, y, w, h, physics);
  World.add(engine.world, [body]);

  bodies.push({mesh, body})
}

function init() {

  scene = new THREE.Scene();

  const width = window.innerWidth/4;
  const height = window.innerHeight/4;
  camera = new THREE.OrthographicCamera( -width, width, -height, height, 1, 100000 );
  camera.position.z = 1;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

  engine = Engine.create();

  addRectangle(0,0,100,100);
  addRectangle(0,100,200,20, {physics:{ isStatic: true }});

  Engine.run(engine);
}

function renderDebug() {
  const width = window.innerWidth/4;
  const height = window.innerHeight/4;

  const render = Render.create({
    element: document.body,
    engine: engine,
    bounds: {
      min: {
        x: -width,
        y: -height
      },
      max: {
        x: width,
        y: height
      }
    },
    options: {
      enabled: true,
      wireframes: true,
      showSleeping: true,
      showDebug: true,
      showBroadphase: true,
      showBounds: true,
      showVelocity: true,
      showCollisions: true,
      showSeparations: true,
      showAxes: true,
      showPositions: true,
      showAngleIndicator: true
    }
  });
  
  Render.run(render);
}

function render() {
  document.body.appendChild( renderer.domElement );

  function animationFrame() {
    requestAnimationFrame( animationFrame );

    for (let i = 0; i < bodies.length; i++) {
      const {body, mesh} = bodies[i];
      const {x, y} = body.position;
      const r = body.angle;
      mesh.position.set(x, y, 0);
      mesh.rotation.z = r;
    }

    renderer.render( scene, camera );
  }

  animationFrame();
}