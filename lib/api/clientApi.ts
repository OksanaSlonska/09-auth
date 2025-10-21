import api from "./api";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";

export type { Note };

export interface CreateNoteDTO {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export const fetchNotes = async (params?: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}) => {
  const res = await api.get("/notes", { params });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await api.get(`/notes/${id}`);
  return res.data as Note;
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}) => {
  const res = await api.post("/notes", data);
  return res.data as Note;
};

export const deleteNote = async (id: string) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};

export const register = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/register", data);
  return res.data as User;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  return res.data as User;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

interface CheckSessionRequest {
  success: boolean;
}

export async function checkSession() {
  const res = await api.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
}

export const getMe = async () => {
  const res = await api.get<User>("/users/me");
  return res.data;
};

export const updateMe = async (data: { username: string }) => {
  const res = await api.patch("/users/me", data);
  return res.data as User;
};
