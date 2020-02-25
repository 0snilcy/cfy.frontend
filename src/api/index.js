import { store } from 'store'
import { addLog, setAuth } from 'store/actions'

import gql from 'graphql-tag'
import ApolloClient from 'apollo-boost'

const LOGIN = gql`
	query Login($email: String!, $password: String!) {
		login(data: { email: $email, password: $password }) {
			token
		}
	}
`

const ENDPOINT = {
	Auth: '/auth',
	Api: '/api',
}

class Api {
	constructor() {
		this.client = new ApolloClient({
			uri: ENDPOINT.Api,
			request: operation => {
				console.log(operation.operationName, operation.variables)

				const token = store.getState().isAuth
				if (token) {
					operation.setContext({
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
				}
			},
			onError: error => {
				console.log(error)

				const { networkError, operation, forward } = error
				if (networkError?.statusCode === 401) {
					const { token } = networkError.result
					if (token) {
						store.dispatch(setAuth(token))
						operation.setContext({
							headers: {
								...operation.headers,
								Authorization: `Bearer ${token}`,
							},
						})
						return forward(operation)
					}

					this.logout()
				}
			},
		})
	}

	query = async (query, data, config) => {
		try {
			const response = await this.client.query({
				query,
				variables: data,
				...config,
			})
			return response.data
		} catch (err) {
			if (err.networkError) {
				return store.dispatch(addLog(err.networkError.message))
			}

			err.graphQLErrors.forEach(({ message }) => {
				store.dispatch(addLog(message))
			})
		}
	}

	login = async data => {
		const { login } = await api.query(LOGIN, data, {
			context: {
				uri: ENDPOINT.Auth,
			},
		})
		if (!login?.token) {
			return
		}

		store.dispatch(setAuth(login.token))
	}

	logout = () => {
		store.dispatch(setAuth(false))
		this.client.resetStore()
	}
}

const api = new Api()

export default api
