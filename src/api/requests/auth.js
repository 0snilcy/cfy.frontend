import gql from 'graphql-tag'

export const LOGIN = gql`
	mutation LOGIN($email: String!, $password: String!) {
		auth {
			login(email: $email, password: $password) {
				token
				user {
					id
					email
					name
				}
			}
		}
	}
`

export const LOGOUT = gql`
	mutation LOGOUT {
		user {
			logout
		}
	}
`
