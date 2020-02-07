import { createStore } from 'redux'
import { reducers } from './reducers'

export const store = createStore(
	reducers,
	{
		logs: [],
		modal: null,
		city: {
			title: 'Adler',
			coords: {
				lat: 50.1,
				lng: 50.1,
			},
		},
	},
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
