import { Lead } from "../types";

export const exportLeadsToCSV = (leads: Lead[]) => {
  const headers = ["Name", "Email", "Status", "Source", "Created At"];

  const rows = leads.map((lead) => [
    lead.name,
    lead.email,
    lead.status,
    lead.source,
    new Date(lead.createdAt).toLocaleDateString(),
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
  link.click();

  URL.revokeObjectURL(url);
};
