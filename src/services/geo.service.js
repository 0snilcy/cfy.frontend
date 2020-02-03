import Http from './http.service'

class Geo {
	static async getAddresByCoords({ lng, lat }) {
		const params = Http.toQueryString({
			lat,
			lon: lng,
		})
		const data = await fetch(
			'http://whatsthere.maps.sputnik.ru/point?' + params,
			{
				method: 'GET',
			}
		)

		const response = await data.json()

		return response.result.address[0].features[0].properties.display_name
	}

	static async getCoordsByAddress(q) {
		const params = Http.toQueryString({
			q,
		})
		const data = await fetch(
			'http://search.maps.sputnik.ru/search/addr?' + params,
			{
				method: 'GET',
			}
		)

		const response = await data.json()
		return response
		return response.result.address[0].features[0].properties.display_name
	}
}

export default Geo
