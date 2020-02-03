import React from 'react'
import PropTypes from 'prop-types'
import DG from '2gis-maps'

import './style.css'

class Map extends React.Component {
	map = null
	mapRef = React.createRef()

	componentDidUpdate() {
		this.map.panTo([this.props.lat, this.props.lng])
	}

	componentDidMount() {
		this.map = DG.map(this.mapRef.current, {
			zoom: 10,
		})
	}

	render() {
		return <div ref={this.mapRef} className="map"></div>
	}
}

Map.propTypes = {
	lat: PropTypes.number,
	lng: PropTypes.number,
}

export default Map
