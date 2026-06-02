import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');
	const [success, setSuccess] = useState(false);
	const [orders, setOrders] = useState([]);
	const [focused, setFocused] = useState('');

	const { userInfo } = useSelector((state) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (!userInfo) {
			navigate('/login');
			return;
		}
		setName(userInfo.name);
		setEmail(userInfo.email);
		fetchOrders();
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
		} catch {
			setMessage('Update failed. Please try again.');
		}
	};

	const fields = [
		{
			id: 'name',
			label: 'Full Name',
			type: 'text',
			value: name,
			setter: setName,
			placeholder: 'Your name',
		},
		{
			id: 'email',
			label: 'Email Address',
			type: 'email',
			value: email,
			setter: setEmail,
			placeholder: 'you@example.com',
		},
		{
			id: 'password',
			label: 'New Password',
			type: 'password',
			value: password,
			setter: setPassword,
			placeholder: 'Leave blank to keep current',
		},
		{
			id: 'confirmPassword',
			label: 'Confirm Password',
			type: 'password',
			value: confirmPassword,
			setter: setConfirmPassword,
			placeholder: '••••••••',
		},
	];

	const initials = name
		? name
				.split(' ')
				.map((n) => n[0])
				.join('')
				.toUpperCase()
				.slice(0, 2)
		: '?';

	return (
		<>
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        .profile-page { min-height: calc(100vh - 80px); background: var(--milk-foam, #FAF6F1); }
        .profile-hero {
          background: var(--dark-roast, #1A0E0A); padding: 3rem 2rem;
          position: relative; overflow: hidden;
        }
        .profile-hero::before {
          content: ''; position: absolute; right: -100px; top: -100px;
          width: 400px; height: 400px; border-radius: 50%;
          background: rgba(201,169,110,0.06);
        }
        .profile-hero-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center; gap: 2rem; position: relative; z-index: 1;
        }
        .profile-avatar {
          width: 72px; height: 72px; border-radius: 50%;
          background: var(--coffee, #4A2515); border: 2px solid var(--accent-gold, #C9A96E);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 600;
          color: var(--accent-gold, #C9A96E); flex-shrink: 0;
        }
        .profile-hero-greeting {
          font-family: 'Montserrat', sans-serif; font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--accent-gold, #C9A96E); margin-bottom: 0.3rem;
        }
        .profile-hero-name {
          font-family: 'Cormorant Garamond', serif; font-size: 2.2rem;
          font-weight: 300; color: var(--cream, #F2E8DC); line-height: 1.1;
        }
        .profile-hero-email {
          font-family: 'Montserrat', sans-serif; font-size: 0.78rem;
          color: rgba(196,149,106,0.7); margin-top: 0.2rem;
        }
        .profile-grid {
          max-width: 1100px; margin: 0 auto; padding: 2.5rem 2rem;
          display: grid; grid-template-columns: 360px 1fr;
          gap: 2rem; align-items: start;
        }
        .profile-card {
          background: white; padding: 2rem;
          border: 1px solid rgba(196,149,106,0.15); position: sticky; top: 100px;
        }
        .profile-card-title {
          font-family: 'Cormorant Garamond', serif; font-size: 1.6rem;
          font-weight: 400; color: var(--espresso, #0D0705); margin-bottom: 0.4rem;
        }
        .profile-card-divider {
          width: 32px; height: 1px; background: var(--accent-gold, #C9A96E); margin-bottom: 1.8rem;
        }
        .profile-field { position: relative; margin-bottom: 1.6rem; }
        .profile-field label {
          display: block; font-family: 'Montserrat', sans-serif; font-size: 0.62rem;
          font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--coffee, #4A2515); margin-bottom: 0.45rem; transition: color 0.2s;
        }
        .profile-field.focused label { color: var(--accent-gold, #C9A96E); }
        .profile-field input {
          width: 100%; background: transparent; border: none;
          border-bottom: 1px solid var(--latte, #C4956A); padding: 0.55rem 0;
          font-family: 'Cormorant Garamond', serif; font-size: 1.1rem;
          color: var(--espresso, #0D0705); outline: none; box-sizing: border-box;
        }
        .profile-field input::placeholder {
          color: var(--latte, #C4956A); font-style: italic; opacity: 0.5;
        }
        .profile-field-line {
          position: absolute; bottom: 0; left: 0; width: 0; height: 2px;
          background: var(--accent-gold, #C9A96E); transition: width 0.3s ease;
        }
        .profile-field.focused .profile-field-line { width: 100%; }
        .profile-message-error {
          font-family: 'Montserrat', sans-serif; font-size: 0.72rem; color: #c0392b;
          margin-bottom: 1rem; padding: 0.7rem 1rem;
          border-left: 3px solid #c0392b; background: rgba(192,57,43,0.05);
        }
        .profile-message-success {
          font-family: 'Montserrat', sans-serif; font-size: 0.72rem; color: #27ae60;
          margin-bottom: 1rem; padding: 0.7rem 1rem;
          border-left: 3px solid var(--accent-gold, #C9A96E); background: rgba(201,169,110,0.08);
        }
        .profile-submit {
          width: 100%; padding: 0.9rem; background: var(--espresso, #0D0705);
          color: var(--cream, #F2E8DC); border: none;
          font-family: 'Montserrat', sans-serif; font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.25em; text-transform: uppercase; cursor: pointer; transition: background 0.25s;
        }
        .profile-submit:hover { background: var(--coffee, #4A2515); }
        .profile-orders-card {
          background: white; padding: 2rem; border: 1px solid rgba(196,149,106,0.15);
        }
        .profile-orders-title {
          font-family: 'Cormorant Garamond', serif; font-size: 1.6rem;
          font-weight: 400; color: var(--espresso, #0D0705); margin-bottom: 0.4rem;
        }
        .profile-orders-divider {
          width: 32px; height: 1px; background: var(--accent-gold, #C9A96E); margin-bottom: 1.8rem;
        }
        .profile-orders-empty {
          font-family: 'Cormorant Garamond', serif; font-size: 1.15rem;
          font-style: italic; color: var(--latte, #C4956A); padding: 2rem 0;
        }
        .profile-orders-table { width: 100%; border-collapse: collapse; }
        .profile-orders-table thead tr { border-bottom: 1px solid var(--cream, #F2E8DC); }
        .profile-orders-table th {
          font-family: 'Montserrat', sans-serif; font-size: 0.6rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--latte, #C4956A);
          padding: 0 0.8rem 0.8rem; text-align: left;
        }
        .profile-orders-table th:first-child { padding-left: 0; }
        .profile-orders-table tbody tr { border-bottom: 1px solid var(--cream, #F2E8DC); }
        .profile-orders-table tbody tr:hover { background: rgba(250,246,241,0.8); }
        .profile-orders-table td {
          padding: 1rem 0.8rem; font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem; color: var(--coffee, #4A2515);
        }
        .profile-orders-table td:first-child { padding-left: 0; }
        .profile-orders-id {
          font-family: 'Cormorant Garamond', serif; font-size: 0.95rem;
          color: var(--espresso, #0D0705); text-decoration: none;
        }
        .profile-orders-id:hover { color: var(--accent-gold, #C9A96E); text-decoration: underline; }
        .profile-orders-total {
          font-family: 'Cormorant Garamond', serif; font-size: 1.05rem;
          font-weight: 600; color: var(--espresso, #0D0705);
        }
        .profile-status-badge {
          display: inline-flex; align-items: center; gap: 0.35rem;
          font-family: 'Montserrat', sans-serif; font-size: 0.6rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; padding: 0.3rem 0.65rem;
        }
        .profile-status-badge.paid {
          color: #2d7a4f; background: rgba(45,122,79,0.08); border: 1px solid rgba(45,122,79,0.2);
        }
        .profile-status-badge.pending {
          color: var(--latte, #C4956A); background: rgba(196,149,106,0.08);
          border: 1px solid rgba(196,149,106,0.25);
        }
        @media (max-width: 900px) {
          .profile-grid { grid-template-columns: 1fr; }
          .profile-card { position: static; }
        }
      `}</style>

			<div className='profile-page'>
				<div className='profile-hero'>
					<div className='profile-hero-inner'>
						<div className='profile-avatar'>{initials}</div>
						<div>
							<p className='profile-hero-greeting'>Member Account</p>
							<h1 className='profile-hero-name'>{name || 'Welcome back'}</h1>
							<p className='profile-hero-email'>{email}</p>
						</div>
					</div>
				</div>

				<div className='profile-grid'>
					<div className='profile-card'>
						<h2 className='profile-card-title'>Update Profile</h2>
						<div className='profile-card-divider' />
						{message && <div className='profile-message-error'>{message}</div>}
						{success && (
							<div className='profile-message-success'>
								✦ Profile updated successfully
							</div>
						)}
						<form onSubmit={submitHandler}>
							{fields.map((f) => (
								<div
									key={f.id}
									className={`profile-field${focused === f.id ? ' focused' : ''}`}
								>
									<label htmlFor={f.id}>{f.label}</label>
									<input
										id={f.id}
										type={f.type}
										value={f.value}
										placeholder={f.placeholder}
										onFocus={() => setFocused(f.id)}
										onBlur={() => setFocused('')}
										onChange={(e) => f.setter(e.target.value)}
									/>
									<div className='profile-field-line' />
								</div>
							))}
							<button type='submit' className='profile-submit'>
								Save Changes
							</button>
						</form>
					</div>

					<div className='profile-orders-card'>
						<h2 className='profile-orders-title'>Order History</h2>
						<div className='profile-orders-divider' />
						{orders.length === 0 ? (
							<p className='profile-orders-empty'>
								No orders yet — time to explore our coffees.
							</p>
						) : (
							<table className='profile-orders-table'>
								<thead>
									<tr>
										<th>Order ID</th>
										<th>Date</th>
										<th>Total</th>
										<th>Payment</th>
										<th>Delivery</th>
									</tr>
								</thead>
								<tbody>
									{orders.map((order) => (
										<tr key={order._id}>
											<td>
												<Link
													to={`/order/${order._id}`}
													className='profile-orders-id'
												>
													#{String(order._id).slice(-8).toUpperCase()}
												</Link>
											</td>
											<td>{order.createdAt?.substring(0, 10)}</td>
											<td>
												<span className='profile-orders-total'>
													${order.totalPrice}
												</span>
											</td>
											<td>
												<span
													className={`profile-status-badge ${order.isPaid ? 'paid' : 'pending'}`}
												>
													{order.isPaid ? '✦ Paid' : 'Pending'}
												</span>
											</td>
											<td>
												<span
													className={`profile-status-badge ${order.isDelivered ? 'paid' : 'pending'}`}
												>
													{order.isDelivered ? '✦ Delivered' : 'Processing'}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default ProfilePage;
