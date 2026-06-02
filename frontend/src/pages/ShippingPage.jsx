import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../redux/slices/cartSlice';

function ShippingPage() {
	const { shippingAddress } = useSelector((state) => state.cart);

	const [address, setAddress] = useState(shippingAddress?.address || '');
	const [city, setCity] = useState(shippingAddress?.city || '');
	const [postalCode, setPostalCode] = useState(
		shippingAddress?.postalCode || '',
	);
	const [country, setCountry] = useState(shippingAddress?.country || '');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		navigate('/payment');
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
				📦 Shipping Address
			</h1>

			<form onSubmit={submitHandler}>
				<label style={labelStyle}>Address</label>
				<input
					type='text'
					placeholder='123 Coffee St'
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					style={inputStyle}
					required
				/>

				<label style={labelStyle}>City</label>
				<input
					type='text'
					placeholder='Seattle'
					value={city}
					onChange={(e) => setCity(e.target.value)}
					style={inputStyle}
					required
				/>

				<label style={labelStyle}>Postal Code</label>
				<input
					type='text'
					placeholder='98101'
					value={postalCode}
					onChange={(e) => setPostalCode(e.target.value)}
					style={inputStyle}
					required
				/>

				<label style={labelStyle}>Country</label>
				<input
					type='text'
					placeholder='USA'
					value={country}
					onChange={(e) => setCountry(e.target.value)}
					style={inputStyle}
					required
				/>

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
						marginTop: '0.5rem',
					}}
				>
					Continue to Payment →
				</button>
			</form>
		</div>
	);
}

export default ShippingPage;
