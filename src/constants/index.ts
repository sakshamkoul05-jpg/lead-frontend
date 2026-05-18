export const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Lost"] as const;
export const LEAD_SOURCES = ["Website", "Instagram", "Referral"] as const;

export const STATUS_COLORS: Record<string, string> = {
  New: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Contacted: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Qualified: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Lost: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export const SOURCE_COLORS: Record<string, string> = {
  Website: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  Instagram: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  Referral: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
};
