import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Auth } from './pages/Auth'
import { Profile } from './pages/Profile'
import Navbar from './components/structural/Navbar'
import { EventsPage } from './pages/Events'
import ChangeCityModal from './helpers/Modals/changeCity'
import { connect } from 'react-redux'
import { getModal } from './store/selectors'
import { name as changeCity } from './helpers/Modals/changeCity'
import PropTypes from 'prop-types'

function App({ modal }) {
	return (
		<div className="App">
			<Navbar list={['/', 'auth', 'profile', 'events']} />
			<main>
				<Switch>
					<Route exact path="/">
						<h1>Hello, world!</h1>
					</Route>
					<Route path="/auth" component={Auth} />
					<Route path="/profile" component={Profile} />
					<Route path="/events" component={EventsPage} />
					<Route path="*">404</Route>
				</Switch>
			</main>
			<footer />
			{modal === changeCity && <ChangeCityModal />}
		</div>
	)
}

App.propTypes = {
	modal: PropTypes.string,
}

export default connect(state => ({ modal: getModal(state) }))(App)
