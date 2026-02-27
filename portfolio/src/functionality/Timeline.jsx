"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FlipWords } from "./FlipWords";
import { gsap } from "gsap";


export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const sectionRef = useRef(null);
  const titleLineRef = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }

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
  
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const words = ["My", "Expierences"];
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="c-space section-spacing bg-black" ref={containerRef}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="flex justify-center"
      >
        <FlipWords
          words={words}
          className="font-black text-white text-5xl md:text-7xl"
        />
      </motion.div>
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
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
              <div className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px] bg-midnight ml-3">
                <div className="w-4 h-4 p-2 border rounded-full bg-neutral-800 border-neutral-700" />
              </div>
              <div className="flex-col hidden gap-2 text-xl font-bold md:flex md:pl-20 md:text-4xl text-neutral-300">
                <h3>{item.date}</h3>
                <h3 className="text-3xl text-neutral-400">{item.title}</h3>
                <h3 className="text-3xl text-neutral-500">{item.job}</h3>
              </div>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <div className="block mb-4 text-2xl font-bold text-left text-neutral-300 md:hidden ">
                <h3>{item.date}</h3>
                <h3>{item.job}</h3>
              </div>
              {item.contents.map((content, index) => (
                <p className="mb-3 font-normal text-neutral-400" key={index}>
                  {content}
                </p>
              ))}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-1 left-1 top-0 overflow-hidden w-[5px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%] ml-3"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[6px] bg-gradient-to-t from-purple-600 via-lavender/50 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
