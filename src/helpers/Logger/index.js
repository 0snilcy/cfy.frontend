import React, { useState, useEffect } from 'react'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const onReadHandler = (setState, id, remove) => {
	setState(true)
	setTimeout(() => remove(id), 300)
}

function LoggerItem({ log, id, remove }) {
	const classList = ['logger__item']
	const isVisible = id < 7
	let timer

	if (isVisible) {
		classList.push('logger__item--visible')
	}

	const [readed, setReaded] = useState(false)

	if (isVisible && !readed) {
		timer = setTimeout(() => {
			setReaded(true)
			setTimeout(() => remove(log.id), 300)
		}, 3000)
	}

	// componentWillUnmount
	useEffect(() => () => clearTimeout(timer), [])

	return (
		<li
			className={
				`logger__item ` +
				(isVisible ? ' logger__item--visible' : '') +
				(readed ? ' logger__item--readed' : '')
			}
			disabled={log.readed}
		>
			<div className="logger__content">
				<span>{log.message}</span>
				<button
					type="button"
					onClick={onReadHandler.bind(null, setReaded, log.id, remove)}
				>
					<FontAwesomeIcon icon="times" />
				</button>
			</div>
			{readed && (
				<div className="logger__content logger__content--hide">
					<span>{log.message}</span>
					<button type="button" disabled>
						<FontAwesomeIcon icon="times" />
					</button>
				</div>
			)}
		</li>
	)
}

export function Logger({ logs = [], callback }) {
	if (logs.length > 0) {
		return (
			<section className="logger">
				<ul className="logger__list">
					{logs.map((log, id) => {
						return (
							<LoggerItem key={log.id} id={id} log={log} remove={callback} />
						)
					})}
				</ul>
			</section>
		)
	}

	return <div></div>
}
