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

export const GET_AUTH = gql`
	query GET_AUTH {
		isAuth @client
	}
`

export const GET_USER = gql`
	query GET_USER {
		user {
			me {
				email
				name
				id
			}
		}
	}
`
