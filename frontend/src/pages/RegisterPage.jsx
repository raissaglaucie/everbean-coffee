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
		padding: '1rem 0',
		border: 'none',
		borderBottom: '1px solid var(--latte)',
		backgroundColor: 'transparent',
		fontSize: '1rem',
		fontFamily: 'Montserrat',
		color: 'var(--espresso)',
		outline: 'none',
		transition: 'border-color 0.2s',
	};

	const labelStyle = {
		display: 'block',
		color: 'var(--coffee)',
		fontSize: '0.6rem',
		letterSpacing: '3px',
		textTransform: 'uppercase',
		fontFamily: 'Montserrat',
		fontWeight: '600',
		marginBottom: '0.8rem',
	};

	return (
		<div
			style={{
				minHeight: '100vh',
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
			}}
		>
			{/* Left — Image */}
			<div
				style={{
					position: 'relative',
					overflow: 'hidden',
					minHeight: '100vh',
				}}
			>
				<img
					src='https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=1200&q=85'
					alt='Coffee'
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						opacity: 0.5,
					}}
				/>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background:
							'linear-gradient(to right, rgba(13,7,5,0.3) 0%, rgba(13,7,5,0.7) 100%)',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-end',
						padding: '4rem',
					}}
				>
					<Link
						to='/'
						style={{
							fontFamily: 'Cormorant Garamond, serif',
							color: 'var(--accent-gold)',
							fontSize: '2rem',
							fontWeight: '300',
							letterSpacing: '6px',
							textTransform: 'uppercase',
							textDecoration: 'none',
							marginBottom: '2rem',
						}}
					>
						Everbean
					</Link>
					<p
						style={{
							fontFamily: 'Cormorant Garamond, serif',
							color: '#FFFFFF',
							fontSize: '2.5rem',
							fontWeight: '300',
							fontStyle: 'italic',
							lineHeight: '1.2',
							opacity: 0.8,
						}}
					>
						"Join a community
						<br />
						of coffee lovers"
					</p>
				</div>
			</div>

			{/* Right — Form */}
			<div
				style={{
					backgroundColor: 'var(--milk-foam)',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					padding: '4rem 5rem',
				}}
			>
				<p
					style={{
						color: 'var(--accent-gold)',
						fontSize: '0.6rem',
						letterSpacing: '4px',
						textTransform: 'uppercase',
						fontFamily: 'Montserrat',
						fontWeight: '600',
						marginBottom: '1rem',
					}}
				>
					New Member
				</p>

				<h1
					style={{
						fontFamily: 'Cormorant Garamond, serif',
						color: 'var(--espresso)',
						fontSize: '3rem',
						fontWeight: '300',
						marginBottom: '3rem',
						letterSpacing: '-1px',
					}}
				>
					Create Account
				</h1>

				{message && (
					<div
						style={{
							backgroundColor: 'rgba(230,57,70,0.08)',
							border: '1px solid rgba(230,57,70,0.2)',
							padding: '1rem 1.5rem',
							marginBottom: '2rem',
						}}
					>
						<p
							style={{
								color: '#E63946',
								fontSize: '0.8rem',
								fontFamily: 'Montserrat',
							}}
						>
							{message}
						</p>
					</div>
				)}

				{error && (
					<div
						style={{
							backgroundColor: 'rgba(230,57,70,0.08)',
							border: '1px solid rgba(230,57,70,0.2)',
							padding: '1rem 1.5rem',
							marginBottom: '2rem',
						}}
					>
						<p
							style={{
								color: '#E63946',
								fontSize: '0.8rem',
								fontFamily: 'Montserrat',
							}}
						>
							{error.detail || 'Registration failed'}
						</p>
					</div>
				)}

				<form onSubmit={submitHandler}>
					<div style={{ marginBottom: '1.5rem' }}>
						<label style={labelStyle}>Full Name</label>
						<input
							type='text'
							placeholder='Your name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							style={inputStyle}
							onFocus={(e) => (e.target.style.borderColor = 'var(--espresso)')}
							onBlur={(e) => (e.target.style.borderColor = 'var(--latte)')}
						/>
					</div>

					<div style={{ marginBottom: '1.5rem' }}>
						<label style={labelStyle}>Email Address</label>
						<input
							type='email'
							placeholder='your@email.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							style={inputStyle}
							onFocus={(e) => (e.target.style.borderColor = 'var(--espresso)')}
							onBlur={(e) => (e.target.style.borderColor = 'var(--latte)')}
						/>
					</div>

					<div style={{ marginBottom: '1.5rem' }}>
						<label style={labelStyle}>Password</label>
						<input
							type='password'
							placeholder='••••••••'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							style={inputStyle}
							onFocus={(e) => (e.target.style.borderColor = 'var(--espresso)')}
							onBlur={(e) => (e.target.style.borderColor = 'var(--latte)')}
						/>
					</div>

					<div style={{ marginBottom: '3rem' }}>
						<label style={labelStyle}>Confirm Password</label>
						<input
							type='password'
							placeholder='••••••••'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							style={inputStyle}
							onFocus={(e) => (e.target.style.borderColor = 'var(--espresso)')}
							onBlur={(e) => (e.target.style.borderColor = 'var(--latte)')}
						/>
					</div>

					<button
						type='submit'
						disabled={loading}
						style={{
							width: '100%',
							padding: '1.2rem',
							backgroundColor: 'var(--espresso)',
							color: 'var(--cream)',
							border: 'none',
							fontSize: '0.65rem',
							fontFamily: 'Montserrat, sans-serif',
							fontWeight: '700',
							letterSpacing: '3px',
							textTransform: 'uppercase',
							cursor: 'pointer',
							transition: 'background 0.3s',
							marginBottom: '2rem',
						}}
						onMouseEnter={(e) =>
							(e.target.style.backgroundColor = 'var(--coffee)')
						}
						onMouseLeave={(e) =>
							(e.target.style.backgroundColor = 'var(--espresso)')
						}
					>
						{loading ? 'Creating account...' : 'Create Account'}
					</button>
				</form>

				<p
					style={{
						color: 'var(--coffee)',
						fontSize: '0.8rem',
						fontFamily: 'Montserrat',
						fontWeight: '300',
					}}
				>
					Already have an account?{' '}
					<Link
						to={redirect ? `/login?redirect=${redirect}` : '/login'}
						style={{
							color: 'var(--espresso)',
							fontWeight: '600',
							textDecoration: 'none',
							borderBottom: '1px solid var(--accent-gold)',
							paddingBottom: '0.1rem',
						}}
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}

export default RegisterPage;
