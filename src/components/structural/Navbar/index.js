import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './style.sass'
import { connect } from 'react-redux'
import { changeModal } from 'store/actions'
import { changeCity } from 'helpers/Modals'
import api from 'api'
import User from 'components/shared/User'

const Navbar = props => {
	const routes = list =>
		list
			.filter(el => el)
			.map((route, i) => {
				return (
					<li key={i}>
						{route === 'index' ? (
							<Link to="/">Index</Link>
						) : (
							<Link to={'/' + route}>
								{route[0].toUpperCase() + route.slice(1)}
							</Link>
						)}
					</li>
				)
			})

	return (
		<header className="navbar">
			<div className="navbar__menu">
				<ul className="navbar__list">{routes(props.list)}</ul>

				{props.isAuth ? (
					<>
						<User name email />
						<Link to="/" onClick={api.logout}>
							Logout
						</Link>
					</>
				) : (
					<Link to="/auth">Login</Link>
				)}
				<button
					type="button"
					className="navbar__city"
					onClick={() => props.changeModal(changeCity.name)}
				>
					{props.city.title}
				</button>
			</div>
		</header>
	)
}

Navbar.propTypes = {
	list: PropTypes.arrayOf(PropTypes.string),
	city: PropTypes.shape({
		title: PropTypes.string,
	}),
	isAuth: PropTypes.bool,
	changeModal: PropTypes.func,
}

const mapStateToProps = state => ({
	city: state.city,
	isAuth: !!state.isAuth,
})

export default connect(mapStateToProps, {
	changeModal,
})(Navbar)
