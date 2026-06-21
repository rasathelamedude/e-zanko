interface Props {
  label: string;
  value: string | number;
  highlight?: boolean;
}

const StatCard = ({ label, value, highlight = false }: Props) => {
  if (highlight) {
    return (
      <div className="bg-[#14746f] rounded-xl p-6 border border-[#14746f] shadow-sm flex flex-col justify-between h-32">
        <span className="text-sm font-medium text-teal-50">{label}</span>
        <span className="text-4xl font-bold text-white">{value}</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between h-32">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className="text-4xl font-bold text-slate-900">{value}</span>
    </div>
  );
};

export default StatCard;
