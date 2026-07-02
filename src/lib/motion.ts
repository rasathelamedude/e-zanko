import type { Transition, Variants } from "framer-motion";

// A gentle ease-out curve reused across the app's entrance animations.
export const easeOutExpo: NonNullable<Transition["ease"]> = [0.22, 1, 0.36, 1];

/** Fade + slide down from above — the app's default "content loaded" entrance. */
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeOutExpo },
  },
};

/** Parent that reveals its children one after another, each dropping in. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
  },
};

/** Child item for use inside {@link staggerContainer}. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easeOutExpo },
  },
};
