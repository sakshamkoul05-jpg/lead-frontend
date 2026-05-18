import api from "./axios";
import { User } from "../types";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "sales";
}

interface AuthResponse {
  token: string;
  user: User;
}

export const authApi = {
  login: async (payload: LoginPayload) => {
    const res = await api.post<{ success: boolean; data: AuthResponse }>("/auth/login", payload);
    return res.data;
  },

  register: async (payload: RegisterPayload) => {
    const res = await api.post<{ success: boolean; data: AuthResponse }>("/auth/register", payload);
    return res.data;
  },

  getProfile: async () => {
    const res = await api.get<{ success: boolean; data: { user: User } }>("/auth/profile");
    return res.data;
  },
};
