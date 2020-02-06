import React, { Component } from 'react'
import './style.scss'

import Map from 'components/shared/Map'
import Geo from 'services/geo.service'

export class EventsPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			map: {
				lng: 50,
				lat: 50,
			},
			place: null,
		}
	}
	componentDidMount() {
		navigator.geolocation.getCurrentPosition(({ coords }) => {
			this.setState({
				map: {
					lng: coords.longitude,
					lat: coords.latitude,
				},
			})

			this.checkGeo(this.state.map)
		}, console.log)
	}

	componentWillUnmount() {}

	async checkGeo(coords) {
		const place = await Geo.getAddresByCoords(coords)
		this.setState({
			place,
		})
	}

	async onChangeLocation({ target }) {
		const { value } = target

		if (value) {
			const city = (await Geo.getCoordsByAddress(target.value)) || {}
			if (city.result.address) {
				const { features } = city.result.address[0]
				this.setState({
					citys: features,
				})
			}
		}
	}

	onChangeLocationCb() {}

	render() {
		return (
			<section className="events">
				<h2>События</h2>
				<input type="text" placeholder="Город" />
				<Map {...this.state.map} />
			</section>
		)
	}
}
