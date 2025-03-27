import React from 'react'
import {useRef} from 'react'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'
const Camerarig = () => {
    const sha = useRef()
  return (
    <AccumulativeShadows 
    ref = {sha}
    temporal
    frames={60}
    opacity={0.5}
    alphaTest={0.85}
    scale={0.85}
    rotation={Math.PI/2}
    position = {[-1, 0, 0]}
    >
        <RandomizedLight
        amount = {4}
        radius = {9}
        intensity = {0.55}
        ambient = {0.25}
        position={[5,5,-10]}
        />
    </AccumulativeShadows>

      
  )
}

export default Camerarig
