export default function Layout({
  children,
  setting,
  statistical,
}: {
  children: React.ReactNode;
  setting: React.ReactNode;
  statistical: React.ReactNode;
}) {
  return (
    <main className="mt-12">
      {setting}
      {children}
      {statistical}
    </main>
  );
}
