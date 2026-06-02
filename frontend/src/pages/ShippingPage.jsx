import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../redux/slices/cartSlice';

const COFFEE_IMG =
	'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80';

function ShippingPage() {
	const { shippingAddress } = useSelector((state) => state.cart);

	const [address, setAddress] = useState(shippingAddress?.address || '');
	const [city, setCity] = useState(shippingAddress?.city || '');
	const [postalCode, setPostalCode] = useState(
		shippingAddress?.postalCode || '',
	);
	const [country, setCountry] = useState(shippingAddress?.country || '');
	const [focused, setFocused] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		navigate('/payment');
	};

	const fields = [
		{
			id: 'address',
			label: 'Street Address',
			placeholder: '123 Coffee Lane',
			value: address,
			setter: setAddress,
			type: 'text',
		},
		{
			id: 'city',
			label: 'City',
			placeholder: 'Seattle',
			value: city,
			setter: setCity,
			type: 'text',
		},
		{
			id: 'postalCode',
			label: 'Postal Code',
			placeholder: '98101',
			value: postalCode,
			setter: setPostalCode,
			type: 'text',
		},
		{
			id: 'country',
			label: 'Country',
			placeholder: 'United States',
			value: country,
			setter: setCountry,
			type: 'text',
		},
	];

	return (
		<>
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        .shipping-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 80px);
          background: var(--milk-foam, #FAF6F1);
        }
        .shipping-photo-panel { position: relative; overflow: hidden; }
        .shipping-photo-panel img {
          width: 100%; height: 100%; object-fit: cover;
          filter: brightness(0.75) sepia(0.2);
        }
        .shipping-photo-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(160deg, rgba(13,7,5,0.5) 0%, rgba(74,37,21,0.3) 100%);
          display: flex; flex-direction: column; justify-content: flex-end; padding: 3rem;
        }
        .shipping-photo-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem; font-weight: 300; font-style: italic;
          color: var(--cream, #F2E8DC); line-height: 1.3; margin-bottom: 1rem;
        }
        .shipping-photo-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem; font-weight: 500; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--accent-gold, #C9A96E);
        }
        .shipping-form-panel {
          display: flex; align-items: center; justify-content: center;
          padding: 4rem 3rem; background: var(--milk-foam, #FAF6F1);
        }
        .shipping-form-inner { width: 100%; max-width: 420px; }
        .shipping-step-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem; font-weight: 600; letter-spacing: 0.25em;
          text-transform: uppercase; color: var(--accent-gold, #C9A96E); margin-bottom: 0.75rem;
        }
        .shipping-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem; font-weight: 300; color: var(--espresso, #0D0705);
          line-height: 1.1; margin-bottom: 0.5rem;
        }
        .shipping-divider {
          width: 48px; height: 1px; background: var(--accent-gold, #C9A96E);
          margin: 1.5rem 0 2.5rem;
        }
        .shipping-progress {
          display: flex; align-items: center; gap: 0.5rem; margin-bottom: 2.5rem;
        }
        .shipping-progress-step {
          font-family: 'Montserrat', sans-serif; font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--latte, #C4956A); opacity: 0.5;
        }
        .shipping-progress-step.active { color: var(--espresso, #0D0705); opacity: 1; }
        .shipping-progress-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--latte, #C4956A); opacity: 0.4;
        }
        .shipping-field { position: relative; margin-bottom: 1.8rem; }
        .shipping-field label {
          display: block; font-family: 'Montserrat', sans-serif;
          font-size: 0.68rem; font-weight: 600; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--coffee, #4A2515);
          margin-bottom: 0.5rem; transition: color 0.2s;
        }
        .shipping-field.focused label { color: var(--accent-gold, #C9A96E); }
        .shipping-field input {
          width: 100%; background: transparent; border: none;
          border-bottom: 1px solid var(--latte, #C4956A);
          padding: 0.6rem 0; font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; color: var(--espresso, #0D0705);
          outline: none; transition: border-color 0.25s; box-sizing: border-box;
        }
        .shipping-field input::placeholder {
          color: var(--latte, #C4956A); font-style: italic; opacity: 0.6;
        }
        .shipping-field-line {
          position: absolute; bottom: 0; left: 0; width: 0; height: 2px;
          background: var(--accent-gold, #C9A96E); transition: width 0.3s ease;
        }
        .shipping-field.focused .shipping-field-line { width: 100%; }
        .shipping-submit {
          width: 100%; padding: 1rem 2rem; background: var(--espresso, #0D0705);
          color: var(--cream, #F2E8DC); border: none;
          font-family: 'Montserrat', sans-serif; font-size: 0.72rem;
          font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase;
          cursor: pointer; margin-top: 1rem; transition: background 0.25s;
        }
        .shipping-submit:hover { background: var(--coffee, #4A2515); }
        @media (max-width: 768px) {
          .shipping-wrapper { grid-template-columns: 1fr; }
          .shipping-photo-panel { display: none; }
          .shipping-form-panel { padding: 2.5rem 1.5rem; }
        }
      `}</style>

			<div className='shipping-wrapper'>
				<div className='shipping-photo-panel'>
					<img src={COFFEE_IMG} alt='Coffee delivery' />
					<div className='shipping-photo-overlay'>
						<p className='shipping-photo-quote'>
							Every great cup begins with a journey.
						</p>
						<span className='shipping-photo-sub'>
							EverBean — Delivered Fresh
						</span>
					</div>
				</div>

				<div className='shipping-form-panel'>
					<div className='shipping-form-inner'>
						<div className='shipping-progress'>
							<span className='shipping-progress-step active'>Shipping</span>
							<div className='shipping-progress-dot' />
							<span className='shipping-progress-step'>Payment</span>
							<div className='shipping-progress-dot' />
							<span className='shipping-progress-step'>Review</span>
						</div>

						<p className='shipping-step-label'>Step 01 of 03</p>
						<h1 className='shipping-title'>
							Delivery
							<br />
							Address
						</h1>
						<div className='shipping-divider' />

						<form onSubmit={submitHandler}>
							{fields.map((f) => (
								<div
									key={f.id}
									className={`shipping-field${focused === f.id ? ' focused' : ''}`}
								>
									<label htmlFor={f.id}>{f.label}</label>
									<input
										id={f.id}
										type={f.type}
										placeholder={f.placeholder}
										value={f.value}
										required
										onFocus={() => setFocused(f.id)}
										onBlur={() => setFocused('')}
										onChange={(e) => f.setter(e.target.value)}
									/>
									<div className='shipping-field-line' />
								</div>
							))}
							<button type='submit' className='shipping-submit'>
								Continue to Payment →
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default ShippingPage;
