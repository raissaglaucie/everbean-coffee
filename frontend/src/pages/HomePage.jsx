import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../redux/slices/productSlice';
import WeatherWidget from '../components/WeatherWidget';

const categories = ['all', 'drinks', 'beans', 'food', 'merch'];

const productImages = {
	drinks:
		'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80',
	beans:
		'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80',
	food: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80',
	merch:
		'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
};

const fallbackImage =
	'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80';

function HomePage() {
	const dispatch = useDispatch();
	const { products, loading, error } = useSelector((state) => state.products);
	const [activeCategory, setActiveCategory] = useState('all');
	const [heroLoaded, setHeroLoaded] = useState(false);

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	const filtered =
		activeCategory === 'all'
			? products
			: products.filter((p) => p.category === activeCategory);

	return (
		<div style={{ backgroundColor: 'var(--espresso)' }}>
			{/* HERO */}
			<div
				style={{
					position: 'relative',
					height: '100vh',
					minHeight: '700px',
					overflow: 'hidden',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/* Background image */}
				<img
					src='https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1800&q=90'
					alt='Coffee'
					onLoad={() => setHeroLoaded(true)}
					style={{
						position: 'absolute',
						inset: 0,
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'center',
						opacity: heroLoaded ? 0.35 : 0,
						transition: 'opacity 1.2s ease',
					}}
				/>

				{/* Gradient overlay */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background:
							'linear-gradient(to bottom, rgba(13,7,5,0.3) 0%, rgba(13,7,5,0.5) 50%, rgba(13,7,5,0.95) 100%)',
					}}
				/>

				{/* Content */}
				<div
					style={{
						position: 'relative',
						textAlign: 'center',
						padding: '0 2rem',
						maxWidth: '900px',
					}}
				>
					<p
						style={{
							color: 'var(--accent-gold)',
							letterSpacing: '6px',
							fontSize: '0.7rem',
							textTransform: 'uppercase',
							marginBottom: '2rem',
							fontFamily: 'Montserrat, sans-serif',
							fontWeight: '500',
						}}
					>
						Est. 2024 · Seattle, Washington
					</p>

					<h1
						style={{
							fontFamily: 'Cormorant Garamond, serif',
							color: '#FFFFFF',
							fontSize: 'clamp(3.5rem, 9vw, 8rem)',
							lineHeight: '0.95',
							fontWeight: '300',
							marginBottom: '2.5rem',
							letterSpacing: '-2px',
						}}
					>
						Every Sip
						<br />
						<em style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>
							Tells a Story
						</em>
					</h1>

					<p
						style={{
							color: 'rgba(242,232,220,0.8)',
							fontSize: '1rem',
							maxWidth: '480px',
							margin: '0 auto 3.5rem',
							lineHeight: '1.8',
							fontWeight: '300',
							letterSpacing: '0.5px',
						}}
					>
						From single-origin Ethiopian highlands to handcrafted lattes —
						discover your perfect cup.
					</p>

					<div
						style={{
							display: 'flex',
							gap: '1.2rem',
							justifyContent: 'center',
							flexWrap: 'wrap',
						}}
					>
						<button
							onClick={() =>
								document
									.getElementById('products')
									.scrollIntoView({ behavior: 'smooth' })
							}
							style={{
								backgroundColor: 'var(--accent-gold)',
								color: 'var(--espresso)',
								padding: '1rem 3rem',
								border: 'none',
								fontSize: '0.75rem',
								fontFamily: 'Montserrat, sans-serif',
								fontWeight: '600',
								letterSpacing: '3px',
								textTransform: 'uppercase',
								cursor: 'pointer',
								transition: 'all 0.3s',
							}}
							onMouseEnter={(e) => (e.target.style.backgroundColor = '#E8C080')}
							onMouseLeave={(e) =>
								(e.target.style.backgroundColor = 'var(--accent-gold)')
							}
						>
							Explore Menu
						</button>

						<Link
							to='/blog'
							style={{
								backgroundColor: 'transparent',
								color: 'var(--cream)',
								padding: '1rem 3rem',
								border: '1px solid rgba(242,232,220,0.3)',
								fontSize: '0.75rem',
								fontFamily: 'Montserrat, sans-serif',
								fontWeight: '600',
								letterSpacing: '3px',
								textTransform: 'uppercase',
								textDecoration: 'none',
								transition: 'all 0.3s',
							}}
						>
							Our Journal
						</Link>
					</div>
				</div>

				{/* Scroll indicator */}
				<div
					style={{
						position: 'absolute',
						bottom: '2.5rem',
						left: '50%',
						transform: 'translateX(-50%)',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '0.5rem',
						color: 'rgba(242,232,220,0.4)',
						fontSize: '0.65rem',
						letterSpacing: '3px',
						textTransform: 'uppercase',
						fontFamily: 'Montserrat',
					}}
				>
					<span>Scroll</span>
					<div
						style={{
							width: '1px',
							height: '40px',
							backgroundColor: 'rgba(201,169,110,0.4)',
						}}
					/>
				</div>
			</div>

			{/* WEATHER WIDGET placeholder — já existe */}
			<div id='weather-section' />

			{/* FEATURES */}
			<div
				style={{
					backgroundColor: 'var(--espresso)',
					borderTop: '1px solid rgba(201,169,110,0.15)',
					borderBottom: '1px solid rgba(201,169,110,0.15)',
					padding: '2rem 3rem',
					display: 'flex',
					justifyContent: 'center',
					gap: '4rem',
					flexWrap: 'wrap',
				}}
			>
				{[
					{ icon: '✦', text: 'Free shipping over $30' },
					{ icon: '✦', text: 'Single origin beans' },
					{ icon: '✦', text: 'Sustainable packaging' },
					{ icon: '✦', text: 'Roasted fresh weekly' },
				].map((f) => (
					<div
						key={f.text}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '0.8rem',
							color: 'var(--cream)',
							fontSize: '0.7rem',
							fontWeight: '500',
							letterSpacing: '2px',
							textTransform: 'uppercase',
						}}
					>
						<span style={{ color: 'var(--accent-gold)', fontSize: '0.5rem' }}>
							{f.icon}
						</span>
						<span>{f.text}</span>
					</div>
				))}
			</div>
			<WeatherWidget />

			{/* STATS */}
			<div
				style={{
					backgroundColor: 'var(--espresso)',
					padding: '6rem 3rem',
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					maxWidth: '900px',
					margin: '0 auto',
					gap: '2rem',
					textAlign: 'center',
				}}
			>
				{[
					{ number: '20+', label: 'Coffee Origins' },
					{ number: '50+', label: 'Menu Items' },
					{ number: '4.9', label: 'Average Rating' },
				].map((stat) => (
					<div key={stat.label}>
						<p
							style={{
								fontFamily: 'Cormorant Garamond, serif',
								color: 'var(--accent-gold)',
								fontSize: '4rem',
								fontWeight: '300',
								lineHeight: '1',
								marginBottom: '0.5rem',
							}}
						>
							{stat.number}
						</p>
						<p
							style={{
								color: 'rgba(242,232,220,0.5)',
								fontSize: '0.65rem',
								letterSpacing: '3px',
								textTransform: 'uppercase',
								fontFamily: 'Montserrat',
							}}
						>
							{stat.label}
						</p>
					</div>
				))}
			</div>

			{/* PRODUCTS SECTION */}
			<div
				id='products'
				style={{
					backgroundColor: 'var(--milk-foam)',
					padding: '6rem 3rem',
				}}
			>
				<div style={{ maxWidth: '1300px', margin: '0 auto' }}>
					{/* Section header */}
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
							marginBottom: '3rem',
							paddingBottom: '2rem',
							borderBottom: '1px solid var(--cream)',
						}}
					>
						<div>
							<p
								style={{
									color: 'var(--accent-gold)',
									fontSize: '0.65rem',
									letterSpacing: '4px',
									textTransform: 'uppercase',
									fontFamily: 'Montserrat',
									marginBottom: '0.5rem',
								}}
							>
								Handcrafted with love
							</p>
							<h2
								style={{
									fontFamily: 'Cormorant Garamond, serif',
									color: 'var(--espresso)',
									fontSize: 'clamp(2.5rem, 5vw, 4rem)',
									fontWeight: '300',
									lineHeight: '1',
								}}
							>
								Our Menu
							</h2>
						</div>

						{/* Category filters */}
						<div
							style={{
								display: 'flex',
								gap: '0.5rem',
								flexWrap: 'wrap',
								justifyContent: 'flex-end',
							}}
						>
							{categories.map((cat) => (
								<button
									key={cat}
									onClick={() => setActiveCategory(cat)}
									style={{
										padding: '0.5rem 1.2rem',
										border:
											activeCategory === cat
												? '1px solid var(--espresso)'
												: '1px solid var(--latte)',
										backgroundColor:
											activeCategory === cat
												? 'var(--espresso)'
												: 'transparent',
										color:
											activeCategory === cat ? 'var(--cream)' : 'var(--coffee)',
										cursor: 'pointer',
										fontFamily: 'Montserrat, sans-serif',
										fontWeight: '500',
										fontSize: '0.65rem',
										letterSpacing: '2px',
										textTransform: 'uppercase',
										transition: 'all 0.2s',
									}}
								>
									{cat === 'all'
										? 'All'
										: cat === 'drinks'
											? 'Drinks'
											: cat === 'beans'
												? 'Beans'
												: cat === 'food'
													? 'Food'
													: 'Merch'}
								</button>
							))}
						</div>
					</div>

					{loading && (
						<div
							style={{
								textAlign: 'center',
								padding: '6rem',
								color: 'var(--coffee)',
								fontFamily: 'Cormorant Garamond',
								fontSize: '1.5rem',
								fontWeight: '300',
								letterSpacing: '2px',
							}}
						>
							Brewing your menu...
						</div>
					)}

					{/* Product grid */}
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
							gap: '1.5px',
							backgroundColor: 'var(--cream)',
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
										backgroundColor: 'var(--milk-foam)',
										overflow: 'hidden',
										cursor: 'pointer',
										position: 'relative',
										aspectRatio: '3/4',
									}}
								>
									{/* Product image */}
									<img
										src={productImages[product.category] || fallbackImage}
										alt={product.name}
										style={{
											width: '100%',
											height: '100%',
											objectFit: 'cover',
											transition: 'transform 0.6s ease',
										}}
										onMouseEnter={(e) =>
											(e.target.style.transform = 'scale(1.05)')
										}
										onMouseLeave={(e) =>
											(e.target.style.transform = 'scale(1)')
										}
									/>

									{/* Overlay on hover */}
									<div
										style={{
											position: 'absolute',
											inset: 0,
											background:
												'linear-gradient(to top, rgba(13,7,5,0.85) 0%, rgba(13,7,5,0.1) 50%, transparent 100%)',
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'flex-end',
											padding: '1.8rem',
										}}
									>
										<span
											style={{
												color: 'var(--accent-gold)',
												fontSize: '0.6rem',
												letterSpacing: '3px',
												textTransform: 'uppercase',
												fontFamily: 'Montserrat',
												marginBottom: '0.5rem',
											}}
										>
											{product.category}
											{product.origin && ` · ${product.origin}`}
										</span>

										<h3
											style={{
												fontFamily: 'Cormorant Garamond, serif',
												color: '#FFFFFF',
												fontSize: '1.6rem',
												fontWeight: '400',
												lineHeight: '1.1',
												marginBottom: '0.8rem',
											}}
										>
											{product.name}
										</h3>

										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<span
												style={{
													color: 'var(--cream)',
													fontFamily: 'Montserrat',
													fontSize: '0.85rem',
													fontWeight: '300',
												}}
											>
												${product.price}
											</span>
											{product.rating > 0 && (
												<span
													style={{
														color: 'var(--accent-gold)',
														fontSize: '0.75rem',
														fontFamily: 'Montserrat',
													}}
												>
													★ {product.rating}
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
								padding: '6rem',
								color: 'var(--coffee)',
								fontFamily: 'Cormorant Garamond',
								fontSize: '1.5rem',
								fontStyle: 'italic',
							}}
						>
							Nothing here yet — check back soon.
						</div>
					)}
				</div>
			</div>

			{/* EDITORIAL SECTION */}
			<div
				style={{
					backgroundColor: 'var(--espresso)',
					padding: '8rem 3rem',
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: '0',
					maxWidth: '100%',
				}}
			>
				<div
					style={{
						padding: '4rem',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					}}
				>
					<p
						style={{
							color: 'var(--accent-gold)',
							fontSize: '0.65rem',
							letterSpacing: '4px',
							textTransform: 'uppercase',
							fontFamily: 'Montserrat',
							marginBottom: '2rem',
						}}
					>
						Our Philosophy
					</p>
					<h2
						style={{
							fontFamily: 'Cormorant Garamond, serif',
							color: '#FFFFFF',
							fontSize: 'clamp(2rem, 4vw, 3.5rem)',
							fontWeight: '300',
							lineHeight: '1.1',
							marginBottom: '2rem',
						}}
					>
						Coffee as an
						<br />
						<em style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>
							Art Form
						</em>
					</h2>
					<p
						style={{
							color: 'rgba(242,232,220,0.6)',
							fontSize: '0.9rem',
							lineHeight: '2',
							fontWeight: '300',
							maxWidth: '400px',
							marginBottom: '3rem',
						}}
					>
						We source directly from farmers who share our obsession with
						quality. Every bean is traceable, every roast intentional, every cup
						a small masterpiece.
					</p>
					<Link
						to='/blog'
						style={{
							color: 'var(--accent-gold)',
							textDecoration: 'none',
							fontSize: '0.7rem',
							letterSpacing: '3px',
							textTransform: 'uppercase',
							fontFamily: 'Montserrat',
							fontWeight: '600',
							display: 'flex',
							alignItems: 'center',
							gap: '1rem',
						}}
					>
						Read Our Journal
						<span style={{ fontSize: '1rem' }}>→</span>
					</Link>
				</div>

				<div style={{ overflow: 'hidden', minHeight: '500px' }}>
					<img
						src='https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=85'
						alt='Coffee craft'
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							opacity: 0.7,
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
