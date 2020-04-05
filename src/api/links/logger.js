import { ApolloLink } from 'apollo-link'

export default new ApolloLink((operation, forward) => {
	console.log('ApolloRequst ▶️', operation.operationName, operation.variables)
	return forward(operation)
})
