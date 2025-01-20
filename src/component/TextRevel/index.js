import { motion } from "framer-motion";

const TextReveal = ({ children, delay = 0 }) => {
  const animationVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.8,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={animationVariants}>
      {children}
    </motion.div>
  );
};

export default TextReveal;
