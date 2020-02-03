import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Auth } from './pages/Auth'
import { Profile } from './pages/Profile'
import { Navbar } from './components/structural/Navbar'
import { Logger } from './helpers/Logger'
import { LoggerProvider } from './providers/logger'
import { EventsPage } from './pages/Events'

function App() {
	return (
		<LoggerProvider>
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

				<Logger />
			</div>
		</LoggerProvider>
	)
}

export default App
