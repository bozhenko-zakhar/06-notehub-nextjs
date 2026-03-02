import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note'
import css from './NoteList.module.css'
import { deleteNote } from '../../lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface NoteListProps {
	notes: Note[]
}

export default function NoteList({notes}: NoteListProps) {
	const queryClient = useQueryClient();

	const deleteNoteMutation = useMutation({
		mutationFn: async (noteId: string) => {
			const deletedNote: Promise<Note> = deleteNote({currentId: noteId});
			return deletedNote;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notes'] });

			toast.success("Your note was successfuly deleted");
		},
		onError: (error) => {
			toast.error(`${error}`);
		}
	});

	function handleDeleteNote(noteId: string) {
		deleteNoteMutation.mutate(noteId)
	}

  return (
    <ul className={css.list}>
			{
				notes.map(note => (
					<li className={css.listItem} key={note.id}>
						<h2 className={css.title}>{note.title}</h2>
						<p className={css.content}>{note.content}</p>
						<div className={css.footer}>
							<span className={css.tag}>{note.tag}</span>
							<Link className={css.link} href={`/notes/${note.id}`}>View details</Link>
							<button onClick={() => handleDeleteNote(note.id)} className={css.button}>Delete</button> 
						</div>
					</li>
				))
			}
		</ul>
  )
}