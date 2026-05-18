export type UserRole = "admin" | "sales";
export type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";
export type LeadSource = "Website" | "Instagram" | "Referral";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LeadFilters {
  search: string;
  status: LeadStatus | "";
  source: LeadSource | "";
  sort: "latest" | "oldest";
  page: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}
