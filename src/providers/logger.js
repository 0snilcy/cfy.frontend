import React, { Component } from 'react'
import { Logger } from 'helpers/Logger'
import uuid from 'uuid/v4'
import PropTypes from 'prop-types'

export const LoggerContext = React.createContext({})

export class LoggerProvider extends Component {
	constructor(props) {
		super(props)

		this.state = {
			messages: [{ message: 'Hello, world!', id: uuid() }],
		}
	}

	getLog = id => this.state.messages.find(log => log.id === id)

	remove = id => {
		this.setState({
			messages: this.state.messages.filter(item => item.id !== id),
		})
	}

	clear = () =>
		this.setState({
			messages: [],
		})

	add = text => {
		const id = uuid()
		this.setState({
			messages: [
				...this.state.messages,
				{
					message: text,
					id,
					readed: false,
				},
			],
		})

		// setTimeout(() => this.remove(id), 500)
	}

	render() {
		return (
			<LoggerContext.Provider
				value={{
					add: this.add,
				}}
			>
				{this.props.children}
				<Logger logs={this.state.messages} callback={this.remove} />
			</LoggerContext.Provider>
		)
	}
}

LoggerProvider.propTypes = {
	children: PropTypes.node,
}
