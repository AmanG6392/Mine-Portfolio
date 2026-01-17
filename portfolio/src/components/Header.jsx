import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import emailjs from "@emailjs/browser";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  // state COntact form
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const openContactForm = () => setContactFormOpen(true);
  const closeContactForm = () => setContactFormOpen(false);
  const form = useRef();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    setIsOpen(false); // close mobile menu FIRST

    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }, 100);
  };

  const sections = [
    "home",
    "about",
    "projects",
    "experiences",
    "certifications",
    "contact me",
  ];

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      const headerHeight = 96;
      const scrollPos = window.scrollY + headerHeight;

      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (!el) return;

        if (
          scrollPos >= el.offsetTop &&
          scrollPos < el.offsetTop + el.offsetHeight
        ) {
          setActiveSection(section);
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        },
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        },
      );
  };

  const ProfileAvatar = ({ src }) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        {/* Avatar */}
        <motion.div
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.05 }}
          className="w-16 aspect-square rounded-full overflow-hidden cursor-pointer
        ring-2 ring-violet-500/60 dark:ring-violet-400/50
        animate-ring mr-3 flex-shrink-0"
        >
          <img
            src={src}
            alt="profile"
            className="w-full h-full object-cover block"
          />
        </motion.div>

        {/* Fullscreen Preview */}
        <AnimatePresence>
          {open && (
            <motion.div
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4"
            >
              <motion.img
                src={src}
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.85 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="max-w-[90vw] max-h-[90vh] rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 pointer-events-none">
      <div
        className="pointer-events-auto container mx-auto px-4 sm:px-6
  lg:px-8 flex items-center justify-between h-16 md:h-20"
      >
        {/*Logo Name */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            delay: 0.3,
            duration: 1.2,
          }}
          className="flex items-center"
        >
          <div className="w-16 aspect-square rounded-full overflow-hidden bg-gradient-to-r from-gray-500 to-gray-100 mr-3 flex-shrink-0   ring-2 ring-violet-500/60 dark:ring-violet-400/50 animate-glow">
            <ProfileAvatar src="https://res.cloudinary.com/difkartik/image/upload/v1768667623/ee19sjdvhelmietdprik.jpg" />
          </div>

          <span className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent ">
            AG
          </span>
        </motion.div>
        {/* Desktop navigation*/}
        <nav className="lg:flex hidden space-x-8">
          {sections.map((item, index) => (
            <motion.button
              key={item}
              type="button"
              onClick={() => scrollToSection(item)}
              className={`relative bg-transparent font-medium transition-colors duration-300
        ${
          activeSection === item
            ? "text-violet-400"
            : "text-gray-300 hover:text-violet-400"
        }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}

              {activeSection === item && (
                <motion.span
                  layoutId="active-underline"
                  className="absolute left-0 -bottom-1 h-0.5 w-full bg-violet-500"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Social icons -Desktop */}
        <div className="md:flex hidden items-center space-x-4">
          <motion.a
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
            href="https://github.com/AmanG6392"
          >
            <FiGithub className="w-5 h-5" />
          </motion.a>

          <motion.a
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
            href="https://www.linkedin.com/in/aman-gupta-b94a87308"
          >
            <FiLinkedin className="w-5 h-5" />
          </motion.a>
        </div>

        {/*hire Me button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 1,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          onClick={openContactForm}
          className="ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white transition-all duration-500"
        >
          Hire Me
        </motion.button>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button
            whileTap={{ scale: 0.7 }}
            onClick={toggleMenu}
            className="text-gray-300"
          >
            {isOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/*Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.5 }}
        className="pointer-events-auto md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-lg px-4 py-5 space-y-1"
      >
        <nav className="flex flex-col space-y-3">
          {sections.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`text-left py-2 font-medium ${
                activeSection === item ? "text-violet-400" : "text-gray-300"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-5">
            <a href="https://github.com/AmanG6392">
              <FiGithub className="h-5 w-5 text-gray-300" />
            </a>

            <a href="https://www.linkedin.com/in/aman-gupta-b94a87308">
              <FiLinkedin className="h-5 w-5 text-gray-300" />
            </a>
          </div>

          <button
            onClick={() => {
              toggleMenu();
              openContactForm();
            }}
            className="mt-4 block w-full px-4 py-2 rounded-lg bg-gradient-to-r from-violet-400 font-bold"
          >
            Contact Me
          </button>
        </div>
      </motion.div>

      {/* Contact */}
      <AnimatePresence>
        {contactFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black/50   background-blur-sm z-50 flex items-center   justify-center p-4 pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 200,
                duration: 0.8,
              }}
              className="bg-white dark:bg-gray-800   rounded-xl shadow-xl  w-full max-w-md p-6"
            >
              <div className="flex justify-between   items-center mb-4">
                <h1 className="text-2xl font-bold   text-gray-300">
                  Get In Touch
                </h1>
                <button onClick={closeContactForm}>
                  <FiX className="w-5 h-5   text-gray-300 font-extrabold" />
                </button>
              </div>

              {/* Input Form*/}
              <form ref={form} className="space-y-4" onSubmit={sendEmail}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="from_name"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"
                  />
                </div>
                <div>
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email ID
                  </label>
                  <input
                    type="email"
                    id="Email"
                    name="from_email"
                    placeholder=" Your Email Id"
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    rows="4"
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full px-4 py-2   bg-gradient-to-r from-violet-600   to-violet-400   hover:from-violet-700   hover:to-purple-700   transition-all duration-300   rounded-lg shadow-md   hover:shadow-lg   hover:shadow-violet-600/50"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
