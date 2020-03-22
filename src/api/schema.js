import { GraphQLObjectType, GraphQLString } from 'graphql'

const schema = {
	query: new GraphQLObjectType({
		name: 'RootQuery',
		fields: {
			test: {
				type: GraphQLString,
				resolve() {
					console.log(arguments)

					return true
				},
			},
		},
	}),
}

export default schema
