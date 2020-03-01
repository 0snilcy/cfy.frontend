import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const GET_USER = gql`
	{
		user {
			me {
				email
				name
			}
		}
	}
`

export const Profile = () => {
	const { data, loading, error, networkStatus } = useQuery(GET_USER)

	return (
		<section>
			<h1>Profile page!</h1>
			<div>Error: {error?.message}</div>
			<div>networkStatus: {networkStatus}</div>
			<div>Loading: {loading + ''}</div>
			<div>Data: {JSON.stringify(data?.user?.me)}</div>
		</section>
	)
}
