import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeInDown } from "../../lib/motion";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a page so its content fades in and slides down from above on mount.
 * Use as the outermost element returned by a page component.
 */
const PageTransition = ({ children, className }: PageTransitionProps) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeInDown}
    className={className}
  >
    {children}
  </motion.div>
);

export default PageTransition;
