"use client"

import { createPortal } from 'react-dom'
import css from './Modal.module.css'
import { useEffect, type ReactNode } from 'react';

interface ModalProps {
	closeModal: () => void;
	children: ReactNode;
}

export default function Modal({closeModal, children}: ModalProps) {
	function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
		if (event.target === event.currentTarget) {
      closeModal();
    }
	}
	
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
      	closeModal();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [closeModal])

  return createPortal(
		<div
			className={css.backdrop}
			role="dialog"
			aria-modal="true"
			onClick={handleBackdropClick}
		>
			<div className={css.modal}>
				{children}
			</div>
		</div>,
		document.body
	)
}