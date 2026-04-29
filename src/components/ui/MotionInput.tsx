"use client";

import { useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

type MotionInputProps = HTMLMotionProps<"input"> & {
  label: string;
  error?: string;
  wrapperClassName?: string;
};

export function MotionInput({
  label,
  error,
  className,
  wrapperClassName,
  value,
  ...props
}: MotionInputProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = value !== undefined && value !== null && String(value).length > 0;

  return (
    <div className={clsx("relative", error && "animate-input-shake", wrapperClassName)}>
      <motion.label
        className={clsx(
          "pointer-events-none absolute left-3 top-3 origin-left text-sm text-gray-500",
          error && "text-red-500"
        )}
        animate={focused || hasValue ? { y: -14, scale: 0.92 } : { y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      <motion.input
        {...props}
        value={value}
        onFocus={(event) => {
          setFocused(true);
          props.onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          props.onBlur?.(event);
        }}
        className={clsx(
          "w-full rounded-xl border border-gray-300 bg-white px-3 pb-2.5 pt-5 text-sm outline-none transition-colors",
          "focus:border-blue-500",
          error && "border-red-400 focus:border-red-500",
          className
        )}
        animate={focused ? { boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.2)" } : { boxShadow: "0 0 0 0 rgba(37, 99, 235, 0)" }}
        transition={{ duration: 0.2 }}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

type MotionTextareaProps = HTMLMotionProps<"textarea"> & {
  label: string;
  error?: string;
  wrapperClassName?: string;
};

export function MotionTextarea({
  label,
  error,
  className,
  wrapperClassName,
  value,
  ...props
}: MotionTextareaProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = value !== undefined && value !== null && String(value).length > 0;

  return (
    <div className={clsx("relative", error && "animate-input-shake", wrapperClassName)}>
      <motion.label
        className={clsx(
          "pointer-events-none absolute left-3 top-3 origin-left text-sm text-gray-500",
          error && "text-red-500"
        )}
        animate={focused || hasValue ? { y: -14, scale: 0.92 } : { y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      <motion.textarea
        {...props}
        value={value}
        onFocus={(event) => {
          setFocused(true);
          props.onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          props.onBlur?.(event);
        }}
        className={clsx(
          "min-h-24 w-full rounded-xl border border-gray-300 bg-white px-3 pb-2.5 pt-5 text-sm outline-none transition-colors",
          "focus:border-blue-500",
          error && "border-red-400 focus:border-red-500",
          className
        )}
        animate={focused ? { boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.2)" } : { boxShadow: "0 0 0 0 rgba(37, 99, 235, 0)" }}
        transition={{ duration: 0.2 }}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
