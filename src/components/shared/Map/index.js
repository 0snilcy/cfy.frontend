import React from 'react'
import PropTypes from 'prop-types'
import {
	YMaps,
	Map as YMap,
	ZoomControl,
	GeolocationControl,
	SearchControl,
} from 'react-yandex-maps'

import './style.sass'

const Map = ({ lat, lng, zoom }) => {
	return (
		<section className="map">
			<YMaps>
				<YMap
					defaultState={{ center: [lat, lng], zoom, controls: [] }}
					width="100%"
					height="100%"
				>
					<SearchControl />
					<GeolocationControl options={{ float: 'right' }} />
					<ZoomControl options={{ size: 'small' }} />
				</YMap>
			</YMaps>
		</section>
	)
}

Map.propTypes = {
	lat: PropTypes.number,
	lng: PropTypes.number,
	zoom: PropTypes.number,
}

Map.defaultProps = {
	lng: 37.622546,
	lat: 55.753235,
	zoom: 12,
}

export default Map
