export default function FeedContainer() {
  return (
    <div className="w-full lg:max-w-lg flex flex-col gap-8 px-2 py-4 border border-zinc-600 rounded-lg">
      <header className="w-full text-left flex flex-col items-start text-zinc-200">
        <h1 className="font-semibold text-xl">Feed</h1>
        <small className="text-zinc-300 text-xs font-light">
          Acompanhe a jornada de seus amigos
        </small>
      </header>
    </div>
  );
}
