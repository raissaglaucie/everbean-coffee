import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function BlogPostPage() {
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [comment, setComment] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const { slug } = useParams();
	const navigate = useNavigate();
	const { userInfo } = useSelector((state) => state.user);

	useEffect(() => {
		fetchPost();
	}, [slug]);

	const fetchPost = async () => {
		setLoading(true);
		const { data } = await axios.get(`/api/blog/${slug}/`);
		setPost(data);
		setLoading(false);
	};

	const submitComment = async (e) => {
		e.preventDefault();
		if (!userInfo) {
			navigate('/login');
			return;
		}
		setSubmitting(true);
		await axios.post(
			`/api/blog/${slug}/comments/`,
			{ content: comment },
			{ headers: { Authorization: `Bearer ${userInfo.token}` } },
		);
		setComment('');
		fetchPost();
		setSubmitting(false);
	};

	if (loading)
		return (
			<p
				style={{ padding: '3rem', textAlign: 'center', color: 'var(--coffee)' }}
			>
				Loading post... ☕
			</p>
		);

	if (!post) return null;

	return (
		<div style={{ maxWidth: '750px', margin: '0 auto', padding: '3rem 2rem' }}>
			{/* Back */}
			<button
				onClick={() => navigate('/blog')}
				style={{
					backgroundColor: 'transparent',
					border: '1px solid var(--latte)',
					color: 'var(--coffee)',
					padding: '0.5rem 1rem',
					borderRadius: '8px',
					cursor: 'pointer',
					marginBottom: '2rem',
					fontFamily: 'Lato, sans-serif',
				}}
			>
				← Back to Journal
			</button>

			{/* Category */}
			<span
				style={{
					backgroundColor: 'var(--cream)',
					color: 'var(--coffee)',
					padding: '0.3rem 0.8rem',
					borderRadius: '20px',
					fontSize: '0.75rem',
					fontWeight: '700',
					letterSpacing: '1px',
					textTransform: 'uppercase',
				}}
			>
				{post.category_name}
			</span>

			{/* Title */}
			<h1
				style={{
					fontFamily: 'Playfair Display, serif',
					color: 'var(--espresso)',
					fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
					lineHeight: '1.2',
					margin: '1rem 0',
				}}
			>
				{post.cover_emoji} {post.title}
			</h1>

			{/* Meta */}
			<div
				style={{
					display: 'flex',
					gap: '1.5rem',
					color: 'var(--latte)',
					fontSize: '0.9rem',
					marginBottom: '2rem',
					paddingBottom: '2rem',
					borderBottom: '1px solid var(--cream)',
				}}
			>
				<span>✍️ {post.author_name}</span>
				<span>📅 {post.createdAt?.substring(0, 10)}</span>
				<span>💬 {post.comments?.length} comments</span>
			</div>

			{/* Excerpt */}
			<p
				style={{
					color: 'var(--coffee)',
					fontSize: '1.15rem',
					lineHeight: '1.8',
					fontStyle: 'italic',
					marginBottom: '2rem',
					padding: '1.5rem',
					backgroundColor: 'var(--cream)',
					borderRadius: '12px',
					borderLeft: '4px solid var(--accent-gold)',
				}}
			>
				{post.excerpt}
			</p>

			{/* Content */}
			<div
				style={{
					color: 'var(--text-dark)',
					fontSize: '1.05rem',
					lineHeight: '1.9',
					marginBottom: '3rem',
				}}
			>
				{post.content.split('\n').map((paragraph, i) => (
					<p key={i} style={{ marginBottom: '1.2rem' }}>
						{paragraph}
					</p>
				))}
			</div>

			{/* Comments */}
			<div
				style={{
					borderTop: '2px solid var(--cream)',
					paddingTop: '2rem',
				}}
			>
				<h2
					style={{
						fontFamily: 'Playfair Display, serif',
						color: 'var(--espresso)',
						marginBottom: '1.5rem',
					}}
				>
					💬 Comments ({post.comments?.length})
				</h2>

				{post.comments?.length === 0 && (
					<p
						style={{
							color: 'var(--coffee)',
							marginBottom: '2rem',
							opacity: 0.7,
						}}
					>
						No comments yet — be the first to share your thoughts!
					</p>
				)}

				{post.comments?.map((c) => (
					<div
						key={c.id}
						style={{
							backgroundColor: 'white',
							borderRadius: '12px',
							padding: '1.2rem',
							marginBottom: '1rem',
							boxShadow: '0 2px 8px rgba(28,10,0,0.06)',
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								marginBottom: '0.5rem',
							}}
						>
							<span style={{ color: 'var(--espresso)', fontWeight: '700' }}>
								👤 {c.name}
							</span>
							<span style={{ color: 'var(--latte)', fontSize: '0.85rem' }}>
								{c.createdAt?.substring(0, 10)}
							</span>
						</div>
						<p style={{ color: 'var(--coffee)', lineHeight: '1.6' }}>
							{c.content}
						</p>
					</div>
				))}

				{/* Add comment */}
				<div
					style={{
						backgroundColor: 'white',
						borderRadius: '12px',
						padding: '1.5rem',
						boxShadow: '0 2px 8px rgba(28,10,0,0.06)',
						marginTop: '1.5rem',
					}}
				>
					<h3
						style={{
							fontFamily: 'Playfair Display, serif',
							color: 'var(--espresso)',
							marginBottom: '1rem',
							fontSize: '1.1rem',
						}}
					>
						Leave a Comment
					</h3>

					{!userInfo && (
						<p
							style={{
								color: 'var(--coffee)',
								fontSize: '0.9rem',
								marginBottom: '1rem',
							}}
						>
							Please{' '}
							<span
								onClick={() => navigate('/login')}
								style={{
									color: 'var(--accent-gold)',
									cursor: 'pointer',
									fontWeight: '700',
								}}
							>
								sign in
							</span>{' '}
							to leave a comment.
						</p>
					)}

					<form onSubmit={submitComment}>
						<textarea
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder='Share your thoughts about this post...'
							disabled={!userInfo}
							rows={4}
							style={{
								width: '100%',
								padding: '0.8rem',
								borderRadius: '8px',
								border: '1px solid var(--latte)',
								fontFamily: 'Lato, sans-serif',
								fontSize: '0.95rem',
								resize: 'vertical',
								color: 'var(--espresso)',
								marginBottom: '1rem',
								opacity: userInfo ? 1 : 0.6,
							}}
						/>
						<button
							type='submit'
							disabled={!userInfo || submitting || !comment.trim()}
							style={{
								backgroundColor: userInfo ? 'var(--espresso)' : 'var(--latte)',
								color: 'var(--cream)',
								border: 'none',
								padding: '0.8rem 2rem',
								borderRadius: '8px',
								cursor: userInfo ? 'pointer' : 'not-allowed',
								fontFamily: 'Lato, sans-serif',
								fontSize: '0.95rem',
							}}
						>
							{submitting ? 'Posting...' : '💬 Post Comment'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default BlogPostPage;
