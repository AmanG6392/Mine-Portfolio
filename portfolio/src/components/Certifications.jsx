import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SiHackerrank } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

const certifications = [
  {
    title: "Software Engineer Intern Role Certification",
    issuer: "HackerRank",
    image: "/assets/certificates/hackerank_certificate.png",
    description:
      "Successfully passed HackerRank's Software Engineer Intern role certification demonstrating strong data structures, algorithms, and real-world coding proficiency.",
    skills: [
      "Data Structures",
      "Algorithms",
      "Problem Solving",
      "Software Engineering",
    ],
    pg: "Role-Based Industry Certification",
    highlight: true,
    badge: "Elite Role Certification",
    link: "https://www.hackerrank.com/certificates/A0BDEA3337E7",
  },
  {
    title: "SQL (Advanced)",
    issuer: "HackerRank",
    image: "/assets/certificates/sql_advanced.jpg",
    description:
      "Successfully cleared HackerRank's SQL (Advanced) certification, demonstrating strong expertise in complex queries, joins, indexing, optimization, and database problem-solving.",
    skills: [
      "Advanced SQL Queries",
      "Joins & Subqueries",
      "Indexing & Optimization",
      "Database Design",
      "Problem Solving",
    ],
    pg: " Advance Skill-Based Industry Certification",
    highlight: true,
    badge: "Advanced Skill Certification",
    link: "https://www.hackerrank.com/certificates/iframe/7802e692a4b7",
  },
  {
    title: "Python (Basic)",
    issuer: "HackerRank",
    image: "/assets/certificates/python.jpg",
    description:
      "Successfully cleared HackerRank's Python (Basic) certification, demonstrating fundamental knowledge of Python syntax, data types, control structures, functions, and problem-solving skills.",
    skills: [
      "Python Syntax",
      "OOPs",
      "Real-World Python Skills",
      "Intermediate Python Skills",
      "Real-World Python Skills",
    ],
    pg: "Skill-Based Industry Certification",
    highlight: true,
    badge: "Skill Certification",
    link: "https://www.hackerrank.com/certificates/iframe/99b8597914a5",
  },
  {
    title: "Software Engineer Certification",
    issuer: "HackerRank",
    image: "/assets/certificates/software_engineer.jpg", // ✅ Put image in public folder
    description:
      "Successfully passed HackerRank's Software Engineer certification demonstrating strong data structures, algorithms, and real-world coding proficiency.",
    skills: [
      "Data Structures",
      "Algorithms",
      "Problem Solving",
      "Software Engineering",
    ],
    pg: "Role-Based Industry Certification",
    highlight: true,
    badge: "Elite Role Certification",
    link: "https://www.hackerrank.com/certificates/iframe/6d783206d85a",
  },
  {
    title: "JavaScript(Basic) Certification",
    issuer: "HackerRank",
    image: "/assets/certificates/javascript_basic.jpg",
    description:
      "Successfully passed HackerRank's JavaScript(Basic) Certification demonstrating strong data structures, algorithms, and real-world coding proficiency.",
    skills: [
      "Data Structures",
      "Algorithms",
      "Web Development",
      "Software Engineering",
    ],
    pg: "Skill Certification",
    highlight: true,
    badge: "Elite Skill Certification",
    link: "https://www.hackerrank.com/certificates/iframe/1af625471cc9",
  },
];

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  return (
    <section className="relative min-h-screen py-40 px-6 bg-black text-white overflow-hidden">
      {/* Floating Gradient Blobs */}
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[150px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[150px] opacity-20 animate-pulse"></div>
      </div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-24"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-emerald-400 via-indigo-200 to-purple-300 bg-clip-text text-transparent">
          Certifications
        </h1>

        <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
          Industry-recognized certifications validating strong problem-solving,
          software engineering principles, and real-world coding expertise.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10"
      >
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 80 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={
              typeof window !== "undefined" && window.innerWidth > 768
                ? { rotateX: 8, rotateY: -8, scale: 1.05 }
                : {}
            }
            transition={{ type: "spring", stiffness: 200 }}
            className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/20 shadow-2xl hover:shadow-indigo-500/30 duration-500 group cursor-pointer transition-all"
            onClick={() => setSelectedCert(cert)}
          >
            {/* Highlight */}
            {cert.highlight && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-green-400 text-xs px-3 py-1 rounded-full font-semibold shadow-md flex items-center gap-1">
                <FaCheckCircle /> Top Skill Certified
              </div>
            )}

            {/* Badge */}
            {cert.badge && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                {cert.badge}
              </div>
            )}

            {/* Image */}
            <div className="overflow-hidden rounded-2xl mb-6">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-52 object-cover rounded-2xl group-hover:scale-110 transition duration-500"
              />
            </div>

            <h3
              className="text-xl font-semibold mb-1 cursor-pointer md:cursor-default"
              onClick={() =>
                setExpandedCard(expandedCard === index ? null : index)
              }
            >
              {cert.title}
            </h3>

            <p className="text-xs text-emerald-400 mb-3 tracking-wide">
              {cert.pg}
            </p>

            {/* Hidden on small screens until title click */}
            <div
              className={`${
                expandedCard === index ? "block" : "hidden"
              } md:hidden`}
            >
              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <SiHackerrank className="text-green-500" />
                {cert.issuer}
              </div>

              <p className="text-sm text-gray-400 mb-5">{cert.description}</p>

              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white/10 px-3 py-1 rounded-full border border-white/20 hover:bg-emerald-500/20 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Always visible on large screens */}
            <div className="hidden md:block">
              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <SiHackerrank className="text-green-500" />
                {cert.issuer}
              </div>

              <p className="text-sm text-gray-400 mb-5">{cert.description}</p>

              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white/10 px-3 py-1 rounded-full border border-white/20 hover:bg-emerald-500/20 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)} // ✅ Close when clicking anywhere
          >
            <motion.div
              className="bg-gray-900 p-6 rounded-2xl max-w-2xl w-2/3 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} // ✅ Prevent close when clicking inside modal
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 text-white text-xl"
              >
                ✕
              </button>

              <img
                src={selectedCert.image}
                alt="certificate"
                className="w-full rounded-xl mb-6"
              />

              <a
                href={selectedCert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition py-3 rounded-lg font-semibold"
              >
                Verify Certificate <FiExternalLink />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
