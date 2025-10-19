import { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/clientApi";

// Тип для тегов
type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

interface Props {
  params: { slug?: string[] } | Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const filter = resolvedParams.slug?.join("/") ?? "All";

  return {
    title: `Filter: ${filter} | NoteHub`,
    description: `View notes filtered by "${filter}" in NoteHub.`,
    openGraph: {
      title: `Filter: ${filter} | NoteHub`,
      description: `View notes filtered by "${filter}" in NoteHub.`,
      url: `https://08-zustand-sand-pi.vercel.app/notes/filter/${filter}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const resolvedParams = await params;
  const tagFromUrl = resolvedParams.slug?.[0];

  const tag: Tag | "All" =
    tagFromUrl && tagFromUrl !== "All" ? (tagFromUrl as Tag) : "All";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "", tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}

// "use client"; // отключаем SSR для этой страницы, чтобы запросы шли в браузере

// import NotesClient from "./Notes.client";
// import { use } from "react";
// import { Metadata } from "next";

// Тип для тегов
// type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

// interface NotesPageProps {
//   params: Promise<{ slug?: string[] }>;
// }

// export async function generateMetadata({
//   params,
// }: NotesPageProps): Promise<Metadata> {
//   const filter = params.slug?.join("/") ?? "All";

//   return {
//     title: `Filter: ${filter} | NoteHub`,
//     description: `View notes filtered by "${filter}" in NoteHub.`,
//     openGraph: {
//       title: `Filter: ${filter} | NoteHub`,
//       description: `View notes filtered by "${filter}" in NoteHub.`,
//       url: `https://08-zustand-sand-pi.vercel.app/notes/filter/${filter}`,
//       images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
//     },
//   };
// }

// export default function NotesPage({ params }: NotesPageProps) {
//   const resolvedParams = use(params); // unwrap
//   const tagFromUrl = resolvedParams.slug?.[0];
//   const tag: Tag | "All" =
//     tagFromUrl && tagFromUrl !== "All" ? (tagFromUrl as Tag) : "All";

//   return <NotesClient initialTag={tag} />;
// }
// import { use } from "react";
// import NotesClient from "./Notes.client";

// export default function NotesPage({
//   params,
// }: {
//   params: Promise<{ slug?: string[] }>;
// }) {
//   const resolvedParams = use(params);
//   const tagFromUrl = resolvedParams.slug?.[0];
//   const tag: Tag | "All" =
//     tagFromUrl && tagFromUrl !== "All" ? (tagFromUrl as Tag) : "All";

//   return <NotesClient initialTag={tag} />;
// }

// "use client";

// import { use } from "react";
// import NotesClient from "./Notes.client";
// import { Metadata } from "next";

// // Тип для тегов
// type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

// interface NotesPageProps {
//   params: Promise<{ slug?: string[] }>;
// }

// export async function generateMetadata({
//   params,
// }: NotesPageProps): Promise<Metadata> {
//   const resolvedParams = await params;
//   const filter = resolvedParams.slug?.join("/") ?? "All";

//   return {
//     title: `Filter: ${filter} | NoteHub`,
//     description: `View notes filtered by "${filter}" in NoteHub.`,
//     openGraph: {
//       title: `Filter: ${filter} | NoteHub`,
//       description: `View notes filtered by "${filter}" in NoteHub.`,
//       url: `https://08-zustand-sand-pi.vercel.app/notes/filter/${filter}`,
//       images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
//     },
//   };
// }

// export default function NotesPage({ params }: NotesPageProps) {
//   const resolvedParams = use(params); // <--- разворачиваем Promise
//   const tagFromUrl = resolvedParams.slug?.[0];

//   const tag: Tag | "All" =
//     tagFromUrl && tagFromUrl !== "All" ? (tagFromUrl as Tag) : "All";

//   return <NotesClient initialTag={tag} />;
// }
