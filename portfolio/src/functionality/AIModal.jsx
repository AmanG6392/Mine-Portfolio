import { motion, AnimatePresence } from "framer-motion";

const AIModal = ({ isOpen, onClose, content }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md 
                     flex items-center justify-center z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-gradient-to-br from-neutral-900 to-black 
                       text-white p-8 rounded-3xl 
                       max-w-2xl w-[90%] shadow-2xl relative"
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white"
              onClick={onClose}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">
              AI Response
            </h2>

            <div className="text-neutral-300 whitespace-pre-wrap leading-relaxed">
              {content}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIModal;