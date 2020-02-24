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

		case Actions.ADD_LOG:
			return {
				...state,
				logs: [
					...state.logs,
					{
						message: action.message,
						id: action.id,
					},
				],
			}

		case Actions.REMOVE_LOG:
			return {
				...state,
				logs: state.logs.filter(({ id }) => id !== action.id),
			}

		case Actions.SET_AUTH:
			return {
				...state,
				isAuth: action.token,
			}

		default:
			return state
	}
}
