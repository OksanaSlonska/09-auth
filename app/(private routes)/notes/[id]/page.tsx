import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import { fetchNoteById } from "@/lib/api/clientApi";

interface NoteDetailsPageProps {
  params: { id: string } | Promise<{ id: string }>;
}

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  return {
    title: `Note: ${note.title} | NoteHub`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title} | NoteHub`,
      description: note.content.slice(0, 100),
      url: `https://08-zustand-sand-pi.vercel.app/notes/${params.id}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: "article",
    },
  };
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = params instanceof Promise ? await params : params;
  return <NoteDetailsClient noteId={id} />;
}
