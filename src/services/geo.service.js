import Http from './http.service'
import { addLog } from 'store/actions'
import { store } from 'store'

class Geo {
	nrmalizeResponce(response) {
		// response.result?.address[0]?.features[0]?.properties.display_name
		const { result } = response

		const { address } = result
		if (!address) return

		const { features } = address[0]
		if (!features.length) return

		const cities = features.map(({ properties, geometry }) => {
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
		let responce = await fetch(
			'http://whatsthere.maps.sputnik.ru/point?' + params,
			{
				method: 'GET',
			}
		)

		if (responce.ok) {
			responce = await responce.json()
			return responce.result.address[0].features[0].properties.display_name
		} else {
			store.dispatch(addLog(responce.statusText))
			console.log(responce.status, responce.statusText)
		}
	}

	async getCoordsByAddress(q) {
		if (!q) return

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
		return this.nrmalizeResponce(response)
	}
}

const geo = new Geo()

export default geo
