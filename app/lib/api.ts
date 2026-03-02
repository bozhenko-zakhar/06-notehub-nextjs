import axios from "axios";
import type { Note, NoteTag } from "../types/note";

interface FetchNotesResponse {
	notes: Note[];
	totalPages: number
}

interface FetchNoteParams {
	currentId: string
}

interface FetchNotesParams {
	currentPage: number;
	searchText: string
}

interface CreateNoteParams {
	title: string;
	content: string | null;
	tag: NoteTag
}

interface DeleteNoteParams {
	currentId: string
}

export async function fetchNotes({currentPage, searchText}: FetchNotesParams): Promise<FetchNotesResponse> {
	const response = await axios.get<FetchNotesResponse>("https://notehub-public.goit.study/api/notes/", {
		params: {
			search: searchText || "",
			page: currentPage,
			perPage: 12
		},
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
		}
	});


	return response.data;
}

export async function fetchNoteById({currentId}: FetchNoteParams): Promise<Note> {
	const response = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${currentId}`, {
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
		}
	});

	return response.data;
}

export async function createNote({title, content, tag}: CreateNoteParams): Promise<Note> {
	const newNoteL: CreateNoteParams = {
		title: title,
		content: content,
		tag: tag
	}

	const response = await axios.post<Note>("https://notehub-public.goit.study/api/notes/", newNoteL, {
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
		}
	});

	return response.data
}

export async function deleteNote({currentId}: DeleteNoteParams): Promise<Note> {
	const response = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${currentId}`, {
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
		}
	});

	return response.data
}