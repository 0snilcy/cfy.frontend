import Http from 'services/http.service'
import { store } from 'store/index'
import { addLog } from 'store/actions'

const PointType = {
	Place: 'place',
	Suburb: 'suburb',
}

class Geo {
	getCitiesFromRespons(response) {
		const { result } = response

		const { address } = result
		if (!address) return

		const { features } = address[0]
		if (!features.length) return

		const cities = features
			.filter(({ properties }) =>
				[PointType.Place, PointType.Suburb].includes(properties.type)
			)
			.map(({ properties, geometry }) => {
				const addressArr = properties.address_components

				return {
					type: properties.type,
					title: addressArr.map(({ value }) => value).join(', '),
					shortTitle: addressArr[addressArr.length - 1].value,
					coords: {
						lng: geometry.geometries[0].coordinates[0],
						lat: geometry.geometries[0].coordinates[1],
					},
				}
			})

		return cities
	}

	async getAddresByCoords({ lng, lat }) {
		const params = Http.toQueryString({
			lat,
			lon: lng,
		})
		const response = await fetch(
			'http://whatsthere.maps.sputnik.ru/point?' + params,
			{
				method: 'GET',
			}
		)

		if (response.ok) {
			const data = await response.json()
			return data.result.address[0].features[0].properties.display_name
		} else {
			store.dispatch(addLog(response.statusText))
			console.log(response.status, response.statusText)
		}
	}

	async getCoordsByAddress(q) {
		if (!q) return

		const params = Http.toQueryString({
			q,
		})

		const response = await fetch(
			'http://search.maps.sputnik.ru/search/addr?' + params,
			{
				method: 'GET',
			}
		)

		const data = await response.json()
		return this.getCitiesFromRespons(data)
	}
}

const geo = new Geo()

export default geo
