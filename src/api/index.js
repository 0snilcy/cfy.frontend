// import expiredError from './errors/expired.error'
// import unauthError from './errors/unauth.error'

import {
	ApolloClient,
	InMemoryCache,
	HttpLink,
	ApolloLink,
	from,
	gql,
} from '@apollo/client'

import { onError } from 'apollo-link-error'
import { GET_TOKEN } from './requests/client'
import schema from './schema'
import { addLog } from 'components/helpers/Logger'

const cache = new InMemoryCache()

const writeInitialStore = () => {
	cache.writeQuery({
		query: gql`
			query {
				token
				logs
			}
		`,
		data: {
			token: null,
			logs: [],
		},
	})
}

writeInitialStore()

const errorHandler = onError(error => {
	const { graphQLErrors } = error

	if (graphQLErrors) {
		for (let gqlErr of graphQLErrors) {
			switch (gqlErr.extensions.code) {
				case 'EXPIRED_TOKEN':
					return null // return expiredError(error)

				case 'UNAUTHENTICATED':
					return null // return unauthError(error)

				default:
					console.error(error)
			}
		}
	}
})

const errorLink = onError(error => {
	const { graphQLErrors, networkError } = error

	if (graphQLErrors) {
		graphQLErrors.map(({ message, path }) => {
			console.warn(`GraphQL Error: \nMessage: ${message} \nPath: ${path}`)
			return addLog(message)
		})
	}

	if (networkError) {
		console.error('GraphQL Network Error:', networkError.response)
	}
})

const logger = new ApolloLink((operation, forward) => {
	console.log(
		'ApolloRequst Start > ',
		operation.operationName,
		operation.variables
	)
	return forward(operation)
})

const auth = new ApolloLink((operation, forward) => {
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

const httpLink = new HttpLink({
	uri: '/api',
})

const client = new ApolloClient({
	cache,
	link: from([errorLink, logger, auth, httpLink]),
	connectToDevTools: true,
	schema,
})

client.onResetStore(writeInitialStore)

export default client
