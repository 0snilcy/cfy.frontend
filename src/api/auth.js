import { client } from './'
import { LOGOUT } from 'api/requests/auth'
import { GET_TOKEN } from 'api/requests/client'

export const logoutOptions = {
	mutation: LOGOUT,
	// refetchQueries: [{ query: GET_AUTH }],
	// awaitRefetchQueries: true,
	update() {
		client.writeQuery({
			query: GET_TOKEN,
			data: { token: null },
		})
	},
	onCompleted: client.resetStore,
}

export const forceLogout = () => {
	client.writeQuery({
		query: GET_TOKEN,
		data: { token: null },
	})
}

export const logout = () => client.mutate(logoutOptions)
