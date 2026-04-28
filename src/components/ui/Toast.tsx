"use client";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose?: () => void;
}

export function Toast({ message, type = "info", onClose }: ToastProps) {
  return (
    <div role="alert">
      <span>{message}</span>
      {onClose && <button onClick={onClose}>✕</button>}
    </div>
  );
}
