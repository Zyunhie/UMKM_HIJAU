export const pageVariants = {
  initial: { opacity: 0, y: 12, scale: 0.995 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
  exit: { opacity: 0, y: -8, scale: 0.995, transition: { duration: 0.35 } },
};

export const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.3 } },
};

export const buttonTap = {
  whileHover: { y: -3 },
  whileTap: { scale: 0.97 },
};

export const orbMotion = {
  animateUp: { y: [0, -28, 0], transition: { duration: 9, repeat: Infinity, ease: "easeInOut" } },
  animateDown: { y: [0, 24, 0], transition: { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 } },
};

export const navItem = {
  whileHover: { scale: 1.04 },
  transition: { type: "spring", stiffness: 380, damping: 26 },
};
