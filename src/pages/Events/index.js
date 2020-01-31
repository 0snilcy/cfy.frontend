import React, { Component } from 'react'
import DG from '2gis-maps'

import './style.scss'

export class EventsPage extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		// this.initMap()
	}

	initMap() {
		const map = DG.map('map', {
			zoom: 13,
			center: [55.75122, 37.617509],
		})
	}

	render() {
		return (
			<section className="events">
				<h2>События</h2>
				<input type="text" placeholder="Город" />
				<div className="events__map" id="map"></div>
			</section>
		)
	}
}
