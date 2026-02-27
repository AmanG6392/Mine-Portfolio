import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SiHackerrank } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

const certifications = [
  {
    title: "Software Engineer Intern Role Certification",
    issuer: "HackerRank",
    image: "/assets/certificates/hackerank_certificate.png", // ✅ Put image in public folder
    description:
      "Successfully passed HackerRank's Software Engineer Intern role certification demonstrating strong data structures, algorithms, and real-world coding proficiency.",
    skills: [
      "Data Structures",
      "Algorithms",
      "Problem Solving",
      "Software Engineering",
    ],
    highlight: true,
    badge: "Elite Role Certification",
    link: "https://www.hackerrank.com/certificates/A0BDEA3337E7",
  },
  {
    title: "Software Engineer Certification",
    issuer: "HackerRank",
    image: "/assets/certificates/hackerank_certificate.png", // ✅ Put image in public folder
    description:
      "Successfully passed HackerRank's Software Engineer Intern role certification demonstrating strong data structures, algorithms, and real-world coding proficiency.",
    skills: [
      "Data Structures",
      "Algorithms",
      "Problem Solving",
      "Software Engineering",
    ],
    highlight: true,
    badge: "Elite Role Certification",
    link: "https://www.hackerrank.com/certificates/A0BDEA3337E7",
  },
  {
    title: "Software Engineer Intern Role Certification",
    issuer: "HackerRank",
    image: "/assets/certificates/hackerank_certificate.png", // ✅ Put image in public folder
    description:
      "Successfully passed HackerRank's Software Engineer Intern role certification demonstrating strong data structures, algorithms, and real-world coding proficiency.",
    skills: [
      "Data Structures",
      "Algorithms",
      "Problem Solving",
      "Software Engineering",
    ],
    highlight: true,
    badge: "Elite Role Certification",
    link: "https://www.hackerrank.com/certificates/A0BDEA3337E7",
  },
  {
    title: "Software Engineer Intern Role Certification",
    issuer: "HackerRank",
    image: "/assets/certificates/hackerank_certificate.png", // ✅ Put image in public folder
    description:
      "Successfully passed HackerRank's Software Engineer Intern role certification demonstrating strong data structures, algorithms, and real-world coding proficiency.",
    skills: [
      "Data Structures",
      "Algorithms",
      "Problem Solving",
      "Software Engineering",
    ],
    highlight: true,
    badge: "Elite Role Certification",
    link: "https://www.hackerrank.com/certificates/A0BDEA3337E7",
  },
  {
    title: "Software Engineer Intern Role Certification",
    issuer: "HackerRank",
    image: "/assets/certificates/hackerank_certificate.png", // ✅ Put image in public folder
    description:
      "Successfully passed HackerRank's Software Engineer Intern role certification demonstrating strong data structures, algorithms, and real-world coding proficiency.",
    skills: [
      "Data Structures",
      "Algorithms",
      "Problem Solving",
      "Software Engineering",
    ],
    highlight: true,
    badge: "Elite Role Certification",
    link: "https://www.hackerrank.com/certificates/A0BDEA3337E7",
  },
];

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section className="relative py-28 px-6 bg-black text-white overflow-hidden">

      {/* Floating Gradient Blobs */}
     
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold text-center mb-20"
      >
        Certifications
      </motion.h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
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

            <h3 className="text-xl font-semibold mb-1">
              {cert.title}
            </h3>

            <p className="text-xs text-emerald-400 mb-3 tracking-wide">
              Role-Based Industry Certification
            </p>

            <div className="flex items-center gap-2 text-gray-400 mb-4">
              <SiHackerrank className="text-green-500" />
              {cert.issuer}
            </div>

            <p className="text-sm text-gray-400 mb-5">
              {cert.description}
            </p>

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
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 p-6 rounded-2xl max-w-4xl w-full relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
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