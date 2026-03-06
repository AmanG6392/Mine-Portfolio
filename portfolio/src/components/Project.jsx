import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/all";
import { useMediaQuery } from "react-responsive";

const projects = [
  {
    id: 1,
    title: "DbGenie",
    desc: "AI powered database assistant helping developers query databases using natural language.",
    fullDesc:
      "DbGenie helps developers interact with databases using AI powered natural language queries. It understands schema, generates optimized SQL queries and speeds up database management.Designed and developed an AI-driven SQL agent that translates natural language queries into executable SQL, simplifying database access while maintaining strong safety and correctness guarantees. • Integrated schema-aware AI logic with Drizzle ORM and Zod-based validation to enforce type safety, prevent malformed or unsafe queries, and ensure secure, efficient database operations using SQLite (Turso) within a modern Next.js full-stack architecture",
    img: "/assets/DBgenieImage.png",
    video: "https://www.youtube.com/embed/xSQ_yGCpB0w",
    github: "https://github.com/AmanG6392/DbGenie",
    tech: [
      "Next.js",
      "Drizzle ORM",
      "SQLite (Turso)",
      "Generative AI",
      "Zod",
      "SDK",
      "Fast API",
      "Sockets IO",
    ],
  },
  {
    id: 2,
    title: "ProjectHub",
    desc: "Realtime coding collaboration platform with AI assistance.",
    fullDesc:
      "Designed and developed a real-time collaborative workspace supporting chat, video calls, group discussions, and secure authentication, enabling distributed teams to collaborate seamlessly on software projects.Implemented AI-driven code exploration with file-tree access and browser-based execution using WebContainers and StackBlitz, alongside shared drawing, note-taking, media sharing, and interactive collaboration tools to unify communication and development in one platform",
    img: "/assets/ProjecthubImage.png",
    video: "https://www.youtube.com/embed/OQvLqsNppL8",
    github: "https://github.com/AmanG6392/Chat-APP-with-AI-chatbot-integration",
    tech: [
      "React JS",
      "ExpressJS",
      "Sockets IO",
      "Fast API",
      " WebSockets",
      "Gen AI",
      "Web Containers",
      "StackBlitz",
      "Redis",
      "MongoDB",
    ],
  },
  {
    id: 3,
    title: "AvatarFlow",
    desc: "AI avatar generator inspired by HeyGen.",
    fullDesc:
      "AvatarFlow generates AI avatars capable of speaking user provided scripts using text to speech and AI generated visuals.",
    img: "/assets/avatarFlow.jpeg",
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    github: "https://github.com/yourrepo/avatarflow",
    tech: ["AI", "React", "Node"],
  },
  {
    id: 4,
    title: "Portfolio Website",
    desc: "Interactive developer portfolio with 3D and animation.",
    fullDesc:
      "A modern portfolio showcasing projects with smooth animations, Framer Motion transitions and 3D effects.",
    img: "/assets/portfolio.png",
    video: " upcoming",
    github: "https://github.com/AmanG6392/Mine-Portfolio",
    tech: ["React", "ThreeJS", "GSAP"],
  },
  {
    id: 5,
    title: "Youtube Backend Web Service",
    desc: "Backend system for video storage and streaming.",
    fullDesc:
      "A scalable backend architecture for storing and streaming videos inspired by YouTube infrastructure.",
    img: "/assets/image.png",
    video: "https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj",
    github: "https://github.com/AmanG6392/learning-backend",
    tech: ["Node", "Express", "MongoDB", "Cloudinary", " Redis"],
  },
];

const Project = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleLineRef = useRef(null);

  const [activeProject, setActiveProject] = useState(projects[0]);
  const [readMore, setReadMore] = useState(false);

  const projectRefs = useRef([]);

  const isMobile = useMediaQuery({ maxWidth: 853 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
      },
    );

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
      },
    );

    const observers = projectRefs.current.map((ref, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isMobile) {
            setActiveProject(projects[i]);
            setReadMore(false);
          }
        },
        { threshold: 0.6 },
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="projects-section"
      className="relative py-20 overflow-hidden bg-black"
    >
      {/* TITLE */}
      <div className="container mx-auto px-4 mb-16 relative z-10">
        <motion.h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 text-gray-200"
        >
          Featured Projects
        </motion.h2>

        <motion.div
          ref={titleLineRef}
          className="w-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto opacity-0"
        ></motion.div>
      </div>

      <div className="flex gap-10 container mx-auto px-4">
        {/* LEFT DESCRIPTION PANEL */}
        {!isMobile && (
          <div className="w-[40%] bg-blue-200/20 sticky top-24 h-fit text-white rounded-xl">
            <h3 className="text-3xl font-bold mb-4 mt-2 ml-4">{activeProject.title}</h3>

            <p className="text-gray-300 ml-4">
              {readMore
                ? activeProject.fullDesc
                : activeProject.fullDesc.slice(0, 120) + "..."}
            </p>

            <button
              onClick={() => setReadMore(!readMore)}
              className="text-violet-400 mt-2 ml-4"
            >
              {readMore ? "Show Less" : "Read More"}
            </button>

            {/* VIDEO */}
            
            <div className="mt-6 rounded-xl overflow-hidden ml-4">
              <p className="text-white text-lg ml-3 mb-3">Demo</p>
              <iframe
                loading="lazy"
                src={activeProject.video}
                className="w-90 h-53 ml-7"
                allowFullScreen
                title="demo"
              />
            </div>

            {/* GITHUB */}
            <a
              href={activeProject.github}
              target="_blank"
              className="inline-block mt-4 px-4 py-2 bg-violet-600 rounded-lg ml-4"
            >
              Github
            </a>

            {/* TECH STACK */}
            <div className="flex flex-wrap gap-2 mt-4 ml-4">
              {activeProject.tech.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects List */}
        <div className="flex flex-col w-full md:w-[55vw] h-[70vh] overflow-y-auto z-10 mt-5 ml-auto pr-4">
          {projects.map((project, i) => {
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={project.id}
                ref={(el) => (projectRefs.current[i] = el)}
                initial={{ opacity: 1, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.4 }}
                onClick={() => {
                  if (isMobile) {
                    setActiveProject(project);
                    setReadMore(false);
                  }
                }}
                className={`flex flex-col md:flex-row items-center mb-10 cursor-pointer ${
                  isLeft ? "mr-auto" : "md:flex-row-reverse ml-auto"
                } ${
                  activeProject?.id === project.id
                    ? "bg-blue-200/30 border rounded-xl"
                    : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`md:w-1/2 w-full mt-5 hover:border-[4px] ${
                    isLeft ? "border-r-3 border-b-3" : "border-l-3 border-b-3"
                  } border-violet-600 rounded-3xl transition-all duration-300 p-2`}
                >
                  <motion.img
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={project.img}
                    alt={project.title}
                    className="w-full h-auto rounded-3xl shadow-lg gap-1"
                  />
                </div>

                {/* Text */}
                <div
                  className={`md:w-1/2 w-full ${isLeft ? " pl-2 md:pl-4 mt-4" : "md:pr-4 mt-4"}`}
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
                    className="relative text-2xl md:text-3xl font-semibold mb-3 -mt-4 ml-4 dark:text-gray-200 hover:violet-600 dark:hover:text-violet-400 transition-colors duration-300 group"
                  >
                    {project.title}

                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
                  </motion.h3>

                  <p className="text-gray-300 text-base md:text-lg leading-relaxed ml-4">
                    {project.desc}
                  </p>

                  {/* MOBILE DETAILS */}
                  {isMobile && activeProject.id === project.id && (
                    <div className="mt-4">
                      <p className="text-gray-400">
                        {readMore
                          ? project.fullDesc
                          : project.fullDesc.slice(0, 120) + "..."}
                      </p>

                      <button
                        onClick={() => setReadMore(!readMore)}
                        className="text-violet-400"
                      >
                        {readMore ? "Show Less" : "Read More"}
                      </button>

                      <p className="text-white text-lg">Demo</p>

                      <iframe
                        loading="lazy"
                        src={project.video}
                        className="w-80 h-45 ml-8 rounded-xl"
                        allowFullScreen
                      />

                      <a
                        href={project.github}
                        target="_blank"
                        className="inline-block mt-4 px-4 py-2 bg-violet-600 rounded-lg"
                      >
                        Github
                      </a>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tech.map((t, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-400 rounded-full text-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Project;
