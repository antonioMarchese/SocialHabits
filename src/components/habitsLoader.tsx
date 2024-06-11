import clsx from "clsx";

export default function HabitsLoader() {
  return (
    <div className="w-full h-full min-h-40 flex flex-col gap-2 items-center justify-center z-10 bg-zinc-950/80">
      <div className="w-full flex items-center justify-center gap-2">
        {Array.from({ length: 6 }, (_, i) => i).map((_, index) => (
          <div
            className={clsx("size-5 rounded-md border animate-opacityPass", {
              "border-zinc-700 bg-transparent": index === 0,
              "border-violet-400 bg-violet-400/70 delay-300": index === 5,
              "border-violet-500 bg-violet-500/70 delay-200": index === 4,
              "border-violet-600 bg-violet-600/70 delay-150": index === 3,
              "border-violet-700 bg-violet-700/70 delay-100": index === 2,
              "border-violet-800 bg-violet-800/70 delay-75": index === 1,
            })}
            key={index}
          />
        ))}
      </div>
      <p className="w-full text-center text-xs text-zinc-300">
        Um passo de cada vez...
      </p>
    </div>
  );
}
