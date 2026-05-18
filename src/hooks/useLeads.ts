import { useState, useEffect, useCallback } from "react";
import { leadsApi } from "../api/leads.api";
import { Lead, LeadFilters, PaginationMeta } from "../types";
import toast from "react-hot-toast";

const defaultFilters: LeadFilters = {
  search: "",
  status: "",
  source: "",
  sort: "latest",
  page: 1,
};

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [filters, setFilters] = useState<LeadFilters>(defaultFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await leadsApi.getLeads(filters);
      if (res.success && res.data) {
        setLeads(res.data.leads);
        setPagination(res.data.pagination);
      }
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to fetch leads";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateFilter = (updates: Partial<LeadFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...updates,
      // Reset to page 1 when filters change (except when changing page)
      page: updates.page !== undefined ? updates.page : 1,
    }));
  };

  const deleteLead = async (id: string) => {
    try {
      await leadsApi.deleteLead(id);
      toast.success("Lead deleted");
      fetchLeads();
    } catch {
      toast.error("Failed to delete lead");
    }
  };

  return {
    leads,
    pagination,
    filters,
    loading,
    error,
    updateFilter,
    refetch: fetchLeads,
    deleteLead,
  };
};
