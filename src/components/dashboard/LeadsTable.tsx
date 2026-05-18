import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import Badge from "../common/Badge";
import ConfirmDialog from "../common/ConfirmDialog";
import { Lead } from "../../types";
import { useAuthStore } from "../../store/authStore";

interface LeadsTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
}

const LeadsTable = ({ leads, onEdit, onDelete }: LeadsTableProps) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await onDelete(deleteTarget);
    setDeleting(false);
    setDeleteTarget(null);
  };

  const canDelete = (lead: Lead) => {
    return user?.role === "admin" || lead.createdBy?._id === user?._id;
  };

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
          <span className="text-2xl">📋</span>
        </div>
        <p className="font-medium text-slate-700 dark:text-zinc-300">No leads found</p>
        <p className="text-sm text-slate-400 dark:text-zinc-500 mt-1">
          Try adjusting your filters or add a new lead
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-zinc-800">
              <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-zinc-400">
                Name
              </th>
              <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-zinc-400">
                Email
              </th>
              <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-zinc-400">
                Status
              </th>
              <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-zinc-400">
                Source
              </th>
              <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-zinc-400">
                Created
              </th>
              <th className="py-3 px-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <td className="py-3 px-4">
                  <span className="font-medium text-slate-800 dark:text-zinc-200">{lead.name}</span>
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-zinc-400">{lead.email}</td>
                <td className="py-3 px-4">
                  <Badge value={lead.status} type="status" />
                </td>
                <td className="py-3 px-4">
                  <Badge value={lead.source} type="source" />
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-zinc-500">
                  {new Date(lead.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 justify-end">
                    <button
                      onClick={() => navigate(`/leads/${lead._id}`)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                      title="View details"
                    >
                      <ExternalLink size={15} />
                    </button>
                    <button
                      onClick={() => onEdit(lead)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                      title="Edit"
                    >
                      <Pencil size={15} />
                    </button>
                    {canDelete(lead) && (
                      <button
                        onClick={() => setDeleteTarget(lead._id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {leads.map((lead) => (
          <div
            key={lead._id}
            className="bg-slate-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-slate-200 dark:border-zinc-800"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-slate-800 dark:text-zinc-200">{lead.name}</p>
                <p className="text-sm text-slate-500 dark:text-zinc-400">{lead.email}</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => onEdit(lead)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-zinc-700 transition-colors"
                >
                  <Pencil size={14} />
                </button>
                {canDelete(lead) && (
                  <button
                    onClick={() => setDeleteTarget(lead._id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white dark:hover:bg-zinc-700 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge value={lead.status} type="status" />
              <Badge value={lead.source} type="source" />
            </div>
            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-2">
              {new Date(lead.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Lead"
        message="Are you sure you want to delete this lead? This action cannot be undone."
        loading={deleting}
      />
    </>
  );
};

export default LeadsTable;
