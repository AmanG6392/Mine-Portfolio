import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollTrigger } from "gsap/all";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../functionality/Loader.jsx";
import { ProjectModel } from "../functionality/ProjectModel.jsx";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const projects = [
  {
    id: 1,
    title: "ChatApp",
    desc: "A real-time chat application built with Socket.io and React.",
    img: "/assets/project-1.png",
  },
  {
    id: 2,
    title: "Heygen Clone",
    desc: "AI video avatar generator inspired by Heygen.",
    img: "/assets/project-2.png",
  },
  {
    id: 3,
    title: "Portfolio Website",
    desc: "A personal portfolio showcasing modern 3D effects and animations.",
    img: "/assets/project-3.png",
  },
  {
    id: 4,
    title: "Mountain Scene",
    desc: "Animated landscape built in Three.js with parallax scroll.",
    img: "/assets/mountain-1.png",
  },
  {
    id: 5,
    title: "Dynamic Visuals",
    desc: "Creative scroll-driven visuals for immersive storytelling.",
    img: "/assets/mountain-2.png",
  },
];

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

const Project = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleLineRef = useRef(null);

  // ✅ Use global scroll instead of section target (no hydration error)
  const { scrollYProgress } = useScroll();

  // Parallax motion for 3D model
  const modelY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const isMobile = useMediaQuery({ maxWidth: 853 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title reveal
    gsap.fromTo(
      titleRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Line animation
    gsap.fromTo(
      titleLineRef.current,
      { width: "0%", opacity: 0 },
      {
        width: "100%",
        opacity: 1,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects-section"
      className="relative py-20  overflow-hidden bg-black"
    >
      {/* Section Title */}
      <div className="container mx-auto px-4 mb-16 relative z-10">
        <motion.h2
          ref={titleRef}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.7,
          }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 dark:text-gray-200 hover:violet-600 dark:hover:text-violet-400  transition-colors duration-300 group"
        >
          Featured Projects
        </motion.h2>
        <motion.div
          ref={titleLineRef}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.7,
          }}
          className="w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto opacity-0"
        ></motion.div>
      </div>

      {/* Background 3D Model */}
      <motion.div
        style={{ y: modelY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <figure
          className="absolute inset-0"
          style={{ width: "100vw", height: "100vh" }}
        >
          <Canvas camera={{ position: [1, 1, 3] }}>
            <Suspense fallback={<Loader />}>
              {/* 💡 Realistic Lighting */}
              <ambientLight intensity={0.7} />
              <directionalLight
                position={[5, 5, 5]}
                intensity={1.5}
                castShadow
              />
              <pointLight position={[-5, 3, -2]} intensity={0.6} />
              <Environment preset="sunset" background={false} />

              <EffectComposer>
                <Bloom
                  intensity={0.8}
                  luminanceThreshold={0.1}
                  luminanceSmoothing={0.9}
                />
              </EffectComposer>

              {/* 🌳 Your model */}
              <Float>
                <ProjectModel
                  scale={isMobile ? [1.3, 1.2, 1.4] : [0.7, 0.6, 0.6]}
                  position={isMobile ? [1, 1, 0.5] : [-3, -1, 0]}
                  rotation={[0, 1.2, 0]}
                />
                <OrbitControls enableZoom={false} />
              </Float>

              <Rig />
            </Suspense>
          </Canvas>
        </figure>
      </motion.div>

      {/* Projects List */}
      <div className=" flex flex-col w-[100%] md:w-[55vw] z-10 mt-5 ml-auto items-center md:mt-10 rounded-3xl bg-clip-text">
        {projects.map((project, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.4 }}
              className={`flex flex-col md:flex-row items-center mb-10 ${
                isLeft ? "mr-auto" : "md:flex-row-reverse ml-auto"
              }`}
            >
              {/* Image */}
              <div
                className={`md:w-1/2 w-full  mt-5 hover:border-[4px] ${
                  isLeft ? "border-r-3 border-b-3" : "border-l-3 border-b-3"
                } border-violet-600  rounded-3xl transition-all duration-300 p-2`}
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={project.img}
                  alt={project.title}
                  className="w-full h-auto rounded-3xl shadow-lg gap-1"
                />
              </div>

              {/* Text */}
              <div
                className={`md:w-1/2 w-full ${isLeft ? "md:pl-4" : "md:pr-4 "}`}
              >
                <motion.h3
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.7 + i * 0.2,
                  }}
                  className="text-2xl md:text-3xl font-semibold  mb-3 -mt-4 dark:text-gray-200 hover:violet-600 dark:hover:text-violet-400  transition-colors duration-300 group"
                >
                  {project.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
                </motion.h3>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  {project.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Project;
