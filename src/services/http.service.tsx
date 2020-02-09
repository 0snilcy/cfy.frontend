const join = (...args: string[]): string => args.join('/')

class Http {
	route: string

	constructor(route = '') {
		this.route = route
	}

	static toQueryString(obj: any): string {
		return Object.keys(obj)
			.map(k => `${k}=${obj[k]}`)
			.join('&')
	}

	async sendRequest(route: string, options: RequestInit) {
		let response
		try {
			response = await fetch(join(this.route, route), {
				...options,
			})

			if (response.ok && response.bodyUsed) {
				const fromResponse = await response.json()
				return fromResponse
			}
		} catch (err) {
			console.log(err.message)
		}

		return response?.status
	}

	async post(route: string, body: any) {
		if (!body) return

		return await this.sendRequest(route, {
			method: 'POST',
			headers: {
				['Content-Type']: 'application/json',
			},
			body,
		})
	}

	async get(route: string) {
		return await this.sendRequest(route, {
			method: 'GET',
		})
	}
}

export default Http
