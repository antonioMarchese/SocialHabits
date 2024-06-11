import { useSectionStore } from "@/store/useSectionStore";
import clsx from "clsx";
import Link from "next/link";

interface MenuLinkProps {
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref">
  >;
  title: string;
  href?: string;
  onClick?: (value: any) => void;
  type?: "link" | "button";
}

const menuLinkClass =
  "flex items-center justify-start gap-2 w-full hover:text-white transition-all duration-300 px-4 py-2";

export default function MenuLink({
  icon: Icon,
  title,
  href,
  onClick,
  type = "link",
}: MenuLinkProps) {
  const { selectedSection, setSelectedSection } = useSectionStore();

  if (type === "link" && href) {
    return (
      <Link
        className={clsx(menuLinkClass, {
          "text-white bg-zinc-700/20 hover:bg-zinc-600/20 rounded-md":
            selectedSection.title === title,
          "text-zinc-400": selectedSection.title !== title,
        })}
        href={href}
        onClick={onClick}
      >
        <Icon className="w-5 h-5" />
        <p>{title}</p>
      </Link>
    );
  }
  return (
    <button
      className={`${menuLinkClass} text-zinc-400`}
      onClick={onClick}
      type="button"
    >
      <Icon className="w-5 h-5" />
      <p>{title}</p>
    </button>
  );
}
