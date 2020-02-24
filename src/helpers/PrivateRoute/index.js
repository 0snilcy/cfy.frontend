import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const PrivateRoute = ({ children, isAuth, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuth ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/auth',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	)
}

PrivateRoute.propTypes = {
	children: PropTypes.element,
	isAuth: PropTypes.bool,
}

export default connect(state => ({
	isAuth: !!state.isAuth,
}))(PrivateRoute)
