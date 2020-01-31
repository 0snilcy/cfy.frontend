import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Navbar extends Component {
	render() {
		const routes = this.props.list.map((route, i) => {
			return (
				<li key={i}>
					<Link to={route}>{route[0].toUpperCase() + route.slice(1)}</Link>
				</li>
			)
		})

		return (
			<header className="navbar">
				<h1>Navbar Page!</h1>
				<ul>{routes}</ul>
			</header>
		)
	}
}
