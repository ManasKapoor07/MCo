import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export default function MyModel(props) {
  const { scene } = useGLTF('/models/dark_theme_bathroom.glb')

  useEffect(() => {
    // Example: color all mesh materials red
    scene.traverse((child) => {
      if (child.isMesh) {
        // child.material.color.set('#3498db') // nice blue
        child.material.metalness = 0.2
        child.material.roughness = 0.6
      }
    })
  }, [scene])

  return <primitive object={scene} {...props} />
}
