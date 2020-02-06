import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './style.scss'
import { connect } from 'react-redux'
import { getCity } from 'store/selectors'
import { changeModal } from 'store/actions'
import { name as modalName } from 'helpers/Modals/changeCity'

class Navbar extends Component {
	render() {
		const routes = this.props.list.map((route, i) => {
			return (
				<li key={i}>
					{route === '/' ? (
						<Link to={route}>Index</Link>
					) : (
						<Link to={route}>{route[0].toUpperCase() + route.slice(1)}</Link>
					)}
				</li>
			)
		})

		return (
			<header className="navbar">
				<div className="navbar__menu">
					<ul>{routes}</ul>
					<button
						type="button"
						className="navbar__city"
						onClick={() => this.props.changeModal(modalName)}
					>
						{this.props.city.title}
					</button>
				</div>
			</header>
		)
	}
}

Navbar.propTypes = {
	list: PropTypes.arrayOf(PropTypes.string),
	city: PropTypes.shape({
		title: PropTypes.string,
	}),
	changeModal: PropTypes.func,
}

const mapStateToProps = state => ({ city: getCity(state) })

export default connect(mapStateToProps, {
	changeModal,
})(Navbar)
