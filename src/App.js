import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Auth from 'pages/Auth'
import { Profile } from 'pages/Profile'
import Navbar from 'components/structural/Navbar'
import EventsPage from 'pages/Events'
// import { changeCity } from 'helpers/Modals'
import Logger from 'components/helpers/Logger'
import PrivateRoute from 'components/helpers/PrivateRoute'

// import useAuthState from 'hooks/isauth'

function App() {
	const isAuth = false

	return (
		<div className="App">
			<Navbar list={['index', 'events', 'profile']} />
			<main>
				<Switch>
					<Route exact path="/">
						<h1>Hello, world!</h1>
					</Route>

					<Route path="/auth">{isAuth ? <Redirect to="/" /> : <Auth />}</Route>
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
