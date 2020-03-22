export default function(error) {
	console.error('UNAUTHENTICATED', error)
	const { operation, forward } = error

	// const token = store.getState().isAuth
	const contextToken = operation
		.getContext()
		.headers?.Authorization?.split(' ')[1]

	if (token) {
		if (token !== contextToken) {
			store.dispatch(setAuth(token))
			operation.setContext({
				headers: {
					...operation.headers,
					Authorization: `Bearer ${token}`,
				},
			})
			return forward(operation)
		} else {
			this.logout()
		}
	}
}
