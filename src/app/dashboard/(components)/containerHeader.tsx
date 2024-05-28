interface ContainerHeaderProps {
  title: string;
  subtitle?: string;
}

export default function ContainerHeader({
  title,
  subtitle,
}: ContainerHeaderProps) {
  return (
    <header className="w-full text-left flex flex-col items-start text-zinc-200">
      <h1 className="font-semibold text-xl">{title}</h1>
      {subtitle && (
        <small className="text-zinc-300 text-xs font-light">{subtitle}</small>
      )}
    </header>
  );
}
