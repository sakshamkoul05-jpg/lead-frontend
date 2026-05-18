import { Lead } from "../../types";

interface StatsCardsProps {
  leads: Lead[];
  total: number;
}

const StatsCards = ({ leads, total }: StatsCardsProps) => {
  // Count statuses from current page data (approximate for display)
  const counts = leads.reduce(
    (acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const cards = [
    {
      label: "Total Leads",
      value: total,
      color: "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400",
      dot: "bg-indigo-500",
    },
    {
      label: "New",
      value: counts["New"] || 0,
      color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
      dot: "bg-blue-500",
    },
    {
      label: "Qualified",
      value: counts["Qualified"] || 0,
      color: "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400",
      dot: "bg-green-500",
    },
    {
      label: "Lost",
      value: counts["Lost"] || 0,
      color: "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400",
      dot: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${card.dot}`} />
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">{card.label}</p>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-zinc-100">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
