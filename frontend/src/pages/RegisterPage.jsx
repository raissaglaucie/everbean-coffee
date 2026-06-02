import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { register } from '../redux/slices/userSlice';

function RegisterPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { userInfo, loading, error } = useSelector((state) => state.user);
	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) navigate(redirect);
	}, [userInfo, redirect, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			setMessage('');
			dispatch(register({ name, email, password }));
		}
	};

	const inputStyle = {
		width: '100%',
		padding: '0.8rem',
		borderRadius: '8px',
		border: '1px solid var(--latte)',
		fontSize: '1rem',
		fontFamily: 'Lato, sans-serif',
		marginBottom: '1rem',
		color: 'var(--espresso)',
	};

	const labelStyle = {
		display: 'block',
		color: 'var(--coffee)',
		marginBottom: '0.3rem',
		fontWeight: '700',
	};

	return (
		<div
			style={{
				maxWidth: '400px',
				margin: '4rem auto',
				padding: '2rem',
				backgroundColor: 'white',
				borderRadius: '16px',
				boxShadow: '0 4px 20px rgba(28,10,0,0.1)',
			}}
		>
			<h1
				style={{
					fontFamily: 'Playfair Display, serif',
					color: 'var(--espresso)',
					marginBottom: '2rem',
					textAlign: 'center',
				}}
			>
				☕ Create Account
			</h1>

			{message && (
				<p
					style={{
						color: 'red',
						backgroundColor: '#fff0f0',
						padding: '0.8rem',
						borderRadius: '8px',
						marginBottom: '1rem',
					}}
				>
					{message}
				</p>
			)}

			{error && (
				<p
					style={{
						color: 'red',
						backgroundColor: '#fff0f0',
						padding: '0.8rem',
						borderRadius: '8px',
						marginBottom: '1rem',
					}}
				>
					{error.detail || 'Registration failed'}
				</p>
			)}

			<form onSubmit={submitHandler}>
				<label style={labelStyle}>Name</label>
				<input
					type='text'
					placeholder='Your name'
					value={name}
					onChange={(e) => setName(e.target.value)}
					style={inputStyle}
					required
				/>

				<label style={labelStyle}>Email</label>
				<input
					type='email'
					placeholder='your@email.com'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					style={inputStyle}
					required
				/>

				<label style={labelStyle}>Password</label>
				<input
					type='password'
					placeholder='••••••••'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					style={inputStyle}
					required
				/>

				<label style={labelStyle}>Confirm Password</label>
				<input
					type='password'
					placeholder='••••••••'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					style={inputStyle}
					required
				/>

				<button
					type='submit'
					disabled={loading}
					style={{
						width: '100%',
						padding: '0.9rem',
						backgroundColor: 'var(--espresso)',
						color: 'var(--cream)',
						border: 'none',
						borderRadius: '8px',
						fontSize: '1rem',
						cursor: 'pointer',
						fontFamily: 'Lato, sans-serif',
						letterSpacing: '1px',
						marginTop: '0.5rem',
					}}
				>
					{loading ? 'Creating account...' : 'Create Account'}
				</button>
			</form>

			<p
				style={{
					textAlign: 'center',
					marginTop: '1.5rem',
					color: 'var(--coffee)',
				}}
			>
				Already have an account?{' '}
				<Link
					to={redirect ? `/login?redirect=${redirect}` : '/login'}
					style={{ color: 'var(--accent-gold)', fontWeight: '700' }}
				>
					Sign in
				</Link>
			</p>
		</div>
	);
}

export default RegisterPage;
