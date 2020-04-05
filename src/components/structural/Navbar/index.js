import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './style.sass'
// import { changeCity } from 'helpers/Modals'
import User from 'components/shared/User'
import { useLogout, useAuthState } from 'hooks/auth'

const Navbar = props => {
	const isAuth = useAuthState()
	const logout = useLogout()

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
				{isAuth ? (
					<>
						<User />
						<button onClick={logout}>Logout</button>
					</>
				) : (
					<Link to="/auth">Login</Link>
				)}
				<button
					type="button"
					className="navbar__city"
					// onClick={() => props.changeModal(changeCity.name)}
				>
					{/* {props.city.title} */}
				</button>
			</div>
		</header>
	)
}

Navbar.propTypes = {
	list: PropTypes.arrayOf(PropTypes.string),
}

export default Navbar
