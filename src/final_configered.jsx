import React, {
  useRef,
  useState,
  useEffect,
  Suspense
} from 'react'
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader } from 'three'
import { OrbitControls } from '@react-three/drei'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'
import { fabric } from 'fabric'
import * as THREE from 'three'

export default function MultiTextureExportable() {
  const canvasRef = useRef(null)
  const fabricCanvasRef = useRef(null)
  const [hasImage, setHasImage] = useState(false)
  const sceneRef = useRef()

  // init Fabric.js at high‑res
  useEffect(() => {
    const cEl = canvasRef.current
    cEl.width = 1024
    cEl.height = 1024

    const c = new fabric.Canvas(cEl, {
      backgroundColor: '#ffffff',
      selection: true,
      enableRetinaScaling: true
    })
    fabricCanvasRef.current = c

    const rerender = () => c.renderAll()
    c.on('object:modified', rerender)
    c.on('object:moving',   rerender)
    c.on('object:scaling',  rerender)
    c.on('object:rotating', rerender)

    return () => c.dispose()
  }, [])

  // upload image
  const handleAddImage = (e) => {
    if (!e.target.files?.[0] || !fabricCanvasRef.current || hasImage) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      fabric.Image.fromURL(ev.target.result, (img) => {
        img.set({
          left: 512,
          top: 512,
          scaleX: 0.5,
          scaleY: 0.5,
          selectable: true,
          hasControls: true,
          lockUniScaling: false,
          cornerStyle: 'circle',
          cornerColor: '#4f46e5',
          borderColor: '#4f46e5',
          transparentCorners: false
        })
        const c = fabricCanvasRef.current
        c.add(img)
        c.centerObject(img)
        c.setActiveObject(img)
        c.renderAll()
        setHasImage(true)
      })
    }
    reader.readAsDataURL(e.target.files[0])
  }

  // remove image
  const removeImage = () => {
    const c = fabricCanvasRef.current
    if (!c) return
    c.getObjects().forEach((o) => {
      if (o.type === 'image') c.remove(o)
    })
    c.renderAll()
    setHasImage(false)
  }

  // save texture PNG
  const handleSaveTexture = () => {
    const dataURL = canvasRef.current.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = dataURL
    link.download = 'shirt-texture.png'
    link.click()
  }

  // export GLB
  const handleSaveModel = () => {
    if (!sceneRef.current) return
    const exporter = new GLTFExporter()
    exporter.parse(
      sceneRef.current,
      (glb) => {
        const blob = new Blob([glb], { type: 'application/octet-stream' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'textured-shirt.glb'
        link.click()
      },
      { binary: true }
    )
  }

  // shared button style
  const baseButtonStyle = {
    width: '120px',
    height: '40px',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* 2D panel */}
      <div
        style={{
          width: 400,
          padding: 20,
          background: '#fff',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
          <label
            style={{
              ...baseButtonStyle,
              backgroundColor: hasImage ? '#e5e7eb' : '#4f46e5',
              cursor: hasImage ? 'not-allowed' : 'pointer'
            }}
          >
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={handleAddImage}
              style={{ display: 'none' }}
              disabled={hasImage}
            />
          </label>
          <button
            onClick={removeImage}
            disabled={!hasImage}
            style={{
              ...baseButtonStyle,
              backgroundColor: !hasImage ? '#e5e7eb' : '#ef4444',
              cursor: !hasImage ? 'not-allowed' : 'pointer'
            }}
          >
            Remove
          </button>
          <button
            onClick={handleSaveTexture}
            disabled={!hasImage}
            style={{
              ...baseButtonStyle,
              backgroundColor: !hasImage ? '#e5e7eb' : '#10b981',
              cursor: !hasImage ? 'not-allowed' : 'pointer'
            }}
          >
            Save Texture
          </button>
          <button
            onClick={handleSaveModel}
            style={{
              ...baseButtonStyle,
              backgroundColor: '#2563eb',
              cursor: 'pointer'
            }}
          >
            Save Model
          </button>
        </div>
        <canvas
          ref={canvasRef}
          width={1024}
          height={1024}
          style={{
            width: 350,
            height: 350,
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
          }}
        />
      </div>

      {/* 3D panel */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'visible'         // allow object to extend if zoomed
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{
            width: '100%',
            height: '100%',
            display: 'block'          // remove inline-block gaps
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <OrbitControls />
          <Suspense fallback={null}>
            <Model
              canvasRef={canvasRef}
              hasImage={hasImage}
              sceneRef={sceneRef}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

function Model({ canvasRef, hasImage, sceneRef }) {
  const gltf = useLoader(GLTFLoader, '/robi.glb')
  const baseTex = useLoader(TextureLoader, '/red.jpg')
  const { gl } = useThree()
  const [canvasTex, setCanvasTex] = useState(null)

  // create high‑quality canvas texture, flipY fixes inversion
  useEffect(() => {
    if (!canvasRef.current) return
    const tex = new THREE.CanvasTexture(canvasRef.current)
    tex.flipY = true
    tex.flipX  = true
    tex.wrapS = THREE.ClampToEdgeWrapping
    tex.wrapT = THREE.ClampToEdgeWrapping
    tex.generateMipmaps = true
    tex.minFilter = THREE.LinearMipMapLinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.anisotropy = gl.capabilities.getMaxAnisotropy()
    tex.encoding = THREE.sRGBEncoding
    setCanvasTex(tex)
  }, [canvasRef.current, gl])

  // update each frame
  useFrame(() => {
    if (canvasTex) canvasTex.needsUpdate = true
  })

  // apply textures & capture scene for export
  useEffect(() => {
    const scene = gltf.scene
    sceneRef.current = scene
    scene.traverse((child) => {
      if (!child.isMesh) return
      if (child.name === 'default008') {
        child.material.map = hasImage && canvasTex ? canvasTex : baseTex
      } else if ([
        'default008_1',
        'default008_2',
        'default008_3',
        'default008_4'
      ].includes(child.name)) {
        child.material.map = baseTex
      }
      child.material.needsUpdate = true
    })
  }, [baseTex, canvasTex, hasImage, gltf.scene, sceneRef])
  return <primitive ref={sceneRef} object={gltf.scene} />
}
