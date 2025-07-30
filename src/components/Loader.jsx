import React from 'react'
import { Html, useProgress } from '@react-three/drei'

export default function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ color: '#fff', fontSize: '1.2em' }}>
        Loading... {progress.toFixed(0)}%
      </div>
    </Html>
  )
}
