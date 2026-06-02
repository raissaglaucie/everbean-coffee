import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../redux/slices/cartSlice';

function PaymentPage() {
	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate('/placeorder');
	};

	const optionStyle = (selected) => ({
		display: 'flex',
		alignItems: 'center',
		gap: '1rem',
		padding: '1rem 1.5rem',
		borderRadius: '12px',
		border: selected ? '2px solid var(--espresso)' : '2px solid var(--latte)',
		backgroundColor: selected ? 'var(--cream)' : 'white',
		cursor: 'pointer',
		marginBottom: '1rem',
		transition: 'all 0.2s',
	});

	return (
		<div
			style={{
				maxWidth: '450px',
				margin: '3rem auto',
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
				💳 Payment Method
			</h1>

			<form onSubmit={submitHandler}>
				<p
					style={{
						color: 'var(--coffee)',
						marginBottom: '1rem',
						fontWeight: '700',
					}}
				>
					Select method:
				</p>

				<div
					style={optionStyle(paymentMethod === 'PayPal')}
					onClick={() => setPaymentMethod('PayPal')}
				>
					<input
						type='radio'
						name='paymentMethod'
						value='PayPal'
						checked={paymentMethod === 'PayPal'}
						onChange={(e) => setPaymentMethod(e.target.value)}
					/>
					<span style={{ fontSize: '1.3rem' }}>🅿️</span>
					<span style={{ color: 'var(--espresso)', fontWeight: '700' }}>
						PayPal or Credit Card
					</span>
				</div>

				<div
					style={optionStyle(paymentMethod === 'Stripe')}
					onClick={() => setPaymentMethod('Stripe')}
				>
					<input
						type='radio'
						name='paymentMethod'
						value='Stripe'
						checked={paymentMethod === 'Stripe'}
						onChange={(e) => setPaymentMethod(e.target.value)}
					/>
					<span style={{ fontSize: '1.3rem' }}>💳</span>
					<span style={{ color: 'var(--espresso)', fontWeight: '700' }}>
						Stripe
					</span>
				</div>

				<button
					type='submit'
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
						marginTop: '1rem',
					}}
				>
					Continue to Order Review →
				</button>
			</form>
		</div>
	);
}

export default PaymentPage;
