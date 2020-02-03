import React, { Component } from 'react'
import './style.scss'

import Map from '../../components/shared/Map'
import Modal from '../../helpers/Modal'
import Geo from '../../services/geo.service'

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

	async checkGeo(coords) {
		const place = await Geo.getAddresByCoords(coords)
		this.setState({
			place,
		})
	}

	async onChangeLocation({ target }) {
		const city = await Geo.getCoordsByAddress(target.value)
		console.log(city)
	}

	render() {
		return (
			<section className="events">
				<h2>События</h2>
				<input type="text" placeholder="Город" />
				<Map {...this.state.map} />
				{this.state.place && (
					<Modal title="Выберете город" footer>
						<div>
							Вы находитесь:&nbsp; <strong>{this.state.place}?</strong>
						</div>
						<div>
							Укажите местоположение
							<input onChange={this.onChangeLocation} type="text" />
						</div>
					</Modal>
				)}
			</section>
		)
	}
}
