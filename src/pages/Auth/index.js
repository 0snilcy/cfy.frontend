import React, { useState } from 'react'
// import api from 'api'
import { useHistory, useLocation } from 'react-router-dom'
import { withApollo, useMutation } from 'react-apollo'
import gql from 'graphql-tag'

const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		auth {
			login(email: $email, password: $password) {
				token
			}
		}
	}
`

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
		update(cache, { data }) {
			cache.writeData({
				data: {
					token: data.auth.login.token,
				},
			})
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
						return
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

export default withApollo(Auth)
