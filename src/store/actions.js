import Action from './types'
import uuid from 'uuid/v4'

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

export const addLog = message => {
	return {
		type: Action.ADD_LOG,
		message,
		id: uuid(),
	}
}

export const removeLog = id => {
	return {
		type: Action.REMOVE_LOG,
		id,
	}
}

export const setAuth = token => {
	return {
		type: Action.SET_AUTH,
		token,
	}
}
