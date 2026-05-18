import { useState } from "react";
import { Plus, Download } from "lucide-react";
import { useLeads } from "../hooks/useLeads";
import { useAuthStore } from "../store/authStore";
import { exportLeadsToCSV } from "../utils/exportCSV";
import StatsCards from "../components/dashboard/StatsCards";
import LeadFiltersBar from "../components/dashboard/LeadFiltersBar";
import LeadsTable from "../components/dashboard/LeadsTable";
import Pagination from "../components/dashboard/Pagination";
import LeadModal from "../components/forms/LeadModal";
import Spinner from "../components/common/Spinner";
import { Lead } from "../types";

const DashboardPage = () => {
  const { user } = useAuthStore();
  const { leads, pagination, filters, loading, error, updateFilter, refetch, deleteLead } =
    useLeads();

  const [modalOpen, setModalOpen] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);

  const openCreateModal = () => {
    setEditLead(null);
    setModalOpen(true);
  };

  const openEditModal = (lead: Lead) => {
    setEditLead(lead);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditLead(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-zinc-100">Leads</h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-0.5">
            Welcome back, {user?.name}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportLeadsToCSV(leads)}
            disabled={leads.length === 0}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Export current page to CSV"
          >
            <Download size={15} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Add Lead</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <StatsCards leads={leads} total={pagination?.total ?? 0} />
      </div>

      {/* Main card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl">
        {/* Filters */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-zinc-800">
          <LeadFiltersBar filters={filters} onFilterChange={updateFilter} />
        </div>

        {/* Table content */}
        <div className="px-5 py-2 min-h-[300px]">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-red-500 font-medium">Failed to load leads</p>
              <p className="text-sm text-slate-400 dark:text-zinc-500 mt-1">{error}</p>
              <button
                onClick={refetch}
                className="mt-4 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Try again
              </button>
            </div>
          ) : (
            <LeadsTable leads={leads} onEdit={openEditModal} onDelete={deleteLead} />
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="px-5 py-4 border-t border-slate-100 dark:border-zinc-800">
            <Pagination
              pagination={pagination}
              onPageChange={(page) => updateFilter({ page })}
            />
          </div>
        )}
      </div>

      {/* Lead modal */}
      <LeadModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSuccess={refetch}
        editLead={editLead}
      />
    </div>
  );
};

export default DashboardPage;
