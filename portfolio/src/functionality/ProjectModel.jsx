import { useGLTF } from '@react-three/drei'

export function ProjectModel(props) {
  const { scene } = useGLTF('/models/cherry_tree_final.glb')
   console.log(scene.scale)

  return (
    <primitive
      object={scene}
      scale={0.001}
      
      rotation={[Math.PI / 2, 1.5, 1]}
      {...props}
    />
   

  )
}

useGLTF.preload('/models/cherry_tree_final.glb')
