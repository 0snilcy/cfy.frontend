import React from 'react'

export function Modal(props) {
	return (
		<dialog>
			<h2>{props.title}</h2>
			{props.children}
		</dialog>
	)
}
