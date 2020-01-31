import { useState, useContext } from 'react'
import { LoggerContext } from 'providers/logger'

export const useHttp = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const logger = useContext(LoggerContext)

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
			logger.add(data.message)
		} catch (err) {
			logger.add(err.message)
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
