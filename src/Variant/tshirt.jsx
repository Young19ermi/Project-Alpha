// import { proxy, useSnapshot } from "valtio";
// import { HexColorPicker } from "react-colorful";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { useState } from "react";
// import * as THREE from "three";
// import { Material, TextureLoader } from 'three';
// import { useRef } from "react";
// import { Environment } from "@react-three/drei";
// import { useGLTF } from "@react-three/drei";
// import { Decal, useTexture } from "@react-three/drei";
// import { RepeatWrapping } from "three";
// import Camerarig from "./camerarig";
// // State Management
// const state = proxy({
//   mainColor: "#3b2c3b",
//   sleeveColor: "#a1b3a3",
//   textureScale: 1, // Default zoom level
//   showTexture: true, // Texture visibility
//   selectedTexture: "/l.jpg", // Default texture
// });
// // UI Controls Component
// function UIControls() {
//     const [activePart, setActivePart] = useState("Main Body"); // Toggle state
//     const snap = useSnapshot(state);
//     const presetColors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];

//     // Reset zoom level
//     const resetZoom = () => {
//         state.textureScale = 1; // Reset to default zoom level
//     };

//     // Toggle texture visibility
//     const toggleTexture = () => {
//         state.showTexture = !snap.showTexture; // Toggle texture visibility
//     };

//     // Handle texture selection
//     const handleTextureChange = (e) => {
//         state.selectedTexture = e.target.value; // Update selected texture
//     };

//     return (
//         <div style={{
//             width: 200,
//             height: 500,
//             position: "absolute",
//             top: 20,
//             left: 20,
//             background: "white",
//             padding: 10,
//             borderRadius: 10,
//             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             alignItems: "center"
//         }}>
//             {/* Switch Toggle */}
//             <div style={{ display: "flex", width: "100%", justifyContent: "center", marginBottom: 1 }}>
//                 <button
//                     style={{
//                         height: 25,
//                         padding: "4px 10px",
//                         fontSize: "12px",
//                         borderRadius: "15px",
//                         background: activePart === "Main Body" ? "#000" : "#ccc",
//                         color: "#fff",
//                         cursor: "pointer",
//                         border: "none",
//                         marginRight: 5
//                     }}
//                     onClick={() => setActivePart("Main Body")}
//                 >
//                     Main Body
//                 </button>
//                 <button
//                     style={{
//                         height: 25,
//                         padding: "4px 10px",
//                         fontSize: "12px",
//                         borderRadius: "15px",
//                         background: activePart === "Sleeves" ? "#000" : "#ccc",
//                         color: "#fff",
//                         cursor: "pointer",
//                         border: "none"
//                     }}
//                     onClick={() => setActivePart("Sleeves")}
//                 >
//                     Sleeves
//                 </button>
//             </div>

//             {/* Color Buttons */}
//             <div style={{ display: "flex", gap: 6 }}>
//                 {presetColors.map((color) => (
//                     <button
//                         key={color}
//                         style={{
//                             width: 20,
//                             height: 20,
//                             borderRadius: "50%",
//                             background: color,
//                             border: "2px solid #fff",
//                             boxShadow: "0px 0px 4px rgba(0,0,0,0.2)",
//                             cursor: "pointer"
//                         }}
//                         onClick={() => {
//                             if (activePart === "Main Body") state.mainColor = color;
//                             else state.sleeveColor = color;
//                         } } />
//                 ))}
//             </div>

//             {/* Hex Color Picker */}
//             <HexColorPicker
//                 onChange={(color) => {
//                     if (activePart === "Main Body") state.mainColor = color;
//                     else state.sleeveColor = color;
//                 } }
//                 style={{ width: "100%", height: 650 }} />

//             {/* Texture Controls */}
//             <div style={{ marginTop: 10, width: "100%" }}>
//                 <label>Texture Zoom:</label>
//                 <input
//                     type="range"
//                     min="0.1"
//                     max="7"
//                     step="0.1"
//                     value={snap.textureScale}
//                     onChange={(e) => (state.textureScale = parseFloat(e.target.value))} />
//             </div>

//             <div style={{ marginTop: 10, width: "100%", height: 50 }}>
//                 <button onClick={toggleTexture}>
//                     {snap.showTexture ? 'Hide Texture' : 'Show Texture'}
//                 </button>
//             </div>

//             <div style={{ marginTop: 15, width: "100%" }}>

//             </div>
//         </div>
//     );
// }
// // // T-Shirt Model Component
// const TShirtModel = () => {
//   const Cuberef = useRef();
//   const snap = useSnapshot(state);
//   const { scene } = useGLTF("/shirt.glb");
//   const Texture = useTexture(snap.selectedTexture);
//   // Set texture wrapping and repeat
//   // Texture.wrapS = RepeatWrapping;
//   // Texture.wrapT = RepeatWrapping;
//   // Texture.anisotropy = 16; 
//   useFrame(() => {
//     if (Cuberef.current) {
//       Cuberef.current.rotation.y += Math.PI * 0.000;
//     }
//   });
//   useFrame(() => {
//     scene.traverse((child) => {
//       if (child.isMesh) {
       
//         if (child.name === "T_Shirt_male") {
//           child.material.color.set(snap.mainColor);
           
//         } else if (child.name === "T_Shirt_int_int_0") {
//           child.material.color.set(snap.sleeveColor);
//         }
//       } 
//     });
//   });
//   return (
    
//     <primitive
//       ref={Cuberef}
//       object={scene}
//       scale={5}
//       position={[0, 0, 0]}
//       castShadow
//       receiveShadow
//     >      
//       </primitive>
//   );
// };


// // Main Animation Component
// const Anim = () => {
//   return (
//     <>
//       <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
//         <OrbitControls />
//         <ambientLight intensity={3} />
//         <directionalLight
//           position={[5, 10, 5]}
//           intensity={5}
//           castShadow
//           shadow-mapSize-width={1024}
//           shadow-mapSize-height={1024}
//           shadow-bias={-0.0001}
//         />
//         {/* <Camerarig> */}
//         <TShirtModel />
//         {/* </Camerarig> */}
//         <mesh receiveShadow position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//           <boxGeometry args={[50, 50, 50]} />
//           <meshStandardMaterial color={"#888"} />
//         </mesh>
//       </Canvas>
//       <UIControls />
//     </>
//   );
// };
// export default Anim;



// // Learn How he Centers the Logo on the T-Shirt
// // Learn How he used AI to generate the Texture


const Fun = ()=>{
  return (
    console.log('DEBUGGED')
  )
}

export default Fun