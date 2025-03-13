// import { useGLTF } from "@react-three/drei";
// import { MeshStandardMaterial } from "three";

// export default function TShirt({ color }) {
//     const { scene } = useGLTF("/tshirt.glb"); // ✅ Correct file path & property

//     return (
//         <primitive object={scene} scale={2} />
//     );
// }

import { useGLTF } from "@react-three/drei";

export default function TShirt({ color }) {
    const { scene } = useGLTF("./tshirt.glb"); // ✅ Corrected the path & property

    // ✅ Apply the color to the model's material
    scene.traverse((child) => {
        if (child.isMesh) {
            child.material.color.set(color);
        }
    });

    return <primitive object={scene}  />;
}

// Recap ==> useGLTF() --> scale --. primittive object --> attach & color