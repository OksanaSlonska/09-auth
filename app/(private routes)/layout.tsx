"use client";

import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { ReactNode } from "react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
