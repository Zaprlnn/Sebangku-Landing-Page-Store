"use client";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Dialog({ open, onClose, children, title }: DialogProps) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal>
      <div onClick={onClose} />
      <div>
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </div>
  );
}
