import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';

function OrderPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { userInfo } = useSelector((state) => state.user);

	useEffect(() => {
		if (!userInfo) navigate('/login');
	}, [userInfo, navigate]);

	return (
		<div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
			<h1
				style={{
					fontFamily: 'Playfair Display, serif',
					color: 'var(--espresso)',
					marginBottom: '0.5rem',
				}}
			>
				☕ Order Confirmed!
			</h1>

			<p
				style={{
					color: 'var(--latte)',
					marginBottom: '2rem',
					fontSize: '0.9rem',
				}}
			>
				Order ID: #{id}
			</p>

			<div
				style={{
					backgroundColor: 'white',
					borderRadius: '16px',
					padding: '2rem',
					boxShadow: '0 4px 20px rgba(28,10,0,0.08)',
					textAlign: 'center',
				}}
			>
				<div style={{ fontSize: '4rem', marginBottom: '1rem' }}>☕</div>

				<h2
					style={{
						fontFamily: 'Playfair Display, serif',
						color: 'var(--espresso)',
						marginBottom: '1rem',
					}}
				>
					Thank you for your order!
				</h2>

				<p
					style={{
						color: 'var(--coffee)',
						marginBottom: '2rem',
						lineHeight: '1.6',
					}}
				>
					We're preparing your coffee with love. ☕<br />
					You'll receive a confirmation soon.
				</p>

				<div
					style={{
						backgroundColor: 'var(--cream)',
						borderRadius: '12px',
						padding: '1rem',
						marginBottom: '2rem',
						display: 'inline-block',
					}}
				>
					<p style={{ color: 'var(--coffee)', fontSize: '0.9rem' }}>
						📦 Status:{' '}
						<strong style={{ color: 'var(--espresso)' }}>Processing</strong>
					</p>
					<p
						style={{
							color: 'var(--coffee)',
							fontSize: '0.9rem',
							marginTop: '0.3rem',
						}}
					>
						💳 Payment: <strong style={{ color: 'orange' }}>Pending</strong>
					</p>
				</div>

				<br />

				<Link
					to='/'
					style={{
						backgroundColor: 'var(--espresso)',
						color: 'var(--cream)',
						padding: '0.8rem 2rem',
						borderRadius: '8px',
						textDecoration: 'none',
						fontFamily: 'Lato, sans-serif',
						letterSpacing: '1px',
					}}
				>
					Continue Shopping →
				</Link>
			</div>
		</div>
	);
}

export default OrderPage;
