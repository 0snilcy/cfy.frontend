import React, { useState } from 'react'
import { useHttp } from './http.hook'

export function Auth() {
	const http = useHttp()
	const [data, setData] = useState({
		email: 'test@test.com',
		password: 12345,
	})

	async function onProfile() {
		try {
			const response = await http.request('/auth/verify', 'POST', {
				...data,
			})
			console.log(response)
		} catch (err) {
			console.log(err)
		}
	}

	async function onSignIn() {
		try {
			const response = await http.request('/auth/signin', 'POST', {
				...data,
			})
			console.log(response)
		} catch (err) {
			console.log(err)
		}
	}

	async function onSignUp() {
		try {
			const response = await http.request('/auth/signup', 'POST', {
				...data,
			})
			console.log(response)
		} catch (err) {
			console.log(err)
		}
	}

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
				<button type="button" onClick={onSignIn}>
					Войти
				</button>
				<button type="button" onClick={onSignUp}>
					Зарегистрироваться
				</button>
				<button type="button" onClick={onProfile}>
					Профиль
				</button>
			</form>
		</section>
	)
}
