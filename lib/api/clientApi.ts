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

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const checkSession = async () => {
  const res = await api.get("/auth/session");
  return res.data as User | null;
};

export const getMe = async (): Promise<User> => {
  const accessToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="))
    ?.split("=")[1];

  const res = await fetch("/api/users/me", {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
};

export const updateMe = async (data: { username: string }) => {
  const res = await api.patch("/users/me", data);
  return res.data as User;
};
