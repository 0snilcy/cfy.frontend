import { ApolloLink } from 'apollo-link'

export default new ApolloLink((operation, forward) => {
	console.log(
		'ApolloRequst Start > ',
		operation.operationName,
		operation.variables
	)
	return forward(operation)
})
