import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import Modal from "../common/Modal";
import { leadsApi } from "../../api/leads.api";
import { Lead } from "../../types";
import { LEAD_STATUSES, LEAD_SOURCES } from "../../constants";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]),
  source: z.enum(["Website", "Instagram", "Referral"]),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editLead?: Lead | null;
}

const LeadModal = ({ isOpen, onClose, onSuccess, editLead }: LeadModalProps) => {
  const isEditing = !!editLead;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      status: "New",
      source: "Website",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (editLead) {
      reset({
        name: editLead.name,
        email: editLead.email,
        status: editLead.status,
        source: editLead.source,
      });
    } else {
      reset({ name: "", email: "", status: "New", source: "Website" });
    }
  }, [editLead, reset]);

  const onSubmit = async (data: LeadFormData) => {
    try {
      if (isEditing && editLead) {
        await leadsApi.updateLead(editLead._id, data);
        toast.success("Lead updated");
      } else {
        await leadsApi.createLead(data);
        toast.success("Lead created");
      }
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Something went wrong";
      toast.error(msg);
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

  const labelClass = "block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-1.5";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "Edit Lead" : "Add New Lead"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className={labelClass}>Name</label>
          <input {...register("name")} type="text" placeholder="Jane Smith" className={inputClass} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="jane@company.com"
            className={inputClass}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Status</label>
            <select {...register("status")} className={inputClass}>
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Source</label>
            <select {...register("source")} className={inputClass}>
              {LEAD_SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 text-sm font-medium text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-2.5 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 rounded-lg transition-colors"
          >
            {isSubmitting ? "Saving..." : isEditing ? "Update Lead" : "Add Lead"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LeadModal;
