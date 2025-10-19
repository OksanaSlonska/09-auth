"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes, deleteNote } from "@/lib/api/clientApi";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loader from "@/components/Loader/Loader";
import css from "./Notesclient.module.css";

import type { FetchNotesResponse } from "@/types/note";
import { useAuthStore } from "@/lib/store/authStore";

interface NotesClientProps {
  initialTag: string;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [currentTag, setCurrentTag] = useState(initialTag);

  const qc = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    setCurrentTag(initialTag);
    setPage(1);
  }, [initialTag]);

  const tagParam = currentTag === "All" ? undefined : currentTag;

  const { data, isLoading, error } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", page, debouncedSearch, tagParam],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
        tag: tagParam,
      }),

    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"], exact: false });
    },
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  if (!isAuthenticated) {
    return <Loader />;
  }

  return (
    <div>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <Loader />}

      {error && (
        <ErrorMessage
          message={error.message}
          onRetry={() =>
            qc.invalidateQueries({
              queryKey: ["notes", page, debouncedSearch, tagParam],
            })
          }
        />
      )}

      {notes.length > 0 ? (
        <NoteList notes={notes} onDelete={(id) => deleteMutation.mutate(id)} />
      ) : (
        !isLoading && <p className={css.empty}>No notes found.</p>
      )}
    </div>
  );
}
