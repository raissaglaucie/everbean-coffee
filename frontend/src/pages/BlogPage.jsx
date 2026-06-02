import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BlogPage() {
	const [posts, setPosts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [activeCategory, setActiveCategory] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchCategories();
		fetchPosts();
	}, []);

	useEffect(() => {
		fetchPosts(activeCategory);
	}, [activeCategory]);

	const fetchCategories = async () => {
		const { data } = await axios.get('/api/blog/categories/');
		setCategories(data);
	};

	const fetchPosts = async (category = '') => {
		setLoading(true);
		const { data } = await axios.get(`/api/blog/?category=${category}`);
		setPosts(data);
		setLoading(false);
	};

	return (
		<div style={{ backgroundColor: 'var(--espresso)', minHeight: '100vh' }}>
			{/* Hero */}
			<div
				style={{
					position: 'relative',
					height: '60vh',
					minHeight: '400px',
					overflow: 'hidden',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<img
					src='https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1800&q=85'
					alt='Journal'
					style={{
						position: 'absolute',
						inset: 0,
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						opacity: 0.3,
					}}
				/>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background:
							'linear-gradient(to bottom, rgba(13,7,5,0.4) 0%, rgba(13,7,5,0.8) 100%)',
					}}
				/>
				<div
					style={{
						position: 'relative',
						textAlign: 'center',
						padding: '0 2rem',
					}}
				>
					<p
						style={{
							color: 'var(--accent-gold)',
							letterSpacing: '6px',
							fontSize: '0.65rem',
							textTransform: 'uppercase',
							fontFamily: 'Montserrat',
							fontWeight: '500',
							marginBottom: '1.5rem',
						}}
					>
						Stories & Guides
					</p>
					<h1
						style={{
							fontFamily: 'Cormorant Garamond, serif',
							color: '#FFFFFF',
							fontSize: 'clamp(3rem, 7vw, 6rem)',
							fontWeight: '300',
							lineHeight: '0.95',
							letterSpacing: '-2px',
						}}
					>
						The EverBean
						<br />
						<em style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>
							Journal
						</em>
					</h1>
				</div>
			</div>

			{/* Category filters */}
			<div
				style={{
					backgroundColor: 'var(--espresso)',
					borderBottom: '1px solid rgba(201,169,110,0.15)',
					padding: '1.5rem 4rem',
					display: 'flex',
					gap: '2rem',
					flexWrap: 'wrap',
					alignItems: 'center',
				}}
			>
				{['', ...categories.map((c) => c.slug)].map((slug, i) => {
					const label =
						slug === '' ? 'All' : categories.find((c) => c.slug === slug)?.name;
					return (
						<button
							key={slug}
							onClick={() => setActiveCategory(slug)}
							style={{
								backgroundColor: 'transparent',
								border: 'none',
								color:
									activeCategory === slug
										? 'var(--accent-gold)'
										: 'rgba(242,232,220,0.4)',
								cursor: 'pointer',
								fontFamily: 'Montserrat, sans-serif',
								fontWeight: '500',
								fontSize: '0.65rem',
								letterSpacing: '3px',
								textTransform: 'uppercase',
								padding: '0.5rem 0',
								borderBottom:
									activeCategory === slug
										? '1px solid var(--accent-gold)'
										: '1px solid transparent',
								transition: 'all 0.2s',
							}}
						>
							{label}
						</button>
					);
				})}
			</div>

			{/* Posts grid */}
			<div
				style={{
					backgroundColor: 'var(--milk-foam)',
					padding: '5rem 4rem',
				}}
			>
				<div style={{ maxWidth: '1300px', margin: '0 auto' }}>
					{loading ? (
						<div
							style={{
								textAlign: 'center',
								padding: '6rem',
								fontFamily: 'Cormorant Garamond',
								color: 'var(--coffee)',
								fontSize: '1.5rem',
								fontWeight: '300',
								fontStyle: 'italic',
							}}
						>
							Loading stories...
						</div>
					) : (
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
								gap: '2px',
								backgroundColor: 'var(--cream)',
							}}
						>
							{posts.map((post, index) => (
								<Link
									key={post._id}
									to={`/blog/${post.slug}`}
									style={{ textDecoration: 'none' }}
								>
									<div
										style={{
											backgroundColor: 'var(--milk-foam)',
											overflow: 'hidden',
											cursor: 'pointer',
											position: 'relative',
											height: '100%',
											display: 'flex',
											flexDirection: 'column',
										}}
									>
										{/* Cover image */}
										<div
											style={{
												height: '260px',
												overflow: 'hidden',
												position: 'relative',
												backgroundColor: 'var(--espresso)',
											}}
										>
											<img
												src={getBlogImage(post.category_name, index)}
												alt={post.title}
												style={{
													width: '100%',
													height: '100%',
													objectFit: 'cover',
													opacity: 0.75,
													transition: 'transform 0.6s ease, opacity 0.3s',
												}}
												onMouseEnter={(e) => {
													e.target.style.transform = 'scale(1.05)';
													e.target.style.opacity = '0.9';
												}}
												onMouseLeave={(e) => {
													e.target.style.transform = 'scale(1)';
													e.target.style.opacity = '0.75';
												}}
											/>
											<div
												style={{
													position: 'absolute',
													bottom: '1.5rem',
													left: '1.5rem',
												}}
											>
												<span
													style={{
														backgroundColor: 'rgba(13,7,5,0.7)',
														color: 'var(--accent-gold)',
														padding: '0.3rem 0.8rem',
														fontSize: '0.6rem',
														letterSpacing: '3px',
														textTransform: 'uppercase',
														fontFamily: 'Montserrat',
														fontWeight: '600',
													}}
												>
													{post.category_name}
												</span>
											</div>
										</div>

										{/* Content */}
										<div
											style={{
												padding: '2rem',
												flex: 1,
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'space-between',
											}}
										>
											<h2
												style={{
													fontFamily: 'Cormorant Garamond, serif',
													color: 'var(--espresso)',
													fontSize: '1.6rem',
													fontWeight: '400',
													lineHeight: '1.2',
													marginBottom: '1rem',
													letterSpacing: '-0.5px',
												}}
											>
												{post.title}
											</h2>

											<p
												style={{
													color: 'var(--coffee)',
													fontSize: '0.85rem',
													lineHeight: '1.8',
													fontWeight: '300',
													marginBottom: '1.5rem',
													opacity: 0.8,
												}}
											>
												{post.excerpt.substring(0, 100)}...
											</p>

											<div
												style={{
													display: 'flex',
													justifyContent: 'space-between',
													alignItems: 'center',
													paddingTop: '1rem',
													borderTop: '1px solid var(--cream)',
												}}
											>
												<span
													style={{
														color: 'var(--coffee)',
														fontSize: '0.7rem',
														letterSpacing: '1px',
														fontFamily: 'Montserrat',
														opacity: 0.6,
													}}
												>
													{post.author_name}
												</span>
												<span
													style={{
														color: 'var(--accent-gold)',
														fontSize: '0.65rem',
														letterSpacing: '2px',
														textTransform: 'uppercase',
														fontFamily: 'Montserrat',
														fontWeight: '600',
													}}
												>
													Read →
												</span>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function getBlogImage(category, index) {
	const images = {
		'Brewing Methods':
			'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
		'Coffee Culture':
			'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80',
		'Latte Art':
			'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80',
		'Origins & Terroir':
			'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
		origins:
			'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
	};
	const fallbacks = [
		'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
		'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80',
		'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=800&q=80',
		'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
	];
	return images[category] || fallbacks[index % fallbacks.length];
}

export default BlogPage;
