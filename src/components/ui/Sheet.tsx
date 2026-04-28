"use client";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right";
}

export function Sheet({ open, onClose, children, side = "right" }: SheetProps) {
  if (!open) return null;
  return (
    <div>
      <div onClick={onClose} />
      <div>{children}</div>
    </div>
  );
}
