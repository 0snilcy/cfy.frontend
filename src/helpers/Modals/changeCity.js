import React, { useState } from 'react'
import Modal from '../Modal'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCity } from 'store/selectors'
import { closeModal, changeCity } from 'store/actions'
import Geo from 'services/geo.service'
import { debounce } from 'utils'

export const name = 'changeCity'

const getLocationData = debounce(Geo.getCoordsByAddress, 300, Geo)

function ChangeCityModal(props) {
	const [cities, setCities] = useState([])

	const onInputChangeLocation = async ({ target }) => {
		if (!target.value) {
			return setCities([])
		}

		const data = await getLocationData(target.value)

		if (data) {
			setCities(data)
		}
	}

	const { city } = props
	return (
		<Modal title="Выберете город">
			{city && (
				<div>
					Вы находитесь:&nbsp; <strong>{city.title}?</strong>
				</div>
			)}
			<div>
				<label>
					Укажите местоположение
					<input onChange={onInputChangeLocation} type="text" autoFocus />
				</label>
				<ul>
					{cities.map((city, id) => (
						<li key={id}>
							<a
								href="#0"
								onClick={evt => {
									console.log('click')

									evt.preventDefault()
									props.changeCity(city.coords, city.shortTitle)
									props.closeModal()
								}}
							>
								{city.title}
								{city.type === 'suburb' && ' (пригород)'}
							</a>
						</li>
					))}
				</ul>
			</div>
		</Modal>
	)
}

ChangeCityModal.propTypes = {
	city: PropTypes.shape({
		title: PropTypes.string,
		type: PropTypes.string,
		shortTitle: PropTypes.string,
		coords: PropTypes.shape({
			lng: PropTypes.number,
			lon: PropTypes.number,
		}),
	}),
	changeCity: PropTypes.func,
	closeModal: PropTypes.func,
}

const mapStateToProps = state => ({ city: getCity(state) })

export default connect(mapStateToProps, {
	closeModal,
	changeCity,
})(ChangeCityModal)
