import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { leadsApi } from "../api/leads.api";
import { Lead } from "../types";
import Badge from "../components/common/Badge";
import Spinner from "../components/common/Spinner";
import LeadModal from "../components/forms/LeadModal";

const LeadDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const fetchLead = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await leadsApi.getLead(id);
      if (res.success && res.data) {
        setLead(res.data.lead);
      }
    } catch {
      setError("Lead not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLead();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full py-32">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 font-medium">{error || "Lead not found"}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-sm text-indigo-600 hover:underline"
        >
          Back to dashboard
        </button>
      </div>
    );
  }

  const fields = [
    { label: "Full Name", value: lead.name },
    { label: "Email Address", value: lead.email },
    {
      label: "Status",
      value: <Badge value={lead.status} type="status" />,
    },
    {
      label: "Source",
      value: <Badge value={lead.source} type="source" />,
    },
    {
      label: "Created By",
      value: lead.createdBy?.name || "—",
    },
    {
      label: "Created At",
      value: new Date(lead.createdAt).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    {
      label: "Last Updated",
      value: new Date(lead.updatedAt).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Back + header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to leads
        </button>

        <button
          onClick={() => setEditOpen(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
        >
          <Pencil size={14} />
          Edit Lead
        </button>
      </div>

      {/* Detail card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl">
        <div className="px-6 py-5 border-b border-slate-100 dark:border-zinc-800">
          <h1 className="text-lg font-bold text-slate-900 dark:text-zinc-100">{lead.name}</h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-0.5">{lead.email}</p>
        </div>

        <dl className="divide-y divide-slate-100 dark:divide-zinc-800">
          {fields.map((field) => (
            <div key={field.label} className="flex items-center px-6 py-4">
              <dt className="w-36 text-sm font-medium text-slate-500 dark:text-zinc-400 flex-shrink-0">
                {field.label}
              </dt>
              <dd className="text-sm text-slate-800 dark:text-zinc-200">{field.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <LeadModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        onSuccess={() => {
          setEditOpen(false);
          fetchLead();
        }}
        editLead={lead}
      />
    </div>
  );
};

export default LeadDetailPage;
