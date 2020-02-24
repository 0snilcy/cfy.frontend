import React, { useState } from 'react'
import api from 'api'
import { useHistory, useLocation } from 'react-router-dom'

const Auth = () => {
	const [data, setData] = useState({
		email: '0.snilcy@gmail.com',
		password: 'test',
	})

	const location = useLocation()
	const history = useHistory()

	const onInput = ({ target }) => {
		setData({
			...data,
			[target.name]: target.value,
		})
	}

	return (
		<section>
			<h2>Авторизация</h2>
			<form>
				<div>
					<label>
						Почта
						<input
							type="email"
							name="email"
							autoComplete="username"
							onChange={onInput}
							value={data.email}
							required
						/>
					</label>
				</div>
				<div>
					<label>
						Пароль
						<input
							type="password"
							name="password"
							autoComplete="current-password"
							onChange={onInput}
							value={data.password}
							required
						/>
					</label>
				</div>
				<button
					type="button"
					onClick={async () => {
						await api.login(data)
						let { from } = location.state || { from: { pathname: '/' } }
						history.replace(from)
					}}
				>
					Войти
				</button>
				<button type="button" onClick={console.log}>
					Зарегистрироваться
				</button>
				<button type="button" onClick={console.log}>
					Профиль
				</button>
			</form>
		</section>
	)
}

export default Auth
