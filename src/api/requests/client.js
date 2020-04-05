import gql from 'graphql-tag'

export const GET_TOKEN = gql`
	query GET_TOKEN {
		token @client
	}
`

export const GET_LOGS = gql`
	query GET_LOGS {
		logs @client
	}
`
