import React, { useState } from 'react'
import './style.scss'

import PropTypes from 'prop-types'
import { Close } from 'icons'

function Modal(props) {
	const [isOpen, changeOpened] = useState(true)

	console.log(props)

	return (
		<dialog className={`modal ${isOpen && 'modal--active'}`}>
			<div className="modal__content">
				<h2>{props.title}</h2>
				<div className="modal__main">{props.children}</div>
				{props.footer && (
					<footer>
						<button type="button">Подтверждаю</button>
					</footer>
				)}
				<button
					className="modal__close"
					type="button"
					onClick={() => changeOpened(false)}
				>
					<Close />
				</button>
			</div>
		</dialog>
	)
}

Modal.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
}

export default Modal
