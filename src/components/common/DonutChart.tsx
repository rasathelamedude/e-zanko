import { useTranslation } from "react-i18next";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface Props {
  title: string;
  segments: DonutSegment[];
}

const DonutChartCard = ({ title, segments }: Props) => {
  const { t } = useTranslation();
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col">
      <h3 className="font-bold text-slate-800 mb-8">{title}</h3>

      <div className="flex items-center justify-between flex-1">
        <div className="relative w-32 h-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={segments}
                dataKey="value"
                nameKey="label"
                innerRadius={50}
                outerRadius={64}
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {segments.map((s) => (
                  <Cell key={s.label} fill={s.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold text-slate-800 leading-none">
              {total}
            </span>
            <span className="text-xs text-slate-500 mt-1">{t("total")}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 ms-6 w-full">
          {segments.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: s.color }}
                ></span>
                <span className="text-slate-600">{s.label}</span>
              </div>
              <span className="font-bold">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChartCard;
