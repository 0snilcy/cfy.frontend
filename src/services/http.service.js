class Http {
	static toQueryString(obj) {
		return Object.keys(obj)
			.map(k => `${k}=${obj[k]}`)
			.join('&')
	}
}

export default Http
