import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const GET_USER = gql`
	query NavbarGetUser {
		user {
			me {
				name
				email
			}
		}
	}
`

const User = () => {
	const { data } = useQuery(GET_USER)

	const user = data?.user?.me
	if (!user) {
		return <span></span>
	}

	return <div>{user.name || user.email}</div>
}

export default User
