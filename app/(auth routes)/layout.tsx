"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh(); // обновляем данные при монтировании
  }, [router]);

  return <>{children}</>;
}
