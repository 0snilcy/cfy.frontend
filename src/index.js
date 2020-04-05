import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import 'scss/style.sass'
import App from './App'
// import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'

import { ApolloProvider } from '@apollo/react-hooks'
import { init as initClient } from 'api'

const AppContainer = () => {
	const [client, setClient] = useState(undefined)
	useEffect(() => {
		const init = async () => {
			const initedClient = await initClient()
			setClient(initedClient)
		}
		init()
	}, [])

	if (!client) return <div>Loading...</div>

	return (
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	)
}

ReactDOM.render(
	<BrowserRouter>
		<AppContainer />
	</BrowserRouter>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
