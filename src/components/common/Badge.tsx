import { STATUS_COLORS, SOURCE_COLORS } from "../../constants";

interface BadgeProps {
  value: string;
  type: "status" | "source";
}

const Badge = ({ value, type }: BadgeProps) => {
  const colorMap = type === "status" ? STATUS_COLORS : SOURCE_COLORS;
  const className = colorMap[value] || "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400";

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {value}
    </span>
  );
};

export default Badge;
