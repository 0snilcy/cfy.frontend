import { store } from 'store'
import { addLog, setAuth } from 'store/actions'

import gql from 'graphql-tag'
import ApolloClient from 'apollo-boost'

const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		auth {
			login(email: $email, password: $password) {
				token
			}
		}
	}
`

class Api {
	constructor() {
		this.client = new ApolloClient({
			uri: '/api',
			request: operation => {
				console.log(operation.operationName, operation.variables)
				console.log(operation)

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

	mutate = async (mutation, data, config) => {
		try {
			const response = await this.client.mutate({
				mutation,
				variables: data,
				...config,
			})
			return response.data
		} catch (err) {
			console.log(err)

			if (err.networkError) {
				return store.dispatch(addLog(err.networkError.message))
			}

			if (err.graphQLErrors) {
				err.graphQLErrors.forEach(({ message }) => {
					store.dispatch(addLog(message))
				})
			}
		}
	}

	login = async data => {
		const response = await api.mutate(LOGIN, data)

		if (response?.auth?.login?.token) {
			store.dispatch(setAuth(response.auth.login.token))
		}
	}

	logout = () => {
		store.dispatch(setAuth(false))
		this.client.resetStore()
	}
}

const api = new Api()

export default api
