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
		<div>
			{/* Hero */}
			<div
				style={{
					background:
						'linear-gradient(135deg, var(--espresso) 0%, var(--dark-roast) 100%)',
					padding: '4rem 2rem',
					textAlign: 'center',
				}}
			>
				<p
					style={{
						color: 'var(--accent-gold)',
						letterSpacing: '4px',
						fontSize: '0.8rem',
						textTransform: 'uppercase',
						marginBottom: '1rem',
					}}
				>
					Stories & Guides
				</p>
				<h1
					style={{
						fontFamily: 'Playfair Display, serif',
						color: 'var(--milk-foam)',
						fontSize: 'clamp(2rem, 5vw, 3.5rem)',
						marginBottom: '1rem',
					}}
				>
					The EverBean{' '}
					<span style={{ color: 'var(--accent-gold)' }}>Journal</span>
				</h1>
				<p
					style={{
						color: 'var(--cream)',
						opacity: 0.8,
						maxWidth: '500px',
						margin: '0 auto',
						lineHeight: '1.7',
					}}
				>
					Brewing guides, origin stories, latte art tips, and everything coffee
					culture.
				</p>
			</div>

			<div
				style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem' }}
			>
				{/* Category filters */}
				<div
					style={{
						display: 'flex',
						gap: '0.8rem',
						marginBottom: '3rem',
						flexWrap: 'wrap',
					}}
				>
					<button
						onClick={() => setActiveCategory('')}
						style={{
							padding: '0.5rem 1.2rem',
							borderRadius: '50px',
							border:
								activeCategory === ''
									? '2px solid var(--espresso)'
									: '2px solid var(--latte)',
							backgroundColor:
								activeCategory === '' ? 'var(--espresso)' : 'transparent',
							color: activeCategory === '' ? 'var(--cream)' : 'var(--coffee)',
							cursor: 'pointer',
							fontFamily: 'Lato, sans-serif',
							fontWeight: '700',
							fontSize: '0.85rem',
						}}
					>
						All Posts
					</button>
					{categories.map((cat) => (
						<button
							key={cat._id}
							onClick={() => setActiveCategory(cat.slug)}
							style={{
								padding: '0.5rem 1.2rem',
								borderRadius: '50px',
								border:
									activeCategory === cat.slug
										? '2px solid var(--espresso)'
										: '2px solid var(--latte)',
								backgroundColor:
									activeCategory === cat.slug
										? 'var(--espresso)'
										: 'transparent',
								color:
									activeCategory === cat.slug
										? 'var(--cream)'
										: 'var(--coffee)',
								cursor: 'pointer',
								fontFamily: 'Lato, sans-serif',
								fontWeight: '700',
								fontSize: '0.85rem',
							}}
						>
							{cat.name}
						</button>
					))}
				</div>

				{loading ? (
					<p style={{ textAlign: 'center', color: 'var(--coffee)' }}>
						Loading posts... ☕
					</p>
				) : (
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
							gap: '2rem',
						}}
					>
						{posts.map((post) => (
							<Link
								key={post._id}
								to={`/blog/${post.slug}`}
								style={{ textDecoration: 'none' }}
							>
								<div
									style={{
										backgroundColor: 'white',
										borderRadius: '16px',
										overflow: 'hidden',
										boxShadow: '0 2px 12px rgba(28,10,0,0.08)',
										transition: 'transform 0.2s, box-shadow 0.2s',
										height: '100%',
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
									{/* Cover */}
									<div
										style={{
											background:
												'linear-gradient(135deg, var(--espresso), var(--coffee))',
											height: '160px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: '4rem',
										}}
									>
										{post.cover_emoji}
									</div>

									<div style={{ padding: '1.5rem' }}>
										<span
											style={{
												backgroundColor: 'var(--cream)',
												color: 'var(--coffee)',
												padding: '0.2rem 0.7rem',
												borderRadius: '20px',
												fontSize: '0.7rem',
												fontWeight: '700',
												letterSpacing: '1px',
												textTransform: 'uppercase',
											}}
										>
											{post.category_name}
										</span>

										<h2
											style={{
												fontFamily: 'Playfair Display, serif',
												color: 'var(--espresso)',
												fontSize: '1.3rem',
												margin: '0.8rem 0 0.5rem',
												lineHeight: '1.3',
											}}
										>
											{post.title}
										</h2>

										<p
											style={{
												color: 'var(--coffee)',
												fontSize: '0.9rem',
												lineHeight: '1.6',
												opacity: 0.8,
												marginBottom: '1rem',
											}}
										>
											{post.excerpt}
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
												style={{ color: 'var(--latte)', fontSize: '0.85rem' }}
											>
												✍️ {post.author_name}
											</span>
											<span
												style={{
													color: 'var(--accent-gold)',
													fontSize: '0.85rem',
													fontWeight: '700',
												}}
											>
												Read more →
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
	);
}

export default BlogPage;
