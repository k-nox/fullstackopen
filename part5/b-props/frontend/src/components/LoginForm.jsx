import { useState } from 'react';

const LoginForm = ({ login }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		login({
			username,
			password,
		});

		setUsername('');
		setPassword('');
	};
	return (
		<div>
			<h2>Login</h2>

			<form onSubmit={handleSubmit}>
				<div>
					<label>
						username:{' '}
						<input
							value={username}
							onChange={({ target }) => setUsername(target.value)}
						/>
					</label>
				</div>
				<div>
					<label>
						password:{' '}
						<input
							type="password"
							value={password}
							onChange={({ target }) => setPassword(target.value)}
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
