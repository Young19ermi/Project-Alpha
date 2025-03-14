import { ReactThreeFiber } from "@react-three/fiber";
import { Canvas} from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
const Model =()=>{
    const Models = useLoader(GLTFLoader, "/scene.glb")
    useEffect(()=>
    {
           Models.scene.traverse((child)=>{
            if (child.isMesh){
                console.log(child.name)
            }
            if (child.isMesh && child.name == "T_Shirt_int_int_0"){
                // child.material.color.set("yellow")
                console.log(true)
            }
        })
    })
    return (
        <mesh>
        <primitive object = {Models.scene}/>
        </mesh>
    )
}

const Animation = ()=>{
    return(
        <Canvas>
                <Model/>
        </Canvas>
    )
}
export default Animation;


//useEffect
//useRef  <---> useFrame