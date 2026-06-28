interface BreadcrumbItemProps {
  label: string;
  onClick?: () => void;
  isCurrent?: boolean;
}

export function BreadcrumbItem({ label, onClick, isCurrent }: BreadcrumbItemProps) {
  if (isCurrent) {
    return <span className="text-gray-900 font-medium">{label}</span>;
  }

  if (!onClick) return null;

  return (
    <span onClick={onClick} className="cursor-pointer hover:text-teal-700 transition-colors">
      {label}
    </span>
  );
}