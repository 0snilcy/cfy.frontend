// import { GET_TOKEN } from './requests/client'

// import gql from 'graphql-tag'
// export const typeDefs = gql``

export const resolvers = {
	Query: {
		logs() {
			console.log('logs resolver')
		},
		token() {
			console.log('logs resolver')
		},
	},
}
