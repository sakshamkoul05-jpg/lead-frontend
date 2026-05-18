import api from "./axios";
import { Lead, LeadFilters, PaginationMeta } from "../types";

interface LeadsResponse {
  leads: Lead[];
  pagination: PaginationMeta;
}

interface CreateLeadPayload {
  name: string;
  email: string;
  status?: string;
  source: string;
}

interface UpdateLeadPayload {
  name?: string;
  email?: string;
  status?: string;
  source?: string;
}

export const leadsApi = {
  getLeads: async (filters: Partial<LeadFilters>) => {
    const params: Record<string, string | number> = {};

    if (filters.page) params.page = filters.page;
    if (filters.status) params.status = filters.status;
    if (filters.source) params.source = filters.source;
    if (filters.search) params.search = filters.search;
    if (filters.sort) params.sort = filters.sort;

    const res = await api.get<{ success: boolean; data: LeadsResponse }>("/leads", { params });
    return res.data;
  },

  getLead: async (id: string) => {
    const res = await api.get<{ success: boolean; data: { lead: Lead } }>(`/leads/${id}`);
    return res.data;
  },

  createLead: async (payload: CreateLeadPayload) => {
    const res = await api.post<{ success: boolean; data: { lead: Lead }; message: string }>(
      "/leads",
      payload
    );
    return res.data;
  },

  updateLead: async (id: string, payload: UpdateLeadPayload) => {
    const res = await api.put<{ success: boolean; data: { lead: Lead }; message: string }>(
      `/leads/${id}`,
      payload
    );
    return res.data;
  },

  deleteLead: async (id: string) => {
    const res = await api.delete<{ success: boolean; message: string }>(`/leads/${id}`);
    return res.data;
  },
};
