import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function OrderPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { userInfo } = useSelector((state) => state.user);
	const [order, setOrder] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!userInfo) {
			navigate('/login');
			return;
		}
		const fetchOrder = async () => {
			try {
				const { data } = await axios.get(`/api/orders/${id}/`, {
					headers: { Authorization: `Bearer ${userInfo.token}` },
				});
				setOrder(data);
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};
		fetchOrder();
	}, [id, userInfo, navigate]);

	const statusSteps = ['Confirmed', 'Processing', 'Shipped', 'Delivered'];
	const currentStep = order?.isDelivered ? 3 : order?.isPaid ? 2 : 1;

	return (
		<>
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        .order-page { min-height: calc(100vh - 80px); background: var(--milk-foam, #FAF6F1); padding: 3rem 2rem; }
        .order-inner { max-width: 820px; margin: 0 auto; }
        .order-hero {
          text-align: center; padding: 3rem 2rem 2.5rem;
          background: var(--dark-roast, #1A0E0A); position: relative;
          overflow: hidden; margin-bottom: 2rem;
        }
        .order-hero::before, .order-hero::after {
          content: ''; position: absolute; border-radius: 50%; background: rgba(201,169,110,0.05);
        }
        .order-hero::before { width: 300px; height: 300px; top: -150px; left: -80px; }
        .order-hero::after { width: 200px; height: 200px; bottom: -100px; right: -50px; }
        .order-hero-icon { font-size: 2.5rem; margin-bottom: 1rem; display: block; }
        .order-hero-label {
          font-family: 'Montserrat', sans-serif; font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--accent-gold, #C9A96E); margin-bottom: 0.6rem;
        }
        .order-hero-title {
          font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 300;
          color: var(--cream, #F2E8DC); line-height: 1.1; margin-bottom: 1rem;
        }
        .order-hero-id {
          font-family: 'Montserrat', sans-serif; font-size: 0.7rem;
          letter-spacing: 0.15em; color: rgba(196,149,106,0.6);
        }
        .order-tracker {
          background: white; padding: 2rem;
          border: 1px solid rgba(196,149,106,0.15); margin-bottom: 1.5rem;
        }
        .order-tracker-title {
          font-family: 'Montserrat', sans-serif; font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--latte, #C4956A); margin-bottom: 1.8rem;
        }
        .order-tracker-steps { display: flex; align-items: flex-start; }
        .order-tracker-step {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; position: relative;
        }
        .order-tracker-step:not(:last-child)::after {
          content: ''; position: absolute; top: 12px; left: 50%;
          width: 100%; height: 1px; background: var(--cream, #F2E8DC); z-index: 0;
        }
        .order-tracker-step.done:not(:last-child)::after { background: var(--accent-gold, #C9A96E); }
        .order-tracker-dot {
          width: 24px; height: 24px; border-radius: 50%;
          border: 1.5px solid var(--cream, #F2E8DC); background: white;
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 1; margin-bottom: 0.6rem;
        }
        .order-tracker-step.done .order-tracker-dot {
          background: var(--accent-gold, #C9A96E); border-color: var(--accent-gold, #C9A96E);
        }
        .order-tracker-step.active .order-tracker-dot {
          background: var(--espresso, #0D0705); border-color: var(--espresso, #0D0705);
        }
        .order-tracker-dot-inner { width: 8px; height: 8px; border-radius: 50%; }
        .order-tracker-step.done .order-tracker-dot-inner,
        .order-tracker-step.active .order-tracker-dot-inner { background: var(--cream, #F2E8DC); }
        .order-tracker-label {
          font-family: 'Montserrat', sans-serif; font-size: 0.6rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--latte, #C4956A); text-align: center;
        }
        .order-tracker-step.done .order-tracker-label { color: var(--accent-gold, #C9A96E); }
        .order-tracker-step.active .order-tracker-label { color: var(--espresso, #0D0705); }
        .order-details-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;
        }
        .order-detail-card {
          background: white; padding: 1.5rem; border: 1px solid rgba(196,149,106,0.15);
        }
        .order-detail-card-label {
          font-family: 'Montserrat', sans-serif; font-size: 0.58rem; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--latte, #C4956A); margin-bottom: 0.6rem;
        }
        .order-detail-card-value {
          font-family: 'Cormorant Garamond', serif; font-size: 1.1rem;
          color: var(--espresso, #0D0705); line-height: 1.5;
        }
        .order-summary-card {
          background: white; padding: 2rem;
          border: 1px solid rgba(196,149,106,0.15); margin-bottom: 2rem;
        }
        .order-summary-title {
          font-family: 'Cormorant Garamond', serif; font-size: 1.4rem;
          color: var(--espresso, #0D0705); margin-bottom: 1.5rem;
          padding-bottom: 0.8rem; border-bottom: 1px solid var(--cream, #F2E8DC);
        }
        .order-summary-row {
          display: flex; justify-content: space-between;
          font-family: 'Montserrat', sans-serif; font-size: 0.8rem;
          color: var(--coffee, #4A2515); margin-bottom: 0.7rem;
        }
        .order-summary-total {
          display: flex; justify-content: space-between; align-items: baseline;
          padding-top: 1rem; margin-top: 0.5rem;
          border-top: 1px solid var(--cream, #F2E8DC);
        }
        .order-summary-total-label {
          font-family: 'Montserrat', sans-serif; font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.15em; text-transform: uppercase; color: var(--espresso, #0D0705);
        }
        .order-summary-total-value {
          font-family: 'Cormorant Garamond', serif; font-size: 2rem;
          font-weight: 300; color: var(--espresso, #0D0705);
        }
        .order-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
        .order-btn-primary {
          flex: 1; padding: 1rem 2rem; background: var(--espresso, #0D0705);
          color: var(--cream, #F2E8DC); text-decoration: none;
          font-family: 'Montserrat', sans-serif; font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase; text-align: center;
          transition: background 0.25s; display: block;
        }
        .order-btn-primary:hover { background: var(--coffee, #4A2515); }
        .order-btn-secondary {
          flex: 1; padding: 1rem 2rem; background: transparent;
          color: var(--espresso, #0D0705); text-decoration: none;
          font-family: 'Montserrat', sans-serif; font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase; text-align: center;
          border: 1px solid var(--espresso, #0D0705); transition: all 0.25s; display: block;
        }
        .order-btn-secondary:hover { background: var(--espresso, #0D0705); color: var(--cream, #F2E8DC); }
        .order-loading {
          text-align: center; padding: 4rem;
          font-family: 'Cormorant Garamond', serif; font-size: 1.5rem;
          font-style: italic; color: var(--latte, #C4956A);
        }
        @media (max-width: 600px) {
          .order-details-grid { grid-template-columns: 1fr; }
          .order-hero-title { font-size: 2.2rem; }
        }
      `}</style>

			<div className='order-page'>
				<div className='order-inner'>
					{loading ? (
						<p className='order-loading'>Loading your order…</p>
					) : (
						<>
							<div className='order-hero'>
								<span className='order-hero-icon'>☕</span>
								<p className='order-hero-label'>Order Confirmed</p>
								<h1 className='order-hero-title'>
									Thank you
									<br />
									for your order
								</h1>
								<p className='order-hero-id'>Order #{id}</p>
							</div>

							<div className='order-tracker'>
								<p className='order-tracker-title'>Order Status</p>
								<div className='order-tracker-steps'>
									{statusSteps.map((step, idx) => {
										const isDone = idx < currentStep;
										const isActive = idx === currentStep;
										return (
											<div
												key={step}
												className={`order-tracker-step${isDone ? ' done' : ''}${isActive ? ' active' : ''}`}
											>
												<div className='order-tracker-dot'>
													<div className='order-tracker-dot-inner' />
												</div>
												<span className='order-tracker-label'>{step}</span>
											</div>
										);
									})}
								</div>
							</div>

							{order && (
								<div className='order-details-grid'>
									<div className='order-detail-card'>
										<p className='order-detail-card-label'>Shipping To</p>
										<p className='order-detail-card-value'>
											{order.shippingAddress?.address}
											<br />
											{order.shippingAddress?.city},{' '}
											{order.shippingAddress?.postalCode}
											<br />
											{order.shippingAddress?.country}
										</p>
									</div>
									<div className='order-detail-card'>
										<p className='order-detail-card-label'>Payment Method</p>
										<p className='order-detail-card-value'>
											{order.paymentMethod}
											<br />
											<span
												style={{
													fontSize: '0.85rem',
													fontStyle: 'italic',
													color: 'var(--latte)',
												}}
											>
												{order.isPaid
													? `Paid on ${order.paidAt?.substring(0, 10)}`
													: 'Payment pending'}
											</span>
										</p>
									</div>
								</div>
							)}

							{order && (
								<div className='order-summary-card'>
									<h2 className='order-summary-title'>Order Summary</h2>
									<div className='order-summary-row'>
										<span>Items</span>
										<span>${order.itemsPrice}</span>
									</div>
									<div className='order-summary-row'>
										<span>Shipping</span>
										<span>
											{Number(order.shippingPrice) === 0
												? 'Free'
												: `$${order.shippingPrice}`}
										</span>
									</div>
									<div className='order-summary-row'>
										<span>Tax</span>
										<span>${order.taxPrice}</span>
									</div>
									<div className='order-summary-total'>
										<span className='order-summary-total-label'>Total</span>
										<span className='order-summary-total-value'>
											${order.totalPrice}
										</span>
									</div>
								</div>
							)}

							<div className='order-actions'>
								<Link to='/' className='order-btn-primary'>
									Continue Shopping
								</Link>
								<Link to='/profile' className='order-btn-secondary'>
									View All Orders
								</Link>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default OrderPage;
