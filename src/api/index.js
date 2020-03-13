import { store } from 'store'
import expiredError from './expired.error'
import unauthError from './unauth.error'

import { ApolloClient, gql } from '@apollo/client'

const LOGOUT = gql`
	mutation Logout {
		user {
			logout
		}
	}
`

class Api {
	constructor() {
		this.client = new ApolloClient({
			uri: '/api',
			request: operation => {
				console.log(
					'ApolloRequst > ',
					operation.operationName,
					operation.variables
				)

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
				const { graphQLErrors } = error

				if (graphQLErrors) {
					for (let gqlErr of graphQLErrors) {
						switch (gqlErr.extensions.code) {
							case 'EXPIRED_TOKEN':
								return expiredError.call(this, error)

							case 'UNAUTHENTICATED':
								return unauthError.call(this, error)

							default:
								console.error(error)
						}
					}
				}

				throw error
			},
		})
	}
}

const client = new ApolloClient({})

export default client
