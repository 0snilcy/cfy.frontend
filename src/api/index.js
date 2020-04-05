import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { from } from 'apollo-link'
import { persistCache } from 'apollo-cache-persist'

import { resolvers } from './schema'
import auth from './links/auth'
import error from './links/error'
import logger from './links/logger'

const cache = new InMemoryCache()
const cacheKey = 'apollo-cache'

const writeInitialStore = () => {
	cache.writeData({
		data: {
			token: null,
			logs: [],
			user: {
				__typename: 'UserQueryType',
			},
		},
	})
}

const httpLink = new HttpLink({
	uri: '/api',
})

export const client = new ApolloClient({
	cache,
	link: from([logger, error, auth(cache), httpLink]),
	resolvers,
	// connectToDevTools: true,
	defaultOptions: {
		mutate: {
			// errorPolicy: 'ignore',
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
			console.error(err)
		}
	} else {
		writeInitialStore()
	}

	return client
}
