interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  return (
    <div className="h-full">
      {children}
    </div>
  );
}
