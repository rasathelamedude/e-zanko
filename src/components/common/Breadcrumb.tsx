import { ChevronRight } from "lucide-react";

const Breadcrumb = () => {
  return (
    <nav
      className="flex items-center gap-1 text-sm mb-1"
      aria-label="Breadcrumb"
    >
      <span className="text-muted-foreground">College of Engineering</span>
      <ChevronRight size={14} className="text-muted-foreground" />
      <span className="font-semibold text-teal-700 dark:text-teal-400">Software Engineering</span>
    </nav>
  );
};

export default Breadcrumb;
