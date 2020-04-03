import { ApolloLink } from 'apollo-link'
import { GET_TOKEN } from '../requests/client'

export default cache => {
	return new ApolloLink((operation, forward) => {
		try {
			const data = cache.readQuery({
				query: GET_TOKEN,
			})

			if (data?.token) {
				operation.setContext({
					headers: {
						Authorization: `Bearer ${data.token}`,
					},
				})
			}
		} catch (err) {
			console.log(err.message)
		}

		return forward(operation)
	})
}
