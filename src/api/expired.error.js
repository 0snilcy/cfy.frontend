import { store } from 'store'
import { setAuth } from 'store/actions'

export default function(error) {
	console.warn('EXPIRED_TOKEN', error)
	const { graphQLErrors, operation, forward } = error

	const tokenErr = graphQLErrors.find(
		gqlErr => gqlErr.extensions.code === 'EXPIRED_TOKEN'
	)

	const contextToken = operation
		.getContext()
		?.headers?.Authorization.split(' ')[1]

	const storeToken = store.getState().isAuth
	const { token: newToken } = tokenErr.extensions
	const hasUpdatedToken = contextToken !== storeToken

	operation.setContext({
		headers: {
			...operation.headers,
			Authorization: `Bearer ${hasUpdatedToken ? storeToken : newToken}`,
		},
	})

	if (!hasUpdatedToken) {
		store.dispatch(setAuth(newToken))
	}

	return forward(operation)
}
