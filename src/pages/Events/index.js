import React, { Component } from 'react'
import './style.sass'

import Map from 'components/shared/Map'
import Geo from 'services/geo.service'
import { connect } from 'react-redux'
import { getCity } from 'store/selectors'
import PropTypes from 'prop-types'

class EventsPage extends Component {
	async checkGeo(coords) {
		const place = await Geo.getAddresByCoords(coords)
		this.setState({
			place,
		})
	}

	render() {
		return (
			<section className="events">
				<h2>События</h2>
				<Map {...this.props.city.coords} />
			</section>
		)
	}
}

EventsPage.propTypes = {
	city: PropTypes.shape({
		coords: PropTypes.shape({
			lng: PropTypes.number,
			lat: PropTypes.number,
		}),
	}),
}

export default connect(state => ({
	city: getCity(state),
}))(EventsPage)
