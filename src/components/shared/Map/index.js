import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { YMaps, Map as YMap } from 'react-yandex-maps'
import classNames from 'classnames'
import './style.sass'
import Loader from 'components/helpers/Loader'

const setZoom = (map, zoom) =>
	map.setZoom(map.getZoom() + zoom, {
		duration: 200,
	})

const Map = ({ lat, lng, zoom }) => {
	const [isLoad, setLoadState] = useState(true)
	let map

	return (
		<section
			className={classNames('map', {
				'map--load': isLoad,
			})}
		>
			{isLoad && <Loader />}
			<YMaps>
				<YMap
					onLoad={() => setLoadState(false)}
					defaultState={{ center: [lat, lng], zoom, controls: [] }}
					width="100%"
					height="100%"
					instanceRef={ref => {
						if (ref) map = ref
					}}
				></YMap>
			</YMaps>
			<div className="map__panel">
				<button onClick={() => setZoom(map, 1)}>Zoom in</button>
				<button onClick={() => setZoom(map, -1)}>Zoom out</button>
			</div>
		</section>
	)
}

Map.propTypes = {
	lat: PropTypes.number,
	lng: PropTypes.number,
	zoom: PropTypes.number,
}

Map.defaultProps = {
	lng: 37.62249357,
	lat: 55.75322293,
	zoom: 12,
}

export default Map
