import Link from "next/link";

interface MenuLinkProps {
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref">
  >;
  title: string;
  href: string;
}

export default function MenuLink({ icon: Icon, title, href }: MenuLinkProps) {
  return (
    <Link
      className="flex items-center justify-start gap-2 w-full py-2 text-zinc-500 hover:text-white transition-all duration-300"
      href={href}
    >
      <Icon className="w-5 h-5" />
      <p>{title}</p>
    </Link>
  );
}
