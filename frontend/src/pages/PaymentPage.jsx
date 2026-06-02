import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../redux/slices/cartSlice';

const COFFEE_IMG =
	'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=800&q=80';

function PaymentPage() {
	const [paymentMethod, setPaymentMethod] = useState('PayPal');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate('/placeorder');
	};

	const methods = [
		{
			id: 'PayPal',
			label: 'PayPal',
			sub: 'Pay securely with PayPal or credit card',
		},
		{ id: 'Stripe', label: 'Stripe', sub: 'Visa, Mastercard, Amex accepted' },
	];

	return (
		<>
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        .payment-wrapper {
          display: grid; grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 80px);
        }
        .payment-photo-panel { position: relative; overflow: hidden; }
        .payment-photo-panel img {
          width: 100%; height: 100%; object-fit: cover;
          filter: brightness(0.7) sepia(0.25);
        }
        .payment-photo-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(160deg, rgba(13,7,5,0.6) 0%, rgba(74,37,21,0.25) 100%);
          display: flex; flex-direction: column; justify-content: flex-end; padding: 3rem;
        }
        .payment-photo-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 300; font-style: italic;
          color: var(--cream, #F2E8DC); line-height: 1.35; margin-bottom: 1rem;
        }
        .payment-photo-sub {
          font-family: 'Montserrat', sans-serif; font-size: 0.72rem;
          font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--accent-gold, #C9A96E);
        }
        .payment-form-panel {
          display: flex; align-items: center; justify-content: center;
          padding: 4rem 3rem; background: var(--milk-foam, #FAF6F1);
        }
        .payment-form-inner { width: 100%; max-width: 420px; }
        .payment-progress {
          display: flex; align-items: center; gap: 0.5rem; margin-bottom: 2.5rem;
        }
        .payment-progress-step {
          font-family: 'Montserrat', sans-serif; font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--latte, #C4956A); opacity: 0.5;
        }
        .payment-progress-step.done { color: var(--accent-gold, #C9A96E); opacity: 1; }
        .payment-progress-step.active { color: var(--espresso, #0D0705); opacity: 1; }
        .payment-progress-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--latte, #C4956A); opacity: 0.4;
        }
        .payment-step-label {
          font-family: 'Montserrat', sans-serif; font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--accent-gold, #C9A96E); margin-bottom: 0.75rem;
        }
        .payment-title {
          font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 300;
          color: var(--espresso, #0D0705); line-height: 1.1; margin-bottom: 0.5rem;
        }
        .payment-divider {
          width: 48px; height: 1px; background: var(--accent-gold, #C9A96E);
          margin: 1.5rem 0 2.5rem;
        }
        .payment-methods-label {
          font-family: 'Montserrat', sans-serif; font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--coffee, #4A2515); margin-bottom: 1.2rem;
        }
        .payment-option {
          display: flex; align-items: center; gap: 1.2rem;
          padding: 1.2rem 1.4rem;
          border: 1px solid var(--latte, #C4956A);
          background: transparent; cursor: pointer; margin-bottom: 1rem;
          transition: all 0.2s;
        }
        .payment-option.selected {
          border-color: var(--espresso, #0D0705);
          background: var(--espresso, #0D0705);
        }
        .payment-option-icon { color: var(--coffee, #4A2515); font-size: 1.4rem; flex-shrink: 0; }
        .payment-option.selected .payment-option-icon { color: var(--accent-gold, #C9A96E); }
        .payment-option-name {
          font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 600;
          color: var(--espresso, #0D0705); display: block;
        }
        .payment-option.selected .payment-option-name { color: var(--cream, #F2E8DC); }
        .payment-option-sub {
          font-family: 'Montserrat', sans-serif; font-size: 0.68rem;
          color: var(--latte, #C4956A); display: block; margin-top: 0.15rem;
        }
        .payment-option.selected .payment-option-sub { color: rgba(242,232,220,0.6); }
        .payment-option-text { flex: 1; }
        .payment-radio-dot {
          width: 16px; height: 16px; border-radius: 50%;
          border: 1.5px solid var(--latte, #C4956A);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .payment-option.selected .payment-radio-dot { border-color: var(--accent-gold, #C9A96E); }
        .payment-radio-dot::after {
          content: ''; width: 7px; height: 7px; border-radius: 50%; background: transparent;
        }
        .payment-option.selected .payment-radio-dot::after { background: var(--accent-gold, #C9A96E); }
        .payment-submit {
          width: 100%; padding: 1rem 2rem; background: var(--espresso, #0D0705);
          color: var(--cream, #F2E8DC); border: none;
          font-family: 'Montserrat', sans-serif; font-size: 0.72rem;
          font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase;
          cursor: pointer; margin-top: 1.5rem; transition: background 0.25s;
        }
        .payment-submit:hover { background: var(--coffee, #4A2515); }
        .payment-security-note {
          display: flex; align-items: center; gap: 0.5rem; margin-top: 1.2rem;
          font-family: 'Montserrat', sans-serif; font-size: 0.65rem;
          color: var(--latte, #C4956A); letter-spacing: 0.05em;
        }
        @media (max-width: 768px) {
          .payment-wrapper { grid-template-columns: 1fr; }
          .payment-photo-panel { display: none; }
          .payment-form-panel { padding: 2.5rem 1.5rem; }
        }
      `}</style>

			<div className='payment-wrapper'>
				<div className='payment-photo-panel'>
					<img src={COFFEE_IMG} alt='Coffee shop' />
					<div className='payment-photo-overlay'>
						<p className='payment-photo-quote'>
							Crafted with care,
							<br />
							delivered with intention.
						</p>
						<span className='payment-photo-sub'>
							Secure & Seamless Checkout
						</span>
					</div>
				</div>

				<div className='payment-form-panel'>
					<div className='payment-form-inner'>
						<div className='payment-progress'>
							<span className='payment-progress-step done'>Shipping</span>
							<div className='payment-progress-dot' />
							<span className='payment-progress-step active'>Payment</span>
							<div className='payment-progress-dot' />
							<span className='payment-progress-step'>Review</span>
						</div>

						<p className='payment-step-label'>Step 02 of 03</p>
						<h1 className='payment-title'>
							Payment
							<br />
							Method
						</h1>
						<div className='payment-divider' />
						<p className='payment-methods-label'>
							Select your preferred method
						</p>

						<form onSubmit={submitHandler}>
							{methods.map((m) => (
								<div
									key={m.id}
									className={`payment-option${paymentMethod === m.id ? ' selected' : ''}`}
									onClick={() => setPaymentMethod(m.id)}
								>
									<span className='payment-option-icon'>
										{m.id === 'PayPal' ? '🅿️' : '💳'}
									</span>
									<div className='payment-option-text'>
										<span className='payment-option-name'>{m.label}</span>
										<span className='payment-option-sub'>{m.sub}</span>
									</div>
									<div className='payment-radio-dot' />
								</div>
							))}

							<button type='submit' className='payment-submit'>
								Continue to Review →
							</button>

							<p className='payment-security-note'>
								🔒 Your payment details are encrypted and secure
							</p>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default PaymentPage;
