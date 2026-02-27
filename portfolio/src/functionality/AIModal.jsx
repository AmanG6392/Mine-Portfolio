import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const AIModal = ({ isOpen, onClose, content, loading }) => {
  const modalRef = useRef();
  const [displayedText, setDisplayedText] = useState("");

  /* ==============================
     Prevent background scroll
  =============================== */
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  /* ==============================
     Typing animation
  =============================== */
  useEffect(() => {
    if (!content) return;

    let i = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + content[i]);
      i++;
      if (i >= content.length) clearInterval(interval);
    }, 15);

    return () => clearInterval(interval);
  }, [content]);

  /* ==============================
     Outside click close
  =============================== */
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        onClick={handleOutsideClick}
        className="fixed inset-0 bg-black/80 backdrop-blur-lg 
                   flex items-center justify-center z-[9999] p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.8, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 40 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-gradient-to-br from-neutral-900 to-black 
                     text-white rounded-3xl shadow-2xl 
                     max-w-3xl w-full max-h-[80vh] 
                     overflow-y-auto p-8 relative"
        >
          <button
            className="absolute top-4 right-5 text-white/60 hover:text-white text-xl"
            onClick={onClose}
          >
            ✕
          </button>

          <h2 className="text-3xl font-bold mb-6">AI Assistant</h2>

          {/* Loading shimmer */}
          {loading && (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
              <div className="h-4 bg-white/10 rounded w-5/6"></div>
            </div>
          )}

          {/* Markdown Rendered Content */}
          {!loading && (
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-3xl font-bold mb-4" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-2xl font-bold mb-3" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      className="text-neutral-300 text-lg mb-3 leading-relaxed"
                      {...props}
                    />
                  ),
                  a: ({ href, children }) => {
                    const handleClick = (e) => {
                      if (href?.startsWith("#")) {
                        e.preventDefault();

                        const element = document.querySelector(href);

                        if (element) {
                          onClose();

                          setTimeout(() => {
                            element.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }, 300);
                        }
                      } else {
                        window.open(href, "_blank");
                      }
                    };

                    return (
                      <a
                        href={href}
                        onClick={handleClick}
                        className="text-blue-400 underline hover:text-blue-300 cursor-pointer"
                      >
                        {children}
                      </a>
                    );
                  },
                }}
              >
                {displayedText}
              </ReactMarkdown>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIModal;
