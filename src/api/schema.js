import gql from 'graphql-tag'

export const typeDefs = gql`
	extend type Query {
		isAuth: Boolean!
	}
`

export const resolvers = {
	Query: {
		isAuth() {
			console.log('isauth', arguments)
		},
	},
}
