import { cookies } from "next/headers";
import api from "./api";
import type { User } from "@/types/user";

export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  tag?: string;
}) => {
  const cookieHeader = (await cookies()).toString();

  const res = await api.get("/notes", {
    params,
    headers: { Cookie: cookieHeader },
  });

  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const cookieHeader = (await cookies()).toString();

  const res = await api.get(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });

  return res.data;
};

export const getMe = async () => {
  const cookieHeader = (await cookies()).toString();
  const res = await api.get("/users/me", {
    headers: { Cookie: cookieHeader },
  });
  return res.data as User;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};
