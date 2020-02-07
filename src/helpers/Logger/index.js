import React from 'react'
import './style.sass'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Close } from 'icons'
import { removeLog } from 'store/actions'

function LoggerItem({ message, onClickRemove, id }) {
	return (
		<li className="logger__item">
			<div className="logger__content">
				<span>{message}</span>
				<button type="button" title="Закрыть" onClick={() => onClickRemove(id)}>
					<Close />
				</button>
			</div>
		</li>
	)
}

function Logger({ logs = [], removeLog }) {
	return (
		<section className="logger">
			<ul className="logger__list">
				{logs.map(log => {
					return <LoggerItem key={log.id} {...log} onClickRemove={removeLog} />
				})}
			</ul>
		</section>
	)
}

Logger.propTypes = {
	logs: PropTypes.arrayOf(LoggerItem),
	removeLog: PropTypes.func,
}

LoggerItem.propTypes = {
	id: PropTypes.string,
	message: PropTypes.string,
	parentId: PropTypes.number,
	onClickRemove: PropTypes.func,
}

export default connect(null, {
	removeLog,
})(Logger)
