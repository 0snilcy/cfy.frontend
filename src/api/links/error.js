import { onError } from 'apollo-link-error'
import { addLog } from 'components/helpers/Logger'

const errorHandler = onError(error => {
	const { graphQLErrors } = error

	if (graphQLErrors) {
		for (let gqlErr of graphQLErrors) {
		}
	}
})

export default onError(error => {
	const { graphQLErrors, networkError } = error
	console.log(error)

	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, path, extensions }) => {
			console.warn(`GraphQL Error: \nMessage: ${message} \nPath: ${path}`)
			switch (extensions.code) {
				case 'EXPIRED_TOKEN':
					return null // return expiredError(error)

				case 'UNAUTHENTICATED':
					return null // return unauthError(error)

				default:
					console.error(error)
					addLog(message)
			}
		})
	}

	if (networkError) {
		console.error('GraphQL Network Error:', networkError.response)
	}
})
