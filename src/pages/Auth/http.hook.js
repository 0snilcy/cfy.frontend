import { useState } from 'react'

export const useHttp = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const request = async (url, method, body = {}, headers = {}) => {
		setLoading(true)
		try {
			if (body) {
				headers['Content-Type'] = 'application/json'
				body = JSON.stringify(body)
			}

			const response = await fetch(url, {
				method,
				body,
				headers,
			})

			const data = await response.json()
			console.log(data.message)

			// logger.add(data.message)
		} catch (err) {
			console.log(err.message)
			// logger.add(err.message)
		}

		setLoading(false)
	}

	const clearError = () => setError(null)

	return {
		loading,
		error,
		request,
		clearError,
	}
}
