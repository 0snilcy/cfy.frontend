const key = 'appStore'

export const getLocalState = () => {
	const store = localStorage.getItem(key)

	if (store) {
		try {
			return JSON.parse(store)
		} catch (err) {
			console.log(err.message)
		}
	}
}

export const setLocalState = state => {
	localStorage.setItem(key, JSON.stringify(state))
}
