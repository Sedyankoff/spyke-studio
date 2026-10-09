import { brandIcons, type BrandIconId } from "@/components/ui/brand-icons";

interface TechIconProps {
  id: BrandIconId;
  className?: string;
  colored?: boolean;
}

export function TechIcon({ id, className, colored = false }: TechIconProps) {
  const icon = brandIcons[id];

  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      className={className}
      fill={colored ? icon.hex : "currentColor"}
    >
      <path d={icon.path} />
    </svg>
  );
}
