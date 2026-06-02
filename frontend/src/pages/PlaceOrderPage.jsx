import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { createOrder } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function PlaceOrderPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { cartItems, shippingAddress, paymentMethod } = useSelector(
		(state) => state.cart,
	);
	const { order, success, loading, error } = useSelector(
		(state) => state.order,
	);
	const { userInfo } = useSelector((state) => state.user);

	useEffect(() => {
		if (!userInfo) navigate('/login');
	}, [userInfo, navigate]);

	useEffect(() => {
		if (success) {
			dispatch(clearCart());
			navigate(`/order/${order._id}`);
		}
	}, [success, navigate, order, dispatch]);

	const itemsPrice = cartItems
		.reduce((acc, item) => acc + item.qty * item.price, 0)
		.toFixed(2);
	const shippingPrice = itemsPrice > 30 ? 0 : 5.99;
	const taxPrice = (Number(itemsPrice) * 0.08).toFixed(2);
	const totalPrice = (
		Number(itemsPrice) +
		Number(shippingPrice) +
		Number(taxPrice)
	).toFixed(2);

	const getImageSrc = (image) => {
		if (!image) return null;
		if (image.startsWith('http')) return image;
		return `${API_URL}${image}`;
	};

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
			}),
		);
	};

	return (
		<>
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        .placeorder-page {
          min-height: calc(100vh - 80px);
          background: var(--milk-foam, #FAF6F1);
          padding: 3rem 2rem;
        }
        .placeorder-header {
          max-width: 1100px;
          margin: 0 auto 2.5rem;
        }
        .placeorder-step-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent-gold, #C9A96E);
          margin-bottom: 0.6rem;
        }
        .placeorder-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 300;
          color: var(--espresso, #0D0705);
          line-height: 1.1;
        }
        .placeorder-divider {
          width: 48px;
          height: 1px;
          background: var(--accent-gold, #C9A96E);
          margin-top: 1.2rem;
        }
        .placeorder-progress {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        .placeorder-progress-step {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--latte, #C4956A);
          opacity: 0.5;
        }
        .placeorder-progress-step.done {
          color: var(--accent-gold, #C9A96E);
          opacity: 1;
        }
        .placeorder-progress-step.active {
          color: var(--espresso, #0D0705);
          opacity: 1;
        }
        .placeorder-progress-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--latte, #C4956A);
          opacity: 0.4;
        }
        .placeorder-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 2rem;
          align-items: start;
        }
        .placeorder-section {
          background: white;
          padding: 2rem;
          margin-bottom: 1.2rem;
          border: 1px solid rgba(196,149,106,0.15);
        }
        .placeorder-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.2rem;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid var(--cream, #F2E8DC);
        }
        .placeorder-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 400;
          color: var(--espresso, #0D0705);
        }
        .placeorder-section-edit {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-gold, #C9A96E);
          text-decoration: none;
          border-bottom: 1px solid var(--accent-gold, #C9A96E);
        }
        .placeorder-meta {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          color: var(--coffee, #4A2515);
          line-height: 1.6;
        }
        .placeorder-item {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          padding: 1rem 0;
          border-bottom: 1px solid var(--cream, #F2E8DC);
        }
        .placeorder-item:last-child {
          border-bottom: none;
        }
        .placeorder-item-img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          flex-shrink: 0;
        }
        .placeorder-item-placeholder {
          width: 60px;
          height: 60px;
          background: var(--cream, #F2E8DC);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        .placeorder-item-name {
          flex: 1;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          color: var(--espresso, #0D0705);
          text-decoration: none;
        }
        .placeorder-item-price {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          color: var(--coffee, #4A2515);
          white-space: nowrap;
        }
        .placeorder-summary {
          background: var(--dark-roast, #1A0E0A);
          padding: 2rem;
          position: sticky;
          top: 100px;
        }
        .placeorder-summary-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 300;
          color: var(--cream, #F2E8DC);
          margin-bottom: 0.5rem;
        }
        .placeorder-summary-divider {
          width: 32px;
          height: 1px;
          background: var(--accent-gold, #C9A96E);
          margin-bottom: 1.8rem;
        }
        .placeorder-summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.9rem;
        }
        .placeorder-summary-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(196,149,106,0.7);
        }
        .placeorder-summary-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          color: var(--cream, #F2E8DC);
        }
        .placeorder-summary-free {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-gold, #C9A96E);
        }
        .placeorder-summary-total-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding-top: 1.2rem;
          margin-top: 0.8rem;
          border-top: 1px solid rgba(196,149,106,0.25);
        }
        .placeorder-summary-total-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--latte, #C4956A);
        }
        .placeorder-summary-total-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 300;
          color: var(--cream, #F2E8DC);
        }
        .placeorder-error {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          color: #e07070;
          margin: 1rem 0;
          padding: 0.8rem;
          border: 1px solid rgba(224,112,112,0.3);
          background: rgba(224,112,112,0.08);
        }
        .placeorder-btn {
          width: 100%;
          padding: 1rem;
          background: var(--accent-gold, #C9A96E);
          color: var(--espresso, #0D0705);
          border: none;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: 1.5rem;
          transition: background 0.25s, opacity 0.25s;
        }
        .placeorder-btn:hover:not(:disabled) {
          background: var(--latte, #C4956A);
        }
        .placeorder-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .placeorder-freeship {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem;
          color: var(--accent-gold, #C9A96E);
          text-align: center;
          margin-top: 0.8rem;
          opacity: 0.8;
        }
        @media (max-width: 900px) {
          .placeorder-grid { grid-template-columns: 1fr; }
          .placeorder-summary { position: static; }
        }
      `}</style>

			<div className='placeorder-page'>
				<div className='placeorder-header'>
					<div className='placeorder-progress'>
						<span className='placeorder-progress-step done'>Shipping</span>
						<div className='placeorder-progress-dot' />
						<span className='placeorder-progress-step done'>Payment</span>
						<div className='placeorder-progress-dot' />
						<span className='placeorder-progress-step active'>Review</span>
					</div>
					<p className='placeorder-step-label'>Step 03 of 03</p>
					<h1 className='placeorder-title'>
						Order
						<br />
						Review
					</h1>
					<div className='placeorder-divider' />
				</div>

				<div className='placeorder-grid'>
					<div>
						<div className='placeorder-section'>
							<div className='placeorder-section-header'>
								<h2 className='placeorder-section-title'>Shipping Address</h2>
								<Link to='/shipping' className='placeorder-section-edit'>
									Edit
								</Link>
							</div>
							<p className='placeorder-meta'>
								{shippingAddress?.address}
								<br />
								{shippingAddress?.city}, {shippingAddress?.postalCode}
								<br />
								<strong>{shippingAddress?.country}</strong>
							</p>
						</div>

						<div className='placeorder-section'>
							<div className='placeorder-section-header'>
								<h2 className='placeorder-section-title'>Payment Method</h2>
								<Link to='/payment' className='placeorder-section-edit'>
									Edit
								</Link>
							</div>
							<p className='placeorder-meta'>{paymentMethod}</p>
						</div>

						<div className='placeorder-section'>
							<div className='placeorder-section-header'>
								<h2 className='placeorder-section-title'>Order Items</h2>
								<Link to='/cart' className='placeorder-section-edit'>
									Edit
								</Link>
							</div>
							{cartItems.map((item) => (
								<div key={item.product} className='placeorder-item'>
									{getImageSrc(item.image) ? (
										<img
											src={getImageSrc(item.image)}
											alt={item.name}
											className='placeorder-item-img'
										/>
									) : (
										<div className='placeorder-item-placeholder'>☕</div>
									)}
									<Link
										to={`/product/${item.product}`}
										className='placeorder-item-name'
									>
										{item.name}
									</Link>
									<span className='placeorder-item-price'>
										{item.qty} × ${item.price} ={' '}
										<strong>${(item.qty * item.price).toFixed(2)}</strong>
									</span>
								</div>
							))}
						</div>
					</div>

					<div className='placeorder-summary'>
						<h2 className='placeorder-summary-title'>Order Summary</h2>
						<div className='placeorder-summary-divider' />
						<div className='placeorder-summary-row'>
							<span className='placeorder-summary-label'>Subtotal</span>
							<span className='placeorder-summary-value'>${itemsPrice}</span>
						</div>
						<div className='placeorder-summary-row'>
							<span className='placeorder-summary-label'>Shipping</span>
							{shippingPrice === 0 ? (
								<span className='placeorder-summary-free'>FREE</span>
							) : (
								<span className='placeorder-summary-value'>
									${shippingPrice}
								</span>
							)}
						</div>
						<div className='placeorder-summary-row'>
							<span className='placeorder-summary-label'>Tax (8%)</span>
							<span className='placeorder-summary-value'>${taxPrice}</span>
						</div>
						<div className='placeorder-summary-total-row'>
							<span className='placeorder-summary-total-label'>Total</span>
							<span className='placeorder-summary-total-value'>
								${totalPrice}
							</span>
						</div>
						{error && (
							<div className='placeorder-error'>
								{error.detail || 'Something went wrong.'}
							</div>
						)}
						<button
							onClick={placeOrderHandler}
							disabled={cartItems.length === 0 || loading}
							className='placeorder-btn'
						>
							{loading ? 'Placing Order...' : 'Place Order'}
						</button>
						<p className='placeorder-freeship'>
							{Number(itemsPrice) > 30
								? '✦ Free shipping applied'
								: `Add $${(30 - Number(itemsPrice)).toFixed(2)} more for free shipping`}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default PlaceOrderPage;
