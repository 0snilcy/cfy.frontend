import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Auth from 'pages/Auth'
import { Profile } from 'pages/Profile'
import Navbar from 'components/structural/Navbar'
import EventsPage from 'pages/Events'
// import { changeCity } from 'helpers/Modals'
import Logger from 'components/helpers/Logger'
import PrivateRoute from 'components/helpers/PrivateRoute'

import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { GET_AUTH } from 'api/requests/client'

function App() {
	const client = useApolloClient()
	const {
		data: { isAuth },
	} = useQuery(GET_AUTH)
	console.log(isAuth)
	console.log(
		client.readQuery({
			query: GET_AUTH,
		})
	)

	return (
		<div className="App">
			<Navbar list={['index', 'events', 'profile']} isAuth={isAuth} />
			<main>
				<Switch>
					<Route exact path="/">
						<h1>Hello, world!</h1>
					</Route>
					<Route path="/auth">{isAuth ? <Redirect to="/" /> : <Auth />}</Route>
					<Route path="/auth">
						<Auth />
					</Route>
					<Route path="/events" component={EventsPage} />

					<PrivateRoute path="/profile">
						<Profile />
					</PrivateRoute>

					<Route path="*">404</Route>
				</Switch>
			</main>
			<footer />
			{/* {modal === changeCity.name && <changeCity.component />} */}
			<Logger />
		</div>
	)
}

export default App
