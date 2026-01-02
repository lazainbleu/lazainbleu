'use client'

import { useEffect, useRef, memo } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

interface Dot {
  lat: number
  lng: number
  label: string
}

interface Connection {
  from: { lat: number; lng: number }
  to: { lat: number; lng: number }
}

interface GlobeProps {
  dots?: Dot[]
  connections?: Connection[]
}

export const Globe = memo(function Globe({ dots = [], connections = [] }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const w = container.clientWidth
    const h = container.clientHeight
    const globeRadius = 80

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 1000)
    camera.position.z = 250

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Helper: Convert Lat/Lng to Vector3
    const getPos = (lat: number, lng: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lng + 180) * (Math.PI / 180)
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      )
    }

    // 2. Lingkaran Dasar
    const geometry = new THREE.SphereGeometry(globeRadius, 50, 50)
    const material = new THREE.MeshBasicMaterial({
      color: 0xe5e5e5,
      transparent: true,
      opacity: 0.05,
      wireframe: true,
    })
    scene.add(new THREE.Mesh(geometry, material))

    // 4. Map Texture (Land)
    const loader = new THREE.TextureLoader()
    const mapTexture = loader.load(
      'https://unpkg.com/three-globe/example/img/earth-topology.png'
    )
    const landMat = new THREE.MeshBasicMaterial({
      map: mapTexture,
      transparent: true,
      opacity: 0.3,
      color: 0xa3a3a3,
    })
    scene.add(new THREE.Mesh(geometry, landMat))

    // 5. Markers
    dots.forEach((dot) => {
      const pos = getPos(dot.lat, dot.lng, globeRadius + 0.5)
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(1.2, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0x171717 })
      )
      marker.position.copy(pos)
      scene.add(marker)
    })

    // --- NEW: Arc Connections ---
    const arcGroup = new THREE.Group()
    scene.add(arcGroup)

    connections.forEach((conn) => {
      const start = getPos(conn.from.lat, conn.from.lng, globeRadius)
      const end = getPos(conn.to.lat, conn.to.lng, globeRadius)

      // Calculate mid point with altitude
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
      const distance = start.distanceTo(end)
      mid.normalize().multiplyScalar(globeRadius + distance * 0.4)

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
      const points = curve.getPoints(50)
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points)

      const lineMat = new THREE.LineBasicMaterial({
        color: 0x737373,
        transparent: true,
        opacity: 0.4,
      })

      const line = new THREE.Line(lineGeom, lineMat)
      arcGroup.add(line)
    })

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.6
    controls.enableZoom = false

    let frameId: number
    const animate = (time: number) => {
      controls.update()
      // Subtle pulse effect for arcs
      arcGroup.children.forEach((child, i) => {
        const m = (child as THREE.Line).material as THREE.LineBasicMaterial
        m.opacity = 0.2 + Math.abs(Math.sin(time * 0.0015 + i)) * 0.3
      })
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate(0)

    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      landMat.dispose()
      container.innerHTML = ''
    }
  }, [dots, connections])

  return (
    <div className="relative flex w-full items-center justify-center">
      <div
        ref={containerRef}
        className="aspect-square w-full max-w-[600px] cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      />
    </div>
  )
})

Globe.displayName = 'Globe'
