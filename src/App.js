import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Auth from 'pages/Auth'
import { Profile } from './pages/Profile'
import Navbar from 'components/structural/Navbar'
import EventsPage from 'pages/Events'
import { changeCity } from 'helpers/Modals'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Logger from 'helpers/Logger'
import PrivateRoute from 'helpers/PrivateRoute'

function App({ modal, logs = [], isAuth }) {
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
			{modal === changeCity.name && <changeCity.component />}
			{!!logs.length && <Logger logs={logs} />}
		</div>
	)
}

App.propTypes = {
	modal: PropTypes.string,
	logs: PropTypes.array,
	isAuth: PropTypes.bool,
}

export default connect(state => ({
	modal: state.modal,
	logs: state.logs,
	isAuth: !!state.isAuth,
}))(App)
