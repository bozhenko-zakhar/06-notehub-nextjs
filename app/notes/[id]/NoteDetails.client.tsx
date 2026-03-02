"use client"

import { useParams } from "next/navigation"

import css from "./NoteDetails.client.module.css"
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

const NoteDetailsClient = () => {
	const { id } = useParams<{id: string}>();
	const { data: note, isLoading, isFetched, isSuccess, error, } = useQuery({
		queryKey: ['note', id],
		queryFn: () => fetchNoteById({currentId: id}),
		refetchOnMount: false
	})

	return (
		<div className={css.container}>

			{ isFetched && isSuccess && (
			<div className={css.item}>
				<div className={css.header}>
					<h2>{note?.title}</h2>
				</div>
					<p className={css.tag}>{note?.tag}</p>
				<p className={css.content}>{note?.content}</p>
				<p className={css.date}>{note?.createdAt}</p>
			</div>
			)}
			
			{ isLoading && (
				<p>Loading, please wait...</p>
			)}

			{ error && (
				<p>Something went wrong.</p>
			)}
		
		</div>
	)
}

export default NoteDetailsClient