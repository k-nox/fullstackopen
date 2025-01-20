export const Login = ({
	username,
	onUsernameChange,
	password,
	onPasswordChange,
	onSubmit,
}) => {
	return (
		<form onSubmit={onSubmit}>
			<div>
				<label>
					Username:{' '}
					<input type="text" value={username} onChange={onUsernameChange} />
				</label>
			</div>
			<div>
				<label>
					Password:{' '}
					<input type="password" value={password} onChange={onPasswordChange} />
				</label>
			</div>
			<button type="submit">Login</button>
		</form>
	)
}
