import Http from './http.service'

class Geo {
	static async getAddresByCoords(lat, lon) {
		const params = Http.toQueryString({
			lat,
			lon,
		})
		const data = await fetch(
			'http://whatsthere.maps.sputnik.ru/point?' + params,
			{
				method: 'GET',
			}
		)

		return await data.json()
	}
}

export default Geo
