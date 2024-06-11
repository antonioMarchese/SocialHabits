export interface SectionProps {
  title: string;
  slug: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref">
  >;
  href: string;
}
