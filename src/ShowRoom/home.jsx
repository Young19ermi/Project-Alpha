// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { useRef } from "react";
// const Cubefunction = ({position,arg,color})=> {
//   const meshref = useRef();
//   useFrame(()=>{
//     meshref.current.rotation.x += 0.01;
//     meshref.current.rotation.y += 0.01;
//   })  
//   return (
//     <mesh position={position} ref = {meshref}> // Is the Building Blocks which is Geometry And Material
//           <boxGeometry arg = {arg}/>
//           <meshStandardMaterial color={color}/>      
//         </mesh>
//   )
// }

// const animation = ()=> {
 

//   return (
//   <Canvas>
//     <ambientLight intensity={6}/> // Without Light The Color and Everything will not be Visible
//     <directionalLight position={[2,1,3]}/>
    
//     { <group position={ [0,0,0]}> // To Control Over The Objects Inside the Entire Group
//     <Cubefunction position = {[0,-2,0]} arg = {[1,1,1]} color = {"yellow"}/>
//     <Cubefunction position = {[0,2,0]} arg = {[1,1,1]} color = {"blue"}/>
//     <Cubefunction position = {[-2,0,0]} arg = {[1,1,1]} color = {"green"}/>
//     <Cubefunction position = {[2,0,0]} arg = {[1,1,1]} color = {"red"}/>
//     </group> }

//     <mesh>
//       <boxGeometry args={[1,1,1]}/>
//       <meshStandardMaterial color={"orange"}/>
//     </mesh>
  
//   </Canvas>
//   )
// }

// // export default animation
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { useRef } from "react";

// const Config = ({position,size,color})=>{
//     const meshref = useRef();
 
//     useFrame((state, delta) => {
//       meshref.current.rotation.z += 0.02
//       meshref.current.rotation.x += 0.02
//       meshref.current.rotation.y += 0.03

//       meshref.current.position.z += 0.01
//     });
//     return (
//     <mesh position={position} ref = {meshref}>
//       <boxGeometry arg = {size}/>
//       <meshStandardMaterial color={color}/>
//     </mesh>
//     )
// }

// const cube = ()=>{
//   return (
//     <Canvas>
//       <ambientLight intensity={2}/>
//       <mesh>
//         <Config position = {[0,0,1]} size = {[0.5,0.5,0.5]} color = "orange"/>
//       </mesh>
//     </Canvas>
//   )
// }

// export default cube;

// import { useRef, useState } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { AmbientLight, BoxGeometry, DirectionalLight, OctahedronGeometry, SphereGeometry, TetrahedronGeometry, WireframeGeometry } from 'three'

// function Box() {
//   const meshRef = useRef()
//   const [hovered, setHovered] = useState(false)
//   const [clicked, setClicked] = useState(false)
//   const [scale, setScale] = useState(1)

//   useFrame((state, delta) => {
//     const highspeed = hovered ? 0.09 : 0.02
//     // Rotation (only Y-axis)
//     if (!clicked) {
//       meshRef.current.rotation.x += 0.01
//       meshRef.current.rotation.y += 0.01
//       meshRef.current.rotation.z += 0.01
//     }
//     if (hovered){
//       meshRef.current.rotation.z += highspeed - 0.08
//     }
//     if (clicked){
//         setScale((1 + state.clock.elapsedTime * 0.5))
//     }
//   })

//   return (
//     <mesh
//       ref={meshRef}
//       scale={scale}
//       onClick={() => setClicked(!clicked)}
//       onPointerOver={() => setHovered(true)}
//       onPointerOut={() => setHovered(false)}
//     >
//       <sphereGeometry />
//       {/* <boxGeometry args = {[1,1,1]}/> */}
//       <meshStandardMaterial color={hovered ? 'blue' : 'lightgreen'} wireframe/>
//     </mesh>
//   )
// }

// export default function App() {
//   return (
//     <Canvas antiAlias : false >
//       <ambientLight intensity = {1}/>
//       {/* <directionalLight position = {[1,1,1]} /> */}
//       <Box />
//     </Canvas>
//   )
// }



import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react';



const Config= ({position, size,color})=> {

  const meshref = useRef();
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)


  useFrame ( (state, delta)=> {
    if (meshref.current && !clicked){
      meshref.current.rotation.z += 0.1
    }
    if (hovered){
      meshref.current.rotation.z += 1
    }
  })
  return (
    <mesh 
    position = {position} 
    ref = {meshref}
    onClick={()=>{clicked? setClicked(false) :  setClicked(true)}}
    onPointerOver = {()=> {hovered ? setHovered(false): setHovered(true)}}
    onContextMenu={(e)=>{e.preventDefault()}}>
      <sphereGeometry  args = {size}/>
      <meshStandardMaterial color = {color} wireframe = {true}/>
    </mesh>
  )
}
const Animation = ()=> {
  return(

  <Canvas>
    <ambientLight intensity={5}/>
    <Config position = {[1,0,-1]} size = {[1,16,16]} color = {"green"}/>
  </Canvas> 
 )
}

export default Animation;


