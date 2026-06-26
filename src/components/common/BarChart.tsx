import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis } from "recharts";

interface BarDatum {
  label: string;
  value: number;
}

interface Props {
  title: string;
  subtitle?: string;
  data: BarDatum[];
}

const BarChartCard = ({ title, subtitle, data }: Props) => {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <h3 className="font-bold text-slate-800 mb-8">
        {title}{" "}
        {subtitle && (
          <span className="text-slate-400 font-normal">
            &middot; {subtitle}
          </span>
        )}
      </h3>

      <ResponsiveContainer width="100%" height={192}>
        <BarChart
          data={data}
          margin={{ top: 24, right: 0, left: 0, bottom: 0 }}
          barCategoryGap="20%"
        >
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            interval={0}
            tick={{ fill: "#64748b", fontSize: 12 }}
            dy={10}
          />
          <Bar dataKey="value" fill="#14746f" radius={[6, 6, 0, 0]}>
            <LabelList
              dataKey="value"
              position="top"
              style={{ fill: "#0f766e", fontSize: 12, fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;
