import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '../lib/api';
import NotesClient from './Notes.client';

export default async function Notes() {

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['notes', "", 1], // searchQuery, currentPage
		queryFn: () => fetchNotes({currentPage: 1, searchText: "" }),
	})

  return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<NotesClient />
		</HydrationBoundary>
  )
}