"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api/clientApi";

import type { Note } from "@/types/note";
import NoteDetailsClient from "@/app/(private routes)/notes/[id]/NoteDetails.client";

interface NotePreviewModalProps {
  noteId: string;
}

export default function NotePreviewModal({ noteId }: NotePreviewModalProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note, Error>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    staleTime: 1000 * 60,
    retry: 1,
    refetchOnMount: false,
  });

  if (isLoading) return null;
  if (error || !note) return <p>Error loading note</p>;

  return (
    <Modal onClose={() => router.back()}>
      <NoteDetailsClient noteId={note.id} />
    </Modal>
  );
}
