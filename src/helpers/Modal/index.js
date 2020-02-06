import React from 'react'
import './style.scss'

import PropTypes from 'prop-types'
import { Close } from 'icons'
import { connect } from 'react-redux'
import { closeModal } from 'store/actions'

function Modal(props) {
	return (
		<dialog className="modal">
			<div className="modal__content">
				<h2>{props.title}</h2>
				<div className="modal__main">{props.children}</div>
				{props.footerCallback && (
					<footer>
						<button
							type="button"
							onClick={() => {
								props.footerCallback()
								props.closeModal()
							}}
						>
							Подтверждаю
						</button>
					</footer>
				)}
				<button
					className="modal__close"
					type="button"
					onClick={props.closeModal}
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
	footerCallback: PropTypes.func,
	closeModal: PropTypes.func,
}

export default connect(null, {
	closeModal,
})(Modal)
