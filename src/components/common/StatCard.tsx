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
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm flex flex-col justify-between h-32">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-4xl font-bold text-foreground">{value}</span>
    </div>
  );
};

export default StatCard;
