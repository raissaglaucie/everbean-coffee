import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../redux/slices/productSlice';

const categories = ['all', 'drinks', 'beans', 'food', 'merch'];

function HomePage() {
	const dispatch = useDispatch();
	const { products, loading, error } = useSelector((state) => state.products);
	const [activeCategory, setActiveCategory] = useState('all');

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	const filtered =
		activeCategory === 'all'
			? products
			: products.filter((p) => p.category === activeCategory);

	return (
		<div>
			{/* HERO */}
			<div
				style={{
					background:
						'linear-gradient(135deg, var(--espresso) 0%, var(--dark-roast) 50%, var(--coffee) 100%)',
					padding: '5rem 2rem',
					textAlign: 'center',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				{/* Background circles decoration */}
				<div
					style={{
						position: 'absolute',
						width: '400px',
						height: '400px',
						borderRadius: '50%',
						border: '1px solid rgba(212,168,83,0.1)',
						top: '-100px',
						left: '-100px',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						width: '300px',
						height: '300px',
						borderRadius: '50%',
						border: '1px solid rgba(212,168,83,0.1)',
						bottom: '-80px',
						right: '-80px',
					}}
				/>

				<p
					style={{
						color: 'var(--accent-gold)',
						letterSpacing: '4px',
						fontSize: '0.85rem',
						textTransform: 'uppercase',
						marginBottom: '1rem',
						fontFamily: 'Lato, sans-serif',
					}}
				>
					Crafted for moments that matter
				</p>

				<h1
					style={{
						fontFamily: 'Playfair Display, serif',
						color: 'var(--milk-foam)',
						fontSize: 'clamp(2.5rem, 6vw, 5rem)',
						lineHeight: '1.1',
						marginBottom: '1.5rem',
						letterSpacing: '-1px',
					}}
				>
					Every Sip Tells
					<br />
					<span style={{ color: 'var(--accent-gold)' }}>a Story</span>
				</h1>

				<p
					style={{
						color: 'var(--cream)',
						fontSize: '1.1rem',
						maxWidth: '500px',
						margin: '0 auto 2.5rem',
						lineHeight: '1.7',
						opacity: 0.9,
					}}
				>
					From single-origin beans to handcrafted lattes — discover your perfect
					cup at EverBean.
				</p>

				<div
					style={{
						display: 'flex',
						gap: '1rem',
						justifyContent: 'center',
						flexWrap: 'wrap',
					}}
				>
					<Link
						to='#products'
						style={{
							backgroundColor: 'var(--accent-gold)',
							color: 'var(--espresso)',
							padding: '0.9rem 2.5rem',
							borderRadius: '50px',
							textDecoration: 'none',
							fontFamily: 'Lato, sans-serif',
							fontWeight: '700',
							letterSpacing: '1px',
							fontSize: '0.95rem',
						}}
						onClick={(e) => {
							e.preventDefault();
							document
								.getElementById('products')
								.scrollIntoView({ behavior: 'smooth' });
						}}
					>
						Explore Our Menu ☕
					</Link>

					<Link
						to='/register'
						style={{
							backgroundColor: 'transparent',
							color: 'var(--cream)',
							padding: '0.9rem 2.5rem',
							borderRadius: '50px',
							textDecoration: 'none',
							fontFamily: 'Lato, sans-serif',
							fontWeight: '700',
							letterSpacing: '1px',
							fontSize: '0.95rem',
							border: '1px solid rgba(255,255,255,0.3)',
						}}
					>
						Join EverBean
					</Link>
				</div>

				{/* Stats */}
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						gap: '3rem',
						marginTop: '4rem',
						flexWrap: 'wrap',
					}}
				>
					{[
						{ number: '20+', label: 'Coffee Origins' },
						{ number: '50+', label: 'Menu Items' },
						{ number: '4.9★', label: 'Customer Rating' },
					].map((stat) => (
						<div key={stat.label} style={{ textAlign: 'center' }}>
							<p
								style={{
									fontFamily: 'Playfair Display, serif',
									color: 'var(--accent-gold)',
									fontSize: '2rem',
									fontWeight: '700',
									marginBottom: '0.2rem',
								}}
							>
								{stat.number}
							</p>
							<p
								style={{
									color: 'var(--cream)',
									fontSize: '0.8rem',
									letterSpacing: '2px',
									textTransform: 'uppercase',
									opacity: 0.7,
								}}
							>
								{stat.label}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* FEATURES STRIP */}
			<div
				style={{
					backgroundColor: 'var(--cream)',
					padding: '1.5rem 2rem',
					display: 'flex',
					justifyContent: 'center',
					gap: '3rem',
					flexWrap: 'wrap',
				}}
			>
				{[
					{ icon: '🚚', text: 'Free shipping over $30' },
					{ icon: '🫘', text: 'Single origin beans' },
					{ icon: '♻️', text: 'Sustainable packaging' },
					{ icon: '⭐', text: 'Roasted fresh weekly' },
				].map((f) => (
					<div
						key={f.text}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '0.5rem',
							color: 'var(--coffee)',
							fontSize: '0.9rem',
							fontWeight: '700',
						}}
					>
						<span>{f.icon}</span>
						<span>{f.text}</span>
					</div>
				))}
			</div>

			{/* PRODUCTS SECTION */}
			<div
				id='products'
				style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}
			>
				<div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
					<h2
						style={{
							fontFamily: 'Playfair Display, serif',
							color: 'var(--espresso)',
							fontSize: '2.2rem',
							marginBottom: '0.5rem',
						}}
					>
						Our Menu
					</h2>
					<p style={{ color: 'var(--coffee)', opacity: 0.8 }}>
						Handcrafted with love, served with care
					</p>
				</div>

				{/* CATEGORY FILTERS */}
				<div
					style={{
						display: 'flex',
						gap: '0.8rem',
						justifyContent: 'center',
						marginBottom: '2.5rem',
						flexWrap: 'wrap',
					}}
				>
					{categories.map((cat) => (
						<button
							key={cat}
							onClick={() => setActiveCategory(cat)}
							style={{
								padding: '0.5rem 1.5rem',
								borderRadius: '50px',
								border:
									activeCategory === cat
										? '2px solid var(--espresso)'
										: '2px solid var(--latte)',
								backgroundColor:
									activeCategory === cat ? 'var(--espresso)' : 'transparent',
								color:
									activeCategory === cat ? 'var(--cream)' : 'var(--coffee)',
								cursor: 'pointer',
								fontFamily: 'Lato, sans-serif',
								fontWeight: '700',
								fontSize: '0.85rem',
								letterSpacing: '1px',
								textTransform: 'uppercase',
								transition: 'all 0.2s',
							}}
						>
							{cat === 'all'
								? '☕ All'
								: cat === 'drinks'
									? '🥤 Drinks'
									: cat === 'beans'
										? '🫘 Beans'
										: cat === 'food'
											? '🥐 Food'
											: '🛍️ Merch'}
						</button>
					))}
				</div>

				{loading && (
					<div
						style={{
							textAlign: 'center',
							padding: '3rem',
							color: 'var(--coffee)',
						}}
					>
						Brewing your menu... ☕
					</div>
				)}

				{error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
						gap: '1.5rem',
					}}
				>
					{filtered.map((product) => (
						<Link
							key={product._id}
							to={`/product/${product._id}`}
							style={{ textDecoration: 'none' }}
						>
							<div
								style={{
									backgroundColor: 'white',
									borderRadius: '16px',
									overflow: 'hidden',
									boxShadow: '0 2px 12px rgba(28,10,0,0.08)',
									transition: 'transform 0.2s, box-shadow 0.2s',
									cursor: 'pointer',
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = 'translateY(-6px)';
									e.currentTarget.style.boxShadow =
										'0 12px 28px rgba(28,10,0,0.15)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = 'translateY(0)';
									e.currentTarget.style.boxShadow =
										'0 2px 12px rgba(28,10,0,0.08)';
								}}
							>
								{/* Product Image Placeholder */}
								<div
									style={{
										backgroundColor: 'var(--cream)',
										height: '180px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: '4rem',
										position: 'relative',
									}}
								>
									{product.category === 'drinks'
										? '☕'
										: product.category === 'beans'
											? '🫘'
											: product.category === 'food'
												? '🥐'
												: '🛍️'}

									{product.is_seasonal && (
										<span
											style={{
												position: 'absolute',
												top: '0.8rem',
												right: '0.8rem',
												backgroundColor: 'var(--accent-gold)',
												color: 'var(--espresso)',
												padding: '0.2rem 0.6rem',
												borderRadius: '20px',
												fontSize: '0.65rem',
												fontWeight: '700',
												letterSpacing: '1px',
											}}
										>
											SEASONAL
										</span>
									)}
								</div>

								<div style={{ padding: '1.2rem' }}>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'start',
											marginBottom: '0.5rem',
										}}
									>
										<h3
											style={{
												color: 'var(--espresso)',
												fontFamily: 'Playfair Display, serif',
												fontSize: '1.1rem',
												flex: 1,
											}}
										>
											{product.name}
										</h3>
										<span
											style={{
												color: 'var(--latte)',
												fontWeight: '700',
												fontSize: '1.1rem',
												marginLeft: '0.5rem',
											}}
										>
											${product.price}
										</span>
									</div>

									{product.origin && (
										<p
											style={{
												color: 'var(--coffee)',
												fontSize: '0.8rem',
												marginBottom: '0.5rem',
											}}
										>
											🌍 {product.origin}
										</p>
									)}

									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: '0.8rem',
										}}
									>
										<span
											style={{
												backgroundColor: 'var(--cream)',
												color: 'var(--coffee)',
												padding: '0.2rem 0.6rem',
												borderRadius: '20px',
												fontSize: '0.7rem',
												textTransform: 'uppercase',
												letterSpacing: '1px',
												fontWeight: '700',
											}}
										>
											{product.category}
										</span>

										{product.rating > 0 && (
											<span
												style={{
													color: 'var(--accent-gold)',
													fontSize: '0.85rem',
												}}
											>
												⭐ {product.rating}
											</span>
										)}
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>

				{filtered.length === 0 && !loading && (
					<div
						style={{
							textAlign: 'center',
							padding: '3rem',
							color: 'var(--coffee)',
						}}
					>
						<p style={{ fontSize: '1.1rem' }}>
							No items in this category yet ☕
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default HomePage;
