"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

interface RealtimeHighlightProps {
  value: string | number;
  className?: string;
}

export function RealtimeHighlight({ value, className }: RealtimeHighlightProps) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setPulse(true);
    const timeout = window.setTimeout(() => setPulse(false), 900);
    return () => window.clearTimeout(timeout);
  }, [value]);

  return (
    <span className={clsx(className, pulse && "animate-highlight-soft")}>{value}</span>
  );
}
