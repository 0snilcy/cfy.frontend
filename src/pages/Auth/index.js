import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { GET_TOKEN, GET_USER } from 'api/requests/client'
import { LOGIN } from 'api/requests/auth'

const Auth = () => {
	const [user, setUser] = useState({
		email: '0.snilcy@gmail.com',
		password: 'test',
	})

	const location = useLocation()
	const history = useHistory()

	const onInput = ({ target }) => {
		setUser({
			...user,
			[target.name]: target.value,
		})
	}

	const [login] = useMutation(LOGIN, {
		onError: () => ({}),
		update(cache, { data }) {
			data = data.auth.login

			if (!data) return

			cache.writeQuery({
				query: GET_TOKEN,
				data: {
					token: data.token,
				},
			})

			cache.writeQuery({
				query: GET_USER,
				data: {
					user: { me: data.user },
				},
			})

			let { from } = location.state || { from: { pathname: '/' } }
			history.replace(from)
		},
	})

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
							value={user.email}
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
							value={user.password}
							required
						/>
					</label>
				</div>
				<button
					type="button"
					onClick={() => {
						login({
							variables: user,
						})
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
