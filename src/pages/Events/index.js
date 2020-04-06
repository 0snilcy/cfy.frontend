import React from 'react'
import './style.sass'

import Map from 'components/shared/Map'
import Geo from 'services/geo.service'
import PropTypes from 'prop-types'

// class EventsPage extends Component {
// 	async checkGeo(coords) {
// 		const place = await Geo.getAddresByCoords(coords)
// 		this.setState({
// 			place,
// 		})
// 	}
// }

const EventsPage = () => {
	return (
		<section className="events">
			<Map />
		</section>
	)
}

EventsPage.propTypes = {}

export default EventsPage
