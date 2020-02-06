import Actions from './types'

export const reducers = (state = {}, action) => {
	switch (action.type) {
		case Actions.CHANGE_CITY:
			return {
				...state,
				city: {
					title: action.title,
					coords: action.coords,
				},
			}

		case Actions.CHANGE_MODAL:
			return {
				...state,
				modal: action.name,
			}

		default:
			return state
	}
}
