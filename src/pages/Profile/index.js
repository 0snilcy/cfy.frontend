import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const GET_USER = gql`
	query getProfile {
		profile {
			email
			name
		}
	}
`

export const Profile = () => {
	const { data, loading, error } = useQuery(GET_USER)

	return (
		<section>
			<h1>Profile page!</h1>
			<div>Error: {error?.message}</div>
			<div>Data: {data}</div>
		</section>
	)
}
