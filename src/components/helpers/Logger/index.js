import React from 'react'
import './style.sass'
import PropTypes from 'prop-types'
import { Close } from 'icons'

import { useQuery } from '@apollo/react-hooks'
import { GET_LOGS } from 'api/requests/client'
import { client } from 'api'
import uuid from 'uuid/v4'

export const addLog = message => {
	const { logs } = client.readQuery({ query: GET_LOGS })
	client.writeQuery({
		query: GET_LOGS,
		data: {
			logs: [
				...logs,
				{
					id: uuid(),
					message,
				},
			],
		},
	})
}

const onClickRemove = logId => {
	const { logs } = client.readQuery({ query: GET_LOGS })
	client.writeQuery({
		query: GET_LOGS,
		data: {
			logs: logs.filter(({ id }) => id !== logId),
		},
	})
}

const LoggerItem = ({ message, id }) => {
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

const Logger = () => {
	const {
		data: { logs },
	} = useQuery(GET_LOGS)

	return (
		<section className="logger">
			<ul className="logger__list">
				{logs.map(log => (
					<LoggerItem key={log.id} {...log} />
				))}
			</ul>
		</section>
	)
}

LoggerItem.propTypes = {
	id: PropTypes.string,
	message: PropTypes.string,
	parentId: PropTypes.number,
	onClickRemove: PropTypes.func,
}

export default Logger
