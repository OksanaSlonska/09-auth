import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
  onDelete?: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDelete }) => {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (!notes || notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={css.viewLink}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => {
                if (onDelete) {
                  onDelete(note.id);
                } else {
                  deleteNoteMutation.mutate(note.id);
                }
              }}
              disabled={deleteNoteMutation.isPending}
            >
              {deleteNoteMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
