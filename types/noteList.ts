import { Note } from "@/types/note";

export interface NoteListProps {
  notes: Note[];
  onDelete?: (id: string) => void;
}
