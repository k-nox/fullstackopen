const LoginForm = ({
	handleSubmit,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password,
}) => {
	return (
		<div>
			<h2>Login</h2>

			<form onSubmit={handleSubmit}>
				<div>
					<label>
						username: <input value={username} onChange={handleUsernameChange} />
					</label>
				</div>
				<div>
					<label>
						password:{' '}
						<input
							type="password"
							value={password}
							onChange={handlePasswordChange}
						/>
					</label>
				</div>
				<div>
					<button type="submit">login</button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
