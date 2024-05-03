import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import FakeGlowMaterial from './FakeGlowMaterial.js'
import Stats from './Stats.js'
export const settings = {
    renderStuds:true,
    renderStudsOnLeds:false,
    renderwires:false,
    showfps:false,
    glow:true,
    glowDepthTest:true,
    glowOpacity:1,
    glowInternalRadius:6,
    glowSharpness:0,
    bg:0x000000
}
const canvas = document.getElementById('cm2render');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
); 
camera.position.z = 5;
scene.add(camera);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setClearColor(settings.bg);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.setSize(700,700);

const textureLoader = new THREE.TextureLoader();
const loader = new FontLoader();
const studtexture = textureLoader.load('stud2.jpg');
const geometry = new THREE.BoxGeometry();
const controls = new OrbitControls( camera, renderer.domElement );
function normRGB(r, g, b) {
    return new THREE.Color(r / 255, g / 255, b / 255);
}
const not = {
    id: 0,
    color: normRGB(255, 9, 0),
};
const and = {
    id: 1,
    color: normRGB(0, 121, 255),
};
const or = {
    id: 2,
    color: normRGB(0, 241, 29),
};
const xor = {
    id: 3,
    color: normRGB(168, 0, 255),
};
const input = {
    id: 4,
    color: normRGB(255, 127, 0),
};
const tflipflop = {
    id: 5,
    color: normRGB(30, 30, 30),
};
const led = {
    id: 6,
    color: normRGB(175, 175, 175),
};
const sound = {
    id: 7,
    color: normRGB(175, 131, 76),
};
const buildinput = {
    id: 8,
    color: normRGB(73, 185, 255),
};
const conductor = {
    id: 9,
    color: normRGB(255, 72, 72),
};
const nand = {
    id: 10,
    color: normRGB(0, 42, 89),
};
const xnor = {
    id: 11,
    color: normRGB(213, 0, 103),
};
const random = {
    id: 12,
    color: normRGB(84, 54, 35),
};
const letter = {
    id: 13,
    color: normRGB(25, 71, 84),
};
const tile = {
    id: 14,
    color: normRGB(75, 75, 75),
};
const node = {
    id: 15,
    color: normRGB(150, 150, 150)
};
const delay = {
    id: 16,
    color: normRGB(165, 177, 200)
};
const Antenna = {
    id: 17,
    color: normRGB(98, 24, 148)
};
const condv2 = {
    id: 18,
    color: normRGB(235, 233, 183)
};


const posdata = [];
const wirestorender = [];

export const blockids = [not,and,or,xor,input,tflipflop,led,sound,buildinput,conductor,nand,xnor,random,letter,tile,node,delay,Antenna,condv2];
export const blocks = {not:not,and:and,or:or,xor:xor,input:input,inp:input,tflipflop:tflipflop,toggle:tflipflop,t:tflipflop,flipflop:tflipflop,led:led,light:led,sound:sound,buildinput:buildinput,build:buildinput,conductor:conductor,con:conductor,cond:conductor,nand:nand,xnor:xnor,rand:random,random:random,letter:letter,char:letter,character:letter,tile:tile,node:node,timer:delay,Antenna:Antenna,antenna:Antenna,antennae:Antenna,condv2:condv2}
export function newgate(type,pos,special,on) {
    if(special.includes('+')){
        special=formatfunc(special)
    }
    let newmaterial; 
    let studtext;
    let studledtext;
    if(settings.renderStuds){
        studtext=studtexture
    }
    if(settings.renderStudsOnLeds){
        studledtext=studtexture
    }
    if(!type){
        return
    }
    if (type.id === 6) {
      newmaterial = new THREE.MeshBasicMaterial({
        color: special||new THREE.Color(normRGB(175, 175, 175)),
        transparent: true,
        opacity: 0.8,
        map:  studledtext,
      });
    } else if (type.id==14) {
        newmaterial = new THREE.MeshBasicMaterial({
            color: special||new THREE.Color(normRGB(75, 75, 75)),
            map:  studtext,
          });
    } else {
      newmaterial = new THREE.MeshBasicMaterial({ map:  studtext, color: type.color });
    }
    if ((on==false)) {
        const darkeningColor = new THREE.Color(normRGB(-25,-25,-25));         
        newmaterial.color.add(darkeningColor);
    } else {
        if(settings.glow){
            const geometry = new THREE.SphereGeometry();
            const FakeGlowMat = new FakeGlowMaterial({glowSharpness:settings.glowSharpness,glowColor:newmaterial.color, opacity:settings.glowOpacity, depthTest:settings.glowDepthTest, glowInternalRadius:settings.glowInternalRadius});
            const Sphere = new THREE.Mesh(geometry, FakeGlowMat);
            Sphere.position.copy(pos)
            scene.add(Sphere);
        }
        newmaterial.map=undefined;
    }
    const newcube = new THREE.Mesh(geometry, newmaterial);
    newcube.position.copy(pos);
    newcube.frustumCulled = true;
    scene.add(newcube);
    posdata.push([parseInt(pos.x), parseInt(pos.y), parseInt(pos.z)]);
    if(type.id==13){
        let loadedFont;
        let text;
        if(!special){
            text = 'A';

        } else {
            text = String.fromCharCode(parseInt(special));
        }
        loader.load('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json', function (font) {
            loadedFont = font;
            var textGeometry = new TextGeometry(text, {
                font: loadedFont,
                size: 0.8,
                height: 0,
            });
            var textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            var textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.rotation.x = -Math.PI / 2;
            textMesh.position.y = 0.51;
            textMesh.position.x = -0.37;
            textMesh.position.z = 0.4;
            newcube.add(textMesh);
        });
    }
}   
function formatfunc(string) {
    const splittedstring = string.split('+');
    const r = parseFloat(splittedstring[0]);
    const g = parseFloat(splittedstring[1]);
    const b = parseFloat(splittedstring[2]);
  
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      return new THREE.Color(normRGB(r, g, b));
    } else {
      return new THREE.Color(normRGB(75, 75, 75));
    }
}
function arraytov3(array){
    return new THREE.Vector3(array[0],array[1],array[2])
}
export function loadstring(string) {
    const blockstring = string.split('?')[0];
    const blocks = blockstring.split(';');
    const wiresstring = string.split('?')[1];
    const wires = wiresstring.split(';');
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const params = block.split(',');
        const gateType = blockids[params[0]];
        const position = new THREE.Vector3(params[2],params[3],params[4])
        newgate(gateType, position,params[5],params[1])
    }
    if(settings.renderwires){
        for (let i = 0; i < wires.length; i++) {    
            const wirestring = wires[i];
            const i1 = wirestring.split(',')[0];
            const i2 = wirestring.split(',')[1];
            const p1 = posdata[i1 - 1];
            const p2 = posdata[i2 - 1];
            if(p1&&p2){
            const path = new THREE.LineCurve3(arraytov3(p1), arraytov3(p2));
            
            const tubeGeometry = new THREE.TubeGeometry(path, 20, 0.45,4, true);
            const material = new THREE.MeshBasicMaterial({ color: 0x111111, });
            const tubeMesh = new THREE.Mesh(tubeGeometry, material);
            tubeMesh.frustumCulled = true;
            scene.add(tubeMesh);
        }
        }
    }
}
export function reset(){
    renderer.clear();
    while (scene.children.length > 0) {
        const child = scene.children[0];
        scene.remove(child);
    }
    animate()
}
export function refresh(){
    renderer.clear();
    renderer.setClearColor(settings.bg);
    renderer.render(scene, camera); 
}
export function setbgclear(){
    renderer.alpha = true;
    renderer.render(scene, camera);
}
const stats = new Stats();
stats.showPanel(0);
if(settings.showfps){
    document.body.appendChild(stats.dom);
} else {
    
}
export function newpos(x,y,z){
    return new THREE.Vector3(x,y,z);
}
export function newcol(r,g,b){
    return new normRGB(r, g, b)
}
function animate() {
    requestAnimationFrame(animate);
    controls.update();

    if (settings.showfps) {
        stats.update();
    }

    renderer.render(scene, camera);
}

animate();
export function setSize(h,w){
    renderer.setSize(h,w);
}