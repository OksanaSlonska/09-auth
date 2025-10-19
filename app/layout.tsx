import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.css";
import { Metadata } from "next";
import { Roboto, Padauk } from "next/font/google";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--roboto-font",
  subsets: ["latin"],
  display: "swap",
});

const padauk = Padauk({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--padauk-font",
});

export const metadata: Metadata = {
  title: "NoteHub – Easy Note Taking and Management",
  description: "Create, edit, and filter notes online with NoteHub.",
  openGraph: {
    title: "NoteHub – Easy Note Taking and Management",
    description: "Create, edit, and filter notes online with NoteHub.",
    url: "https://08-zustand-sand-pi.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview image",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${padauk.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
