import { createStore } from 'redux'
import { reducers } from './reducers'
import { setLocalState, getLocalState } from './localStorage'
import { debounce } from 'utils/index'

export const store = createStore(
	reducers,
	getLocalState() || {
		logs: [],
		modal: null,
		city: {
			title: 'Москва',
			coords: {
				lat: 55.751343,
				lng: 37.617726,
			},
		},
	},
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(debounce(() => setLocalState(store.getState()), 500))
