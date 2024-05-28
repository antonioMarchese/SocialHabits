import clsx from "clsx";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div
      className={clsx(
        "absolute top-0 left-0 rounded-tl-md h-2 transition-[width] duration-150 ease-out",
        {
          "w-0": progress < 0.1,
          "w-[20%] bg-violet-900": progress >= 0.2 && progress < 0.4,
          "w-[40%] bg-violet-800": progress >= 0.4 && progress < 0.6,
          "w-[60%] bg-violet-700": progress >= 0.6 && progress < 0.8,
          "w-[80%] bg-violet-600": progress >= 0.8 && progress < 1,
          "w-full bg-violet-500 rounded-tr-md": progress === 1,
        }
      )}
    ></div>
  );
}
