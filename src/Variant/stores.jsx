import { useFrame } from '@react-three/fiber';
import { use } from 'react';
import {proxy} from 'valtio';

const State = proxy({
    logoDecal: true,
    fullDecal: true,
    textureOn:true,
    texture: "/l.jpg",
    textureScale: 1,
})

export default State;

