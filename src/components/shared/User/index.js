import React from 'react'
import { GET_USER } from 'api/requests/query'
import { useQuery } from '@apollo/react-hooks'

const User = () => {
	const { data } = useQuery(GET_USER)
	const user = data?.user?.me

	return user ? <div>{user.name || user.email}</div> : null
}

export default User
