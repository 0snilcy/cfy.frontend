import Http from 'services/http.service'
import { store } from 'store/index'
import { addLog } from 'store/actions'
import { GeoResponse } from './response.model'
import { PointType, Coordinate } from './geo.model'

const http = new Http('geo')

class Geo {
	getCitiesFromRespons(response: GeoResponse) {
		const { result } = response

		const { address } = result
		if (!address) return

		const { features } = address[0]
		if (!features.length) return

		const cities = features
			.filter(({ properties }: any) =>
				[PointType.Place, PointType.Suburb].includes(properties.type)
			)
			.map(({ properties, geometry }: any) => {
				const addressArr = properties.address_components

				return {
					type: properties.type,
					title: addressArr.map(({ value }: any) => value).join(', '),
					shortTitle: addressArr[addressArr.length - 1].value,
					coords: {
						lng: geometry.geometries[0].coordinates[0],
						lat: geometry.geometries[0].coordinates[1],
					},
				}
			})

		return cities
	}

	async getAddresByCoords({ lng, lat }: Coordinate) {
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
			const data: GeoResponse = await response.json()
			return data.result.address[0].features[0].properties.display_name
		} else {
			store.dispatch(addLog(response.statusText))
			console.log(response.status, response.statusText)
		}
	}

	async getCoordsByAddress(q: string) {
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

		const data: GeoResponse = await response.json()
		return this.getCitiesFromRespons(data)
	}
}

const geo = new Geo()

export default geo
