import { ApolloLink } from 'apollo-link'
import { GET_TOKEN } from '../requests/client'

export default cache => {
	return new ApolloLink((operation, forward) => {
		try {
			const { token } = cache.readQuery({
				query: GET_TOKEN,
			})

			if (token) {
				operation.setContext({
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
			}
		} catch (err) {
			console.log(err.message)
		}

		return forward(operation)
	})
}
