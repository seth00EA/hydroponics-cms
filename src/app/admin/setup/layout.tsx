export default function AdminSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted-bg px-4 py-12">
      {children}
    </div>
  );
}
