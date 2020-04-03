import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { useQuery } from '@apollo/react-hooks'
import { GET_TOKEN } from 'api/requests/client'

const PrivateRoute = ({ children, ...rest }) => {
	const { data } = useQuery(GET_TOKEN)
	const isAuth = !!data?.token

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
}

export default PrivateRoute
