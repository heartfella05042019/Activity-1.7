import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/*Canvas*/
const canvas = document.querySelector('canvas.webgl')

/*Scene*/
const scene = new THREE.Scene()

/*Geometries Section*/

//Box Geometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x7F5AF0, wireframe: true })
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
boxMesh.position.x = -2
scene.add(boxMesh)

//Sphere Geometry
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xC8E7C9, wireframe: true })
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphereMesh.position.x = 2
scene.add(sphereMesh)

//Create an empty BufferGeometry
const triangleGeometry = new THREE.BufferGeometry()

//Create a Float32Array containing vertex positions (3 values per vertex)
const positionsArray = new Float32Array([
    0, 0, 0, // First vertex
    0, 1, 0, // Second vertex
    1, 0, 0  // Third vertex
])

//Create a BufferAttribute and attach it to the geometry
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
triangleGeometry.setAttribute('position', positionsAttribute)

// Create the material
const triangleMaterial = new THREE.MeshBasicMaterial({ color: 0xE63946, wireframe: true })

// Create the mesh
const triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial)
triangleMesh.position.y = -2
scene.add(triangleMesh)

// Create an empty BufferGeometry
const randomGeometry = new THREE.BufferGeometry()
const count = 50 // Create 50 random triangles
const randomPositions = new Float32Array(count * 3 * 3) // 3 vertices * 3 coordinates

for (let i = 0; i < count * 3 * 3; i++) {
  randomPositions[i] = (Math.random() - 0.5) * 4
}

const randomAttribute = new THREE.BufferAttribute(randomPositions, 3)
randomGeometry.setAttribute('position', randomAttribute)

const randomMaterial = new THREE.MeshBasicMaterial({ color: 0xFADADD, wireframe: true })
const randomMesh = new THREE.Mesh(randomGeometry, randomMaterial)
randomMesh.position.y = 2
scene.add(randomMesh)

/*Camera*/
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 5
scene.add(camera)

/*Controls*/
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/*Renderer*/
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/*Handle window resize*/
window.addEventListener('resize', () => {
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

/*Animation Loop*/
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  //Rotate objects for visibility
  boxMesh.rotation.y = 0.2 * elapsedTime
  sphereMesh.rotation.y = 0.2 * elapsedTime
  triangleMesh.rotation.y = 0.2 * elapsedTime
  randomMesh.rotation.y = 0.2 * elapsedTime

  controls.update()
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
