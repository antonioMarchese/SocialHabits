import ContainerHeader from "../containerHeader";

export default function FeedContainer() {
  return (
    <div className="w-full lg:max-w-lg flex flex-col gap-8 px-2 py-4 border border-zinc-600 rounded-lg">
      <ContainerHeader
        title="Feed"
        subtitle="Acompanhe a jornada de seus amigos"
      />
    </div>
  );
}
