import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');
	const [success, setSuccess] = useState(false);
	const [orders, setOrders] = useState([]);

	const { userInfo } = useSelector((state) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (!userInfo) {
			navigate('/login');
		} else {
			setName(userInfo.name);
			setEmail(userInfo.email);
			fetchOrders();
		}
	}, [userInfo, navigate]);

	const fetchOrders = async () => {
		try {
			const { data } = await axios.get('/api/orders/myorders/', {
				headers: { Authorization: `Bearer ${userInfo.token}` },
			});
			setOrders(data);
		} catch (err) {
			console.log(err);
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
			return;
		}
		try {
			await axios.put(
				'/api/users/profile/update/',
				{ name, email, password: password || undefined },
				{ headers: { Authorization: `Bearer ${userInfo.token}` } },
			);
			setSuccess(true);
			setMessage('');
			setPassword('');
			setConfirmPassword('');
		} catch (err) {
			setMessage('Update failed');
		}
	};

	const inputStyle = {
		width: '100%',
		padding: '0.7rem',
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
		fontSize: '0.9rem',
	};

	return (
		<div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
			<h1
				style={{
					fontFamily: 'Playfair Display, serif',
					color: 'var(--espresso)',
					marginBottom: '2rem',
				}}
			>
				👤 My Profile
			</h1>

			<div
				style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}
			>
				{/* Update Profile */}
				<div
					style={{
						backgroundColor: 'white',
						borderRadius: '16px',
						padding: '1.5rem',
						boxShadow: '0 2px 12px rgba(28,10,0,0.08)',
						height: 'fit-content',
					}}
				>
					<h2
						style={{
							fontFamily: 'Playfair Display, serif',
							color: 'var(--espresso)',
							marginBottom: '1.5rem',
							fontSize: '1.3rem',
						}}
					>
						Update Info
					</h2>

					{message && (
						<p
							style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}
						>
							{message}
						</p>
					)}
					{success && (
						<p
							style={{
								color: 'green',
								marginBottom: '1rem',
								fontSize: '0.9rem',
							}}
						>
							✅ Profile updated!
						</p>
					)}

					<form onSubmit={submitHandler}>
						<label style={labelStyle}>Name</label>
						<input
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							style={inputStyle}
						/>

						<label style={labelStyle}>Email</label>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							style={inputStyle}
						/>

						<label style={labelStyle}>New Password</label>
						<input
							type='password'
							placeholder='Leave blank to keep current'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							style={inputStyle}
						/>

						<label style={labelStyle}>Confirm Password</label>
						<input
							type='password'
							placeholder='••••••••'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							style={inputStyle}
						/>

						<button
							type='submit'
							style={{
								width: '100%',
								padding: '0.8rem',
								backgroundColor: 'var(--espresso)',
								color: 'var(--cream)',
								border: 'none',
								borderRadius: '8px',
								fontSize: '1rem',
								cursor: 'pointer',
								fontFamily: 'Lato, sans-serif',
							}}
						>
							Update Profile
						</button>
					</form>
				</div>

				{/* My Orders */}
				<div
					style={{
						backgroundColor: 'white',
						borderRadius: '16px',
						padding: '1.5rem',
						boxShadow: '0 2px 12px rgba(28,10,0,0.08)',
					}}
				>
					<h2
						style={{
							fontFamily: 'Playfair Display, serif',
							color: 'var(--espresso)',
							marginBottom: '1.5rem',
							fontSize: '1.3rem',
						}}
					>
						My Orders ☕
					</h2>

					{orders.length === 0 ? (
						<p style={{ color: 'var(--coffee)' }}>
							No orders yet — go grab a coffee! ☕
						</p>
					) : (
						<table style={{ width: '100%', borderCollapse: 'collapse' }}>
							<thead>
								<tr style={{ borderBottom: '2px solid var(--cream)' }}>
									{['ID', 'Date', 'Total', 'Paid', 'Delivered'].map((h) => (
										<th
											key={h}
											style={{
												padding: '0.8rem',
												textAlign: 'left',
												color: 'var(--coffee)',
												fontSize: '0.85rem',
												fontFamily: 'Lato, sans-serif',
											}}
										>
											{h}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr
										key={order._id}
										style={{ borderBottom: '1px solid var(--cream)' }}
									>
										<td
											style={{
												padding: '0.8rem',
												color: 'var(--espresso)',
												fontSize: '0.9rem',
											}}
										>
											#{order._id}
										</td>
										<td
											style={{
												padding: '0.8rem',
												color: 'var(--coffee)',
												fontSize: '0.9rem',
											}}
										>
											{order.createdAt?.substring(0, 10)}
										</td>
										<td
											style={{
												padding: '0.8rem',
												color: 'var(--espresso)',
												fontWeight: '700',
												fontSize: '0.9rem',
											}}
										>
											${order.totalPrice}
										</td>
										<td style={{ padding: '0.8rem', fontSize: '0.9rem' }}>
											{order.isPaid ? (
												<span style={{ color: 'green' }}>
													✅ {order.paidAt?.substring(0, 10)}
												</span>
											) : (
												<span style={{ color: 'orange' }}>⏳ Pending</span>
											)}
										</td>
										<td style={{ padding: '0.8rem', fontSize: '0.9rem' }}>
											{order.isDelivered ? (
												<span style={{ color: 'green' }}>✅</span>
											) : (
												<span style={{ color: 'orange' }}>⏳ Pending</span>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;
