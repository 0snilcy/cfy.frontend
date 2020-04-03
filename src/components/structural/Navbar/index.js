import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import './style.sass'
// import { changeCity } from 'helpers/Modals'
import User from 'components/shared/User'

import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { LOGOUT } from 'api/requests/auth'

const Navbar = props => {
	const client = useApolloClient()
	const history = useHistory()

	const [logout] = useMutation(LOGOUT, {
		update(
			cache,
			{
				data: {
					user: { logout },
				},
			}
		) {
			if (logout) {
				client.resetStore()
				history.replace({
					pathname: '/',
				})
			}
		},
	})

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
	isAuth: PropTypes.bool,
}

export default Navbar
