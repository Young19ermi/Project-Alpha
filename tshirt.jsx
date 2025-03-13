// // import { useSnapshot } from "valtio";
// // import State from "./stores";
// // import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// // import { useLoader } from "@react-three/fiber";
// // import { Canvas } from "@react-three/fiber";
// // import { AmbientLight } from "three";
// // import { OrbitControls } from "@react-three/drei";
// // const Animation = ({color})=> {
// //     const Model = useLoader(GLTFLoader, "/scene.glb")
// //     const cong = useSnapshot(State)
// //     console.log(Model.nodes)
// //     return(
// //         <primitive object = {Model.scene} scale = {1.9} />
// //     )
// // }

// // const Anim = ()=>{
// //     return(
// //         <Canvas camera={[1,25,5]}>
// //             {/* <perspectiveCamera makeDefault position={[0,2,6]}/> */}
// //             <OrbitControls/>
// //             <directionalLight position={[1,1,5]}/>
// //             <ambientLight intensity = {0.5}/>
// //             <Animation color = "red"/>
// //         </Canvas>
// //     )

// // }

// // export default Anim;
// // import { proxy, useSnapshot } from "valtio";
// // import { HexColorPicker } from "react-colorful";
// // import { Canvas, useLoader } from "@react-three/fiber";
// // import { OrbitControls } from "@react-three/drei";
// // import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// // // 🟢 State with Valtio
// // const state = proxy({
// //     mainColor: "#ff0000",
// //     sleeveColor: "#0000ff",
// // });

// // const Animation = () => {
// //     const Model = useLoader(GLTFLoader, "/scene.glb");
// //     const snap = useSnapshot(state);

// //     console.log(Model.nodes)

// //     return (
// //         <group  position={[0, -1, 0]}>
// //             {Model.nodes?.T_Shirt_exterieur_ext_0 && (
// //                 <mesh geometry={Model.nodes.T_Shirt_exterieur_ext_0.geometry} scale = {0.5}>
// //                     <meshStandardMaterial color={snap.mainColor} />
// //                 </mesh>
// //             )}
// //             {Model.nodes?.T_Shirt_int_int_0 && (
// //                 <mesh geometry={Model.nodes.T_Shirt_int_int_0.geometry} scale = {10}>
// //                     <meshStandardMaterial color={snap.sleeveColor} />
// //                 </mesh>
// //             )}
// //         </group>
// //     );
// // };

// // const UIControls = () => {
// //     return (
// //         <div style={{ width: 200, height:15, position: "absolute", top: 20, center: 20, background: "white", padding: 10, borderRadius: 8 }}>
// //             <label>Main Body:</label>
// //             <HexColorPicker color={state.mainColor} onChange={(color) => (state.mainColor = color)} />

// //             <label>Sleeves:</label>
// //             <HexColorPicker color={state.sleeveColor} onChange={(color) => (state.sleeveColor = color)} />
// //         </div>
// //     );
// // };

// // const Anim = () => {
// //     return (
// //         <>
// //             <Canvas >
// //                 <OrbitControls />
// //                 <ambientLight intensity={0.5} />
// //                 <directionalLight position = {[1,1,1]}/>
// //                 <Animation />
// //             </Canvas>
// //             <UIControls />
// //         </>
// //     );
// // };

// // export default Anim;

// import { proxy, useSnapshot } from "valtio";
// import { HexColorPicker } from "react-colorful";
// import { Canvas, useLoader } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


// const state = proxy({
//     mainColor: "#ff0000",
//     sleeveColor: "#0000ff",
// });

// const Animation = () => {
//     const Model = useLoader(GLTFLoader, "/scene.glb");
//     const snap = useSnapshot(state);

//     console.log(Model.nodes);

//     return (
//         <group scale={0.05} >
//             {Model.nodes?.T_Shirt_exterieur_ext_0 && (
//                 <mesh geometry={Model.nodes.T_Shirt_exterieur_ext_0.geometry}>
//                     <meshStandardMaterial color={snap.mainColor} />
//                 </mesh>
//             )}
//             {Model.nodes?.T_Shirt_int_int_0 && (
//                 <mesh geometry={Model.nodes.T_Shirt_int_int_0.geometry}>
//                     <meshStandardMaterial color={snap.sleeveColor} />
//                 </mesh>
//             )}
//         </group>
//     );
// };
//new code
import { proxy, useSnapshot } from "valtio";
import { HexColorPicker } from "react-colorful";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useState } from "react";
import * as THREE from "three";

import { useGLTF } from "@react-three/drei";
const state = proxy({
    mainColor: "red",
    sleeveColor: "#0000ff",
});

const UIControls = () => {
    const [activePart, setActivePart] = useState("Main Body"); // Toggle state
    const snap = useSnapshot(state);
    const presetColors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];

    return (
        <div style={{
            width: 200,
            height: 200, 
            position: "absolute",
            top: 20,
            left: 20,
            background: "white",
            padding: 10,
            borderRadius: 10,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            {/* Switch Toggle */}
            <div style={{ display: "flex", width: "100%", justifyContent: "center", marginBottom: 10 }}>
                <button
                    style={{
                        height:25,
                        padding: "4px 10px",
                        fontSize: "12px",
                        borderRadius: "15px",
                        background: activePart === "Main Body" ? "#000" : "#ccc",
                        color: "#fff",
                        cursor: "pointer",
                        border: "none",
                        marginRight: 5
                    }}
                    onClick={() => setActivePart("Main Body")}
                >
                    Main Body
                </button>
                <button
                    style={{
                        height:25,
                        padding: "4px 10px",
                        fontSize: "12px",
                        borderRadius: "15px",
                        background: activePart === "Sleeves" ? "#000" : "#ccc",
                        color: "#fff",
                        cursor: "pointer",
                        border: "none"
                    }}
                    onClick={() => setActivePart("Sleeves")}
                >
                    Sleeves
                </button>
            </div>

            {/* Color Buttons */}
            <div style={{ display: "flex", gap: 6,marginBottom: 8 }}>
                {presetColors.map((color) => (
                    <button
                        key={color}
                        style={{
                            
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background: color,
                            border: "2px solid #fff",
                            boxShadow: "0px 0px 4px rgba(0,0,0,0.2)",
                            cursor: "pointer"
                        }}
                        onClick={() => {
                            if (activePart === "Main Body") state.mainColor = color;
                            else state.sleeveColor = color;
                        }}
                    />
                ))}
            </div>

            {/* Hex Color Picker */}
            <HexColorPicker
                onChange={(color) => {

                    if (activePart === "Main Body") state.mainColor = color;
                    else state.sleeveColor = color;
                }}
                style={{ width: "100%", height: 650 }}
            />
        </div>
    );
};



const TShirtModel = () => {
    const snap = useSnapshot(state);

    const { scene } = useGLTF("/scene.glb");

    useFrame(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                if (child.name === "T_Shirt_exterieur_ext_0") {
                    child.material.color.set(snap.mainColor);  
                } else if (child.name === "T_Shirt_int_int_0") {
                    child.material.color.set(snap.sleeveColor);               }
            }
        });
    });

    return <primitive object={scene} scale = {5}/>;
};

const Anim = () => {
    return (
        <>
            <Canvas>
                <OrbitControls />
                <ambientLight intensity={5} />
                <directionalLight position={[5, 5, 5]} />
                <TShirtModel />
            </Canvas>
            <UIControls />
        </>
    );
};

export default Anim;