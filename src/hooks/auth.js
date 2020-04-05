import { useMutation, useQuery } from '@apollo/react-hooks'
import { logoutOptions } from 'api/auth'
import { LOGOUT } from 'api/requests/auth'
import { GET_TOKEN } from 'api/requests/client'

export const useLogout = () => {
	const [logout] = useMutation(LOGOUT, logoutOptions)
	return logout
}

export const useAuthState = () => {
	const {
		data: { token },
	} = useQuery(GET_TOKEN)
	return !!token
}
