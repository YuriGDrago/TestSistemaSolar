import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Scene
const scene = new THREE.Scene()

const material = new THREE.MeshBasicMaterial({ color: 0xff0000})
// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
    material
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.1,100)
// camera.position.x = 2
// camera.position.y = 2
// camera.position.z = 2
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(- 1*aspectRatio, 1*aspectRatio, 1, - 1, 2, 100)
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)

controls.enableDamping = true

let darkMode = true

window.addEventListener('keypress',(event)=>{
    if(event.code == 'KeyR'){
        camera.position.set(0,0,2)
        controls.target.set(0,0,0)
    }

    if (event.code == 'KeyO'){
        (darkMode) ? 
            renderer.setClearColor( 0xffffff, 1): 
            renderer.setClearColor( 0x000000, 1)
        darkMode = !darkMode
    }
})

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
		// Update camera
    camera.aspect = sizes.width / sizes.height
		camera.updateProjectionMatrix()
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () =>
{
    if(!document.fullscreenElement)
    {
        canvas.requestFullscreen()
    }
    else
    {
        document.exitFullscreen()
    }
})




const tick = () =>
{
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()