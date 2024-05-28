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
  "flex items-center justify-start gap-2 w-full py-2 text-zinc-500 hover:text-white transition-all duration-300";

export default function MenuLink({
  icon: Icon,
  title,
  href,
  onClick,
  type = "link",
}: MenuLinkProps) {
  if (type === "link" && href) {
    return (
      <Link className={menuLinkClass} href={href}>
        <Icon className="w-5 h-5" />
        <p>{title}</p>
      </Link>
    );
  }
  return (
    <button className={menuLinkClass} onClick={onClick} type="button">
      <Icon className="w-5 h-5" />
      <p>{title}</p>
    </button>
  );
}
