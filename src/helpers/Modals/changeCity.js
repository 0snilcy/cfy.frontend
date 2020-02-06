import React from 'react'
import Modal from '../Modal'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCity } from 'store/selectors'
import { changeModal } from 'store/actions'

export const name = 'changeCity'

const onInputChangeLocation = ({ target }) => {
	console.log(target.value)
}

const onChangeLocation = data => {
	console.log(data)
}

function ChangeCityModal(props) {
	const { city } = props
	return (
		<Modal title="Выберете город" footerCallback={onChangeLocation}>
			{city && (
				<div>
					Вы находитесь:&nbsp; <strong>{city.title}?</strong>
				</div>
			)}
			<div>
				<label>
					Укажите местоположение
					<input onChange={onInputChangeLocation} type="text" list="citys" />
				</label>
				{false && (
					<datalist id="citys">
						{this.state.citys.map((el, id) => {
							const { description, display_name } = el.properties

							return (
								<option
									key={id}
									value={`${description}, ${display_name}`}
								></option>
							)
						})}
					</datalist>
				)}
			</div>
		</Modal>
	)
}

ChangeCityModal.propTypes = {
	city: PropTypes.shape({
		title: PropTypes.string,
	}),
}

const mapStateToProps = state => ({ city: getCity(state) })

export default connect(mapStateToProps, {
	changeModal,
})(ChangeCityModal)
