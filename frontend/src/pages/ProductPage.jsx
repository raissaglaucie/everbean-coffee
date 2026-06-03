import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { listProductDetails } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const productImages = {
	drinks:
		'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=85',
	beans:
		'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900&q=85',
	food: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900&q=85',
	merch:
		'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&q=85',
};

const fallbackImage =
	'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=85';

function StarRating({ value, onChange, interactive = false }) {
	const [hovered, setHovered] = useState(0);
	const display = interactive ? hovered || value : value;

	return (
		<div style={{ display: 'flex', gap: '0.25rem' }}>
			{[1, 2, 3, 4, 5].map((star) => (
				<span
					key={star}
					onClick={() => interactive && onChange(star)}
					onMouseEnter={() => interactive && setHovered(star)}
					onMouseLeave={() => interactive && setHovered(0)}
					style={{
						color:
							star <= display
								? 'var(--accent-gold, #C9A96E)'
								: 'var(--cream, #F2E8DC)',
						fontSize: interactive ? '1.5rem' : '0.85rem',
						cursor: interactive ? 'pointer' : 'default',
						transition: 'color 0.15s',
					}}
				>
					★
				</span>
			))}
		</div>
	);
}

function ProductPage() {
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
	const [reviewSuccess, setReviewSuccess] = useState(false);
	const [reviewError, setReviewError] = useState('');
	const [reviewLoading, setReviewLoading] = useState(false);
	const [focused, setFocused] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const { product, loading, error } = useSelector((state) => state.products);
	const { userInfo } = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(listProductDetails(id));
		setReviewSuccess(false);
		setReviewError('');
	}, [dispatch, id, reviewSuccess]);

	const addToCartHandler = () => {
		dispatch(addToCart({ ...product, product: product._id, qty }));
		navigate('/cart');
	};

	const submitReviewHandler = async (e) => {
		e.preventDefault();
		if (rating === 0) {
			setReviewError('Please select a rating');
			return;
		}
		setReviewLoading(true);
		setReviewError('');
		try {
			await axios.post(
				`${API_URL}/api/products/${id}/reviews/`,
				{ rating, comment },
				{ headers: { Authorization: `Bearer ${userInfo.token}` } },
			);
			setReviewSuccess(true);
			setRating(0);
			setComment('');
		} catch (err) {
			setReviewError(
				err.response?.data?.detail || 'Something went wrong. Try again.',
			);
		} finally {
			setReviewLoading(false);
		}
	};

	const getImageSrc = (img) => {
		if (!img)
			return productImages[product.category?.toLowerCase()] || fallbackImage;
		if (img.startsWith('http')) return img;
		return `${API_URL}${img}`;
	};

	if (loading)
		return (
			<div
				style={{
					height: '80vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'var(--espresso)',
					fontFamily: 'Cormorant Garamond, serif',
					color: 'var(--accent-gold)',
					fontSize: '1.5rem',
					fontWeight: '300',
					letterSpacing: '3px',
				}}
			>
				Brewing...
			</div>
		);

	if (error) return <p style={{ padding: '2rem', color: 'red' }}>{error}</p>;

	const reviews = product.reviews || [];

	return (
		<>
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        .reviews-section {
          background: var(--milk-foam, #FAF6F1);
          padding: 5rem 4rem;
          border-top: 1px solid var(--cream, #F2E8DC);
        }
        .reviews-inner {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        .reviews-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          font-weight: 300;
          color: var(--espresso, #0D0705);
          margin-bottom: 0.5rem;
        }
        .reviews-divider {
          width: 32px;
          height: 1px;
          background: var(--accent-gold, #C9A96E);
          margin-bottom: 2rem;
        }
        .review-item {
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--cream, #F2E8DC);
        }
        .review-item:last-child { border-bottom: none; }
        .review-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .review-author {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--espresso, #0D0705);
        }
        .review-date {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem;
          color: var(--latte, #C4956A);
          letter-spacing: 0.1em;
        }
        .review-comment {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.82rem;
          color: var(--coffee, #4A2515);
          line-height: 1.7;
          margin-top: 0.5rem;
        }
        .review-empty {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-style: italic;
          color: var(--latte, #C4956A);
          padding: 1.5rem 0;
        }

        /* Form */
        .review-form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          font-weight: 300;
          color: var(--espresso, #0D0705);
          margin-bottom: 0.5rem;
        }
        .review-field {
          position: relative;
          margin-bottom: 1.8rem;
        }
        .review-field label {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--coffee, #4A2515);
          margin-bottom: 0.5rem;
          transition: color 0.2s;
        }
        .review-field.focused label { color: var(--accent-gold, #C9A96E); }
        .review-field textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--latte, #C4956A);
          padding: 0.6rem 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          color: var(--espresso, #0D0705);
          outline: none;
          resize: none;
          box-sizing: border-box;
          transition: border-color 0.25s;
        }
        .review-field textarea::placeholder {
          color: var(--latte, #C4956A);
          font-style: italic;
          opacity: 0.6;
        }
        .review-field-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent-gold, #C9A96E);
          transition: width 0.3s ease;
        }
        .review-field.focused .review-field-line { width: 100%; }
        .review-submit {
          width: 100%;
          padding: 0.9rem;
          background: var(--espresso, #0D0705);
          color: var(--cream, #F2E8DC);
          border: none;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.25s;
        }
        .review-submit:hover:not(:disabled) { background: var(--coffee, #4A2515); }
        .review-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .review-success {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem;
          color: #2d7a4f;
          padding: 0.8rem 1rem;
          border-left: 3px solid var(--accent-gold, #C9A96E);
          background: rgba(201,169,110,0.08);
          margin-bottom: 1rem;
        }
        .review-error {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem;
          color: #c0392b;
          padding: 0.8rem 1rem;
          border-left: 3px solid #c0392b;
          background: rgba(192,57,43,0.05);
          margin-bottom: 1rem;
        }
        .review-login-note {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          font-style: italic;
          color: var(--latte, #C4956A);
          padding: 1.5rem 0;
        }
        .review-login-note a {
          color: var(--accent-gold, #C9A96E);
          text-decoration: none;
          border-bottom: 1px solid var(--accent-gold, #C9A96E);
        }
        @media (max-width: 768px) {
          .reviews-inner { grid-template-columns: 1fr; }
          .reviews-section { padding: 3rem 1.5rem; }
        }
      `}</style>

			<div style={{ backgroundColor: 'var(--milk-foam)', minHeight: '100vh' }}>
				{/* Back button */}
				<div
					style={{
						padding: '2rem 3rem',
						borderBottom: '1px solid var(--cream)',
						backgroundColor: 'var(--milk-foam)',
					}}
				>
					<button
						onClick={() => navigate(-1)}
						style={{
							backgroundColor: 'transparent',
							border: 'none',
							color: 'var(--coffee)',
							cursor: 'pointer',
							fontFamily: 'Montserrat, sans-serif',
							fontSize: '0.7rem',
							letterSpacing: '2px',
							textTransform: 'uppercase',
							display: 'flex',
							alignItems: 'center',
							gap: '0.8rem',
						}}
					>
						← Back to Menu
					</button>
				</div>

				{/* Main content — split layout */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						minHeight: '80vh',
					}}
				>
					{/* Image */}
					<div
						style={{
							position: 'relative',
							overflow: 'hidden',
							minHeight: '600px',
						}}
					>
						<img
							src={getImageSrc(product.image)}
							alt={product.name}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
								objectPosition: 'center',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								inset: 0,
								background:
									'linear-gradient(to right, rgba(13,7,5,0.2) 0%, transparent 100%)',
							}}
						/>
					</div>

					{/* Details */}
					<div
						style={{
							padding: '5rem 4rem',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							backgroundColor: 'var(--milk-foam)',
						}}
					>
						<p
							style={{
								color: 'var(--accent-gold)',
								fontSize: '0.65rem',
								letterSpacing: '4px',
								textTransform: 'uppercase',
								fontFamily: 'Montserrat',
								marginBottom: '1.5rem',
							}}
						>
							{product.category}
							{product.origin && ` · ${product.origin}`}
						</p>

						<h1
							style={{
								fontFamily: 'Cormorant Garamond, serif',
								color: 'var(--espresso)',
								fontSize: 'clamp(2.5rem, 4vw, 4rem)',
								fontWeight: '300',
								lineHeight: '1.05',
								marginBottom: '1.5rem',
								letterSpacing: '-1px',
							}}
						>
							{product.name}
						</h1>

						{product.rating > 0 && (
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.5rem',
									marginBottom: '2rem',
								}}
							>
								<StarRating value={Math.round(product.rating)} />
								<span
									style={{
										color: 'var(--coffee)',
										fontSize: '0.75rem',
										fontFamily: 'Montserrat',
									}}
								>
									{product.rating} ({product.numReviews} reviews)
								</span>
							</div>
						)}

						<div
							style={{
								width: '40px',
								height: '1px',
								backgroundColor: 'var(--accent-gold)',
								marginBottom: '2rem',
							}}
						/>

						<p
							style={{
								color: 'var(--coffee)',
								fontSize: '0.95rem',
								lineHeight: '2',
								fontWeight: '300',
								marginBottom: '2.5rem',
								maxWidth: '420px',
							}}
						>
							{product.description}
						</p>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '0.8rem',
								marginBottom: '2.5rem',
								padding: '1.5rem',
								backgroundColor: 'var(--cream)',
							}}
						>
							{product.origin && (
								<div
									style={{ display: 'flex', justifyContent: 'space-between' }}
								>
									<span
										style={{
											color: 'var(--coffee)',
											fontSize: '0.7rem',
											letterSpacing: '2px',
											textTransform: 'uppercase',
											fontFamily: 'Montserrat',
										}}
									>
										Origin
									</span>
									<span
										style={{
											color: 'var(--espresso)',
											fontSize: '0.85rem',
											fontFamily: 'Cormorant Garamond',
											fontWeight: '600',
										}}
									>
										{product.origin}
									</span>
								</div>
							)}
							{product.roast_level && (
								<div
									style={{ display: 'flex', justifyContent: 'space-between' }}
								>
									<span
										style={{
											color: 'var(--coffee)',
											fontSize: '0.7rem',
											letterSpacing: '2px',
											textTransform: 'uppercase',
											fontFamily: 'Montserrat',
										}}
									>
										Roast
									</span>
									<span
										style={{
											color: 'var(--espresso)',
											fontSize: '0.85rem',
											fontFamily: 'Cormorant Garamond',
											fontWeight: '600',
											textTransform: 'capitalize',
										}}
									>
										{product.roast_level}
									</span>
								</div>
							)}
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<span
									style={{
										color: 'var(--coffee)',
										fontSize: '0.7rem',
										letterSpacing: '2px',
										textTransform: 'uppercase',
										fontFamily: 'Montserrat',
									}}
								>
									Availability
								</span>
								<span
									style={{
										color: product.countInStock > 0 ? '#2D6A4F' : '#E63946',
										fontSize: '0.85rem',
										fontFamily: 'Montserrat',
										fontWeight: '600',
									}}
								>
									{product.countInStock > 0 ? 'In Stock' : 'Sold Out'}
								</span>
							</div>
						</div>

						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								marginBottom: '1.5rem',
							}}
						>
							<p
								style={{
									fontFamily: 'Cormorant Garamond, serif',
									color: 'var(--espresso)',
									fontSize: '2.5rem',
									fontWeight: '300',
								}}
							>
								${product.price}
							</p>
							{product.countInStock > 0 && (
								<div
									style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
								>
									<span
										style={{
											color: 'var(--coffee)',
											fontSize: '0.7rem',
											letterSpacing: '2px',
											textTransform: 'uppercase',
											fontFamily: 'Montserrat',
										}}
									>
										Qty
									</span>
									<select
										value={qty}
										onChange={(e) => setQty(Number(e.target.value))}
										style={{
											padding: '0.5rem 1rem',
											border: '1px solid var(--latte)',
											backgroundColor: 'transparent',
											color: 'var(--espresso)',
											fontFamily: 'Montserrat',
											fontSize: '0.85rem',
											cursor: 'pointer',
										}}
									>
										{[...Array(Math.min(product.countInStock, 10)).keys()].map(
											(x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											),
										)}
									</select>
								</div>
							)}
						</div>

						<button
							onClick={addToCartHandler}
							disabled={product.countInStock === 0}
							style={{
								backgroundColor:
									product.countInStock > 0 ? 'var(--espresso)' : 'var(--cream)',
								color:
									product.countInStock > 0 ? 'var(--cream)' : 'var(--coffee)',
								border: 'none',
								padding: '1.2rem 3rem',
								fontSize: '0.7rem',
								fontFamily: 'Montserrat, sans-serif',
								fontWeight: '600',
								letterSpacing: '3px',
								textTransform: 'uppercase',
								cursor: product.countInStock > 0 ? 'pointer' : 'not-allowed',
								transition: 'all 0.3s',
								width: '100%',
							}}
							onMouseEnter={(e) => {
								if (product.countInStock > 0)
									e.target.style.backgroundColor = 'var(--coffee)';
							}}
							onMouseLeave={(e) => {
								if (product.countInStock > 0)
									e.target.style.backgroundColor = 'var(--espresso)';
							}}
						>
							{product.countInStock > 0 ? 'Add to Cart' : 'Sold Out'}
						</button>
					</div>
				</div>

				{/* ─── Reviews Section ─── */}
				<div className='reviews-section'>
					<div className='reviews-inner'>
						{/* Left: existing reviews */}
						<div>
							<h2 className='reviews-title'>
								{reviews.length > 0
									? `${reviews.length} Review${reviews.length > 1 ? 's' : ''}`
									: 'Reviews'}
							</h2>
							<div className='reviews-divider' />

							{reviews.length === 0 ? (
								<p className='review-empty'>
									No reviews yet — be the first to share your thoughts.
								</p>
							) : (
								reviews.map((review) => (
									<div key={review._id} className='review-item'>
										<div className='review-header'>
											<span className='review-author'>
												{review.name || 'Anonymous'}
											</span>
											<span className='review-date'>
												{review.createdAt?.substring(0, 10)}
											</span>
										</div>
										<StarRating value={review.rating} />
										<p className='review-comment'>{review.comment}</p>
									</div>
								))
							)}
						</div>

						{/* Right: write a review */}
						<div>
							<h2 className='review-form-title'>Write a Review</h2>
							<div className='reviews-divider' />

							{!userInfo ? (
								<p className='review-login-note'>
									Please <a href='/login'>sign in</a> to leave a review.
								</p>
							) : reviewSuccess ? (
								<div className='review-success'>
									✦ Your review has been submitted. Thank you!
								</div>
							) : (
								<form onSubmit={submitReviewHandler}>
									{reviewError && (
										<div className='review-error'>{reviewError}</div>
									)}

									<div
										className='review-field'
										style={{ marginBottom: '1.8rem' }}
									>
										<label>Your Rating</label>
										<StarRating
											value={rating}
											onChange={setRating}
											interactive
										/>
										{rating === 0 && (
											<p
												style={{
													fontFamily: 'Montserrat',
													fontSize: '0.65rem',
													color: 'var(--latte)',
													marginTop: '0.4rem',
													fontStyle: 'italic',
												}}
											>
												Click a star to rate
											</p>
										)}
									</div>

									<div
										className={`review-field${focused === 'comment' ? ' focused' : ''}`}
									>
										<label htmlFor='comment'>Your Comment</label>
										<textarea
											id='comment'
											rows={4}
											placeholder='Share your experience with this product…'
											value={comment}
											onFocus={() => setFocused('comment')}
											onBlur={() => setFocused('')}
											onChange={(e) => setComment(e.target.value)}
										/>
										<div className='review-field-line' />
									</div>

									<button
										type='submit'
										className='review-submit'
										disabled={reviewLoading}
									>
										{reviewLoading ? 'Submitting…' : 'Submit Review'}
									</button>
								</form>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProductPage;
