import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api/serverApi";

type NoteDetailsPageProps = {
  params: { id: string } | Promise<{ id: string }>;
};

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = params instanceof Promise ? await params : params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}
