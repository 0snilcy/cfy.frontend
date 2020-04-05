import { onError } from 'apollo-link-error'
import { client } from '../index'
import { forceLogout } from '../auth'
import { GET_TOKEN } from 'api/requests/client'

// import { addLog } from 'components/helpers/Logger'

export default onError(error => {
	const { graphQLErrors, networkError, operation, forward } = error
	console.log(error)

	for (const {
		message,
		extensions: { code, token },
	} of graphQLErrors) {
		console.error(`GraphQL Error: ${message}, ${code}`)
		switch (code) {
			case 'EXPIRED_TOKEN':
				client.writeQuery({
					query: GET_TOKEN,
					data: { token },
				})
				operation.setContext({
					headers: {
						...operation.getContext().headers,
						Authorization: `Bearer ${token}`,
					},
				})
				return forward(operation)

			case 'UNAUTHENTICATED':
				forceLogout()
				break

			default:
				console.warn(`GraphQL Error: \nMessage: ${message}`)
			// addLog(message)
		}
	}

	if (networkError) {
		console.error('GraphQL Network Error:', networkError.response)
	}
})
