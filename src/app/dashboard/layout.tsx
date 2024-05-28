import Sidebar from "./(components)/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col sm:flex-row h-screen w-full bg-zinc-950">
      <Sidebar />
      <div className="w-full h-full flex flex-1 items-start overflow-auto">
        {children}
      </div>
    </section>
  );
}
