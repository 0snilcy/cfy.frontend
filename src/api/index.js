import ApolloClient from 'apollo-boost'
import { store } from 'store'
import { addLog, setAuth } from 'store/actions'
import gql from 'graphql-tag'

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
			headers: {
				Authorization: `Bearer ${store.getState().isAuth}`,
			},
			request(operation) {
				console.log('Operation ' + operation.operationName, operation.variables)
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
	}
}

const api = new Api()

export default api
