import gql from 'graphql-tag'

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
