// "use client";

// import { ReactNode, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { checkSession, getMe } from "@/lib/api/clientApi";
// import { useAuthStore } from "@/lib/store/authStore";
// import Loader from "../Loader/Loader";

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export default function AuthProvider({ children }: AuthProviderProps) {
//   const { setUser, clearIsAuthenticated } = useAuthStore();
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const verifySession = async () => {
//       try {
//         const isAuth = await checkSession();
//         if (isAuth) {
//           const userData = await getMe();
//           if (userData) setUser(userData);
//         } else {
//           clearIsAuthenticated();
//           router.push("/sign-in");
//         }
//       } catch {
//         clearIsAuthenticated();
//         router.push("/sign-in");
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifySession();
//   }, [setUser, clearIsAuthenticated, router]);

//   if (loading) return <Loader />;

//   return <>{children}</>;
// }

"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import Loader from "../Loader/Loader";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getAccessTokenFromCookie = () => {
    const match = document.cookie.match(new RegExp("(^| )accessToken=([^;]+)"));
    return match ? match[2] : null;
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const accessToken = getAccessTokenFromCookie();
        if (!accessToken) throw new Error("No access token");

        const res = await fetch("/api/users/me", {
          headers: {
            Cookie: `accessToken=${accessToken}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const userData = await res.json();
        setUser(userData);
      } catch {
        clearIsAuthenticated();
        router.push("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [setUser, clearIsAuthenticated, router]);

  if (loading) return <Loader />;

  return <>{children}</>;
}
