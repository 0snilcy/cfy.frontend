// import expiredError from './errors/expired.error'
// import unauthError from './errors/unauth.error'

import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { from } from 'apollo-link'
import { persistCache } from 'apollo-cache-persist'

import { typeDefs, resolvers } from './schema'

import auth from './links/auth'
import error from './links/error'
import logger from './links/logger'

const cache = new InMemoryCache()
const cacheKey = 'apollo-cache'

const writeInitialStore = () => {
	cache.writeQuery({
		query: gql`
			query {
				token
				isAuth
				logs
			}
		`,
		data: {
			token: null,
			isAuth: false,
			logs: [],
		},
	})
}

const httpLink = new HttpLink({
	uri: '/api',
})

export const client = new ApolloClient({
	cache,
	link: from([logger, error, auth(cache), httpLink]),
	// connectToDevTools: true,
	// typeDefs,
	resolvers,
	defaultOptions: {
		mutate: {
			errorPolicy: 'ignore',
		},
	},
})

client.onResetStore(writeInitialStore)

export const init = async () => {
	await persistCache({
		cache,
		storage: window.localStorage,
		// debug: true,
		debounce: 300,
		key: cacheKey,
	})

	let store = localStorage.getItem(cacheKey)
	if (store) {
		try {
			store = JSON.parse(store)
			if (!Object.keys(store).length) {
				writeInitialStore()
			}
		} catch (err) {
			console.log(err)
		}
	}

	return client
}
