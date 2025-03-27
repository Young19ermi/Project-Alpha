
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useEffect } from 'react';
import { Material, TextureLoader} from 'three';
import {useControls, Leva} from 'leva';
import { OrbitControls } from "@react-three/drei";
import { Decal, useTexture } from "@react-three/drei";
const Model = ({color})=>{
    const Obj = useLoader(GLTFLoader, "/scene.glb")
    const Materials = useLoader(TextureLoader,"/Glogo.png")
    const {innercolor, outercolor} = useControls({
        innercolor: {value: "#ffffff"},
        outercolor: {value: "#ffff00"}
    });
     useEffect(()=>{
        Obj.scene.traverse((child)=>{
            if (child.isMesh){
                console.log(child.name)
            }
            if (child.isMesh && child.name == "T_Shirt_int_int_0"){
                console.log(child.name)
                child.material.color.set(innercolor)
            }
            if (child.isMesh && child.name == "T_Shirt_exterieur_ext_0"){
                console.log(child.name)
                child.material.color.set(outercolor)
                child.material.map = Materials;
                child.material.needsUpdate = false;
                // child.material.map = Materials
                // child.material.needsUpdate = false
            }
        },[Obj,color])
    })
    return(
      
      <mesh>

        <primitive object = {Obj.scene}/>
        {/* <Decal
        position={[0, 1, 0]} // Adjust position on the T-shirt
        rotation={[0, 0, 0]}
        scale={0.5}
        map={Materials}
      /> */}
      </mesh>
      )
}

const Animation = ()=> {
    
    return(
        <>
        <Leva
         collapsed={true} 
         hidden={false} 
         theme={{
           sizes: { controlWidth: "100px", controlHeight: "25px",titleBarHeight: "50px" }, // Adjust width
           colors: { background: "#1e1e1e", text: "#fff", highlight1: "#f0b400" }, // Custom theme
         }}
        />
        
        <Canvas>
           <OrbitControls />
            <ambientLight intensity={1}/>
            
            <perspectiveCamera focus={56} position={[1,1,6]}/>
            <directionalLight position={[10,10,10]} intensity={1}/>
            <Model color = "red"/>
        </Canvas>

        </>
    )
}
export default Animation


// //Task For Tommorow
// //--> Color the Whole Mesh
// //--> Color the Specific Mesh
// //-->Log the Mesh Names
// //-->Add Images and Logo's
// //-->Add Textures(Optional)