import React from 'react'
import { GET_USER } from 'api/requests/client'
import { useQuery } from '@apollo/react-hooks'

const User = () => {
	const { data } = useQuery(GET_USER, {
		fetchPolicy: 'cache-only',
	})

	const user = data?.user.me
	if (!user) return null

	return <div>{user.name || user.email}</div>
}

export default User
