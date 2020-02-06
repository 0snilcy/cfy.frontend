import Action from './types'

export const changeModal = name => {
	return {
		type: Action.CHANGE_MODAL,
		name,
	}
}

export const closeModal = () => {
	return {
		type: Action.CHANGE_MODAL,
		name: null,
	}
}

export const changeCity = (coords, title) => {
	return {
		type: Action.CHANGE_CITY,
		coords,
		title,
	}
}
