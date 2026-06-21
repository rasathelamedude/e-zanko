interface Props {
  title: string;
  role: string;
  year: string;
}

const DashboardTitle = ({ title, role, year }: Props) => {
  return (
    <header className="mb-8">
      <h2 className="text-sm font-bold text-teal-700 uppercase tracking-wide">
        {title}
      </h2>
      <h1 className="text-3xl font-bold text-slate-900 mt-1">Dashboard</h1>
      <p className="text-sm text-slate-500 mt-1">
        {role} &middot; Academic Year {year}
      </p>
    </header>
  );
};

export default DashboardTitle;
