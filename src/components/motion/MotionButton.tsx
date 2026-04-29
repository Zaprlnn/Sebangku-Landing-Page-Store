"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";

type MotionButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  loading?: boolean;
  children?: ReactNode;
};

export function MotionButton({
  loading,
  disabled,
  className,
  children,
  ...props
}: MotionButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      disabled={isDisabled}
      className={clsx(
        "relative inline-flex items-center justify-center gap-2",
        isDisabled && "cursor-not-allowed opacity-70",
        className
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
      )}
      <span className={clsx(loading && "opacity-80")}>{children}</span>
    </motion.button>
  );
}
