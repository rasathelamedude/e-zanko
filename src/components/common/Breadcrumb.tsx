import { ChevronRight } from "lucide-react";

const Breadcrumb = () => {
  return (
    <nav
      className="flex items-center gap-1 text-sm mb-1"
      aria-label="Breadcrumb"
    >
      <span className="text-slate-400">College of Engineering</span>
      <ChevronRight size={14} className="text-slate-300" />
      <span className="font-semibold text-teal-700">Software Engineering</span>
    </nav>
  );
};

export default Breadcrumb;
