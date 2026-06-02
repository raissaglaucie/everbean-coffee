import { Link } from 'react-router-dom';

function Footer() {
	return (
		<footer
			style={{
				backgroundColor: 'var(--espresso)',
				color: 'var(--cream)',
				padding: '4rem 2rem 2rem',
				marginTop: '4rem',
			}}
		>
			<div
				style={{
					maxWidth: '1200px',
					margin: '0 auto',
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
					gap: '3rem',
					marginBottom: '3rem',
				}}
			>
				{/* Brand */}
				<div>
					<h3
						style={{
							fontFamily: 'Playfair Display, serif',
							color: 'var(--accent-gold)',
							fontSize: '1.5rem',
							marginBottom: '1rem',
						}}
					>
						☕ EVERBEAN
					</h3>
					<p
						style={{
							color: 'var(--cream)',
							opacity: 0.7,
							lineHeight: '1.7',
							fontSize: '0.9rem',
						}}
					>
						Crafted for moments that matter. Single-origin beans, handcrafted
						drinks, delivered with love.
					</p>
					<div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
						{['📘', '📸', '🐦', '▶️'].map((icon, i) => (
							<span
								key={i}
								style={{
									fontSize: '1.2rem',
									cursor: 'pointer',
									opacity: 0.7,
									transition: 'opacity 0.2s',
								}}
								onMouseEnter={(e) => (e.target.style.opacity = '1')}
								onMouseLeave={(e) => (e.target.style.opacity = '0.7')}
							>
								{icon}
							</span>
						))}
					</div>
				</div>

				{/* Menu */}
				<div>
					<h4
						style={{
							color: 'var(--accent-gold)',
							letterSpacing: '2px',
							fontSize: '0.8rem',
							textTransform: 'uppercase',
							marginBottom: '1.2rem',
						}}
					>
						Menu
					</h4>
					{[
						{ label: '☕ Drinks', to: '/' },
						{ label: '🫘 Coffee Beans', to: '/' },
						{ label: '🥐 Food', to: '/' },
						{ label: '🛍️ Merch', to: '/' },
					].map((item) => (
						<Link
							key={item.label}
							to={item.to}
							style={{
								display: 'block',
								color: 'var(--cream)',
								textDecoration: 'none',
								opacity: 0.7,
								marginBottom: '0.6rem',
								fontSize: '0.9rem',
								transition: 'opacity 0.2s',
							}}
							onMouseEnter={(e) => (e.target.style.opacity = '1')}
							onMouseLeave={(e) => (e.target.style.opacity = '0.7')}
						>
							{item.label}
						</Link>
					))}
				</div>

				{/* Company */}
				<div>
					<h4
						style={{
							color: 'var(--accent-gold)',
							letterSpacing: '2px',
							fontSize: '0.8rem',
							textTransform: 'uppercase',
							marginBottom: '1.2rem',
						}}
					>
						Company
					</h4>
					{[
						{ label: 'About Us', to: '/' },
						{ label: 'Blog', to: '/blog' },
						{ label: 'Careers', to: '/' },
						{ label: 'Sustainability', to: '/' },
					].map((item) => (
						<Link
							key={item.label}
							to={item.to}
							style={{
								display: 'block',
								color: 'var(--cream)',
								textDecoration: 'none',
								opacity: 0.7,
								marginBottom: '0.6rem',
								fontSize: '0.9rem',
								transition: 'opacity 0.2s',
							}}
							onMouseEnter={(e) => (e.target.style.opacity = '1')}
							onMouseLeave={(e) => (e.target.style.opacity = '0.7')}
						>
							{item.label}
						</Link>
					))}
				</div>

				{/* Contact */}
				<div>
					<h4
						style={{
							color: 'var(--accent-gold)',
							letterSpacing: '2px',
							fontSize: '0.8rem',
							textTransform: 'uppercase',
							marginBottom: '1.2rem',
						}}
					>
						Visit Us
					</h4>
					<p
						style={{
							color: 'var(--cream)',
							opacity: 0.7,
							fontSize: '0.9rem',
							marginBottom: '0.5rem',
						}}
					>
						📍 123 Coffee Lane
						<br />
						Seattle, WA 98101
					</p>
					<p
						style={{
							color: 'var(--cream)',
							opacity: 0.7,
							fontSize: '0.9rem',
							marginBottom: '0.5rem',
						}}
					>
						🕐 Mon–Fri: 7am – 8pm
						<br />
						Sat–Sun: 8am – 6pm
					</p>
					<p
						style={{ color: 'var(--cream)', opacity: 0.7, fontSize: '0.9rem' }}
					>
						📧 hello@everbean.coffee
					</p>
				</div>
			</div>

			{/* Bottom bar */}
			<div
				style={{
					borderTop: '1px solid rgba(255,255,255,0.1)',
					paddingTop: '2rem',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					flexWrap: 'wrap',
					gap: '1rem',
					maxWidth: '1200px',
					margin: '0 auto',
				}}
			>
				<p style={{ color: 'var(--cream)', opacity: 0.5, fontSize: '0.85rem' }}>
					© 2026 EverBean Coffee. All rights reserved.
				</p>
				<div style={{ display: 'flex', gap: '1.5rem' }}>
					{['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
						(item) => (
							<Link
								key={item}
								to='/'
								style={{
									color: 'var(--cream)',
									opacity: 0.5,
									textDecoration: 'none',
									fontSize: '0.8rem',
								}}
							>
								{item}
							</Link>
						),
					)}
				</div>
			</div>
		</footer>
	);
}

export default Footer;
