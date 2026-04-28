export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout">
      {/* Decorative blobs */}
      <div className="auth-blob auth-blob--1" aria-hidden="true" />
      <div className="auth-blob auth-blob--2" aria-hidden="true" />
      <div className="auth-blob auth-blob--3" aria-hidden="true" />

      {/* Content */}
      <div className="auth-layout__inner">
        {children}
      </div>
    </div>
  );
}
