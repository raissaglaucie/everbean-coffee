import { Link } from 'react-router-dom';

function Footer() {
	return (
		<footer
			style={{
				backgroundColor: 'var(--espresso)',
				color: 'var(--cream)',
			}}
		>
			{/* Top section */}
			<div
				style={{
					padding: '6rem 4rem 4rem',
					display: 'grid',
					gridTemplateColumns: '2fr 1fr 1fr 1fr',
					gap: '4rem',
					maxWidth: '1400px',
					margin: '0 auto',
					borderBottom: '1px solid rgba(201,169,110,0.15)',
				}}
			>
				{/* Brand */}
				<div>
					<h3
						style={{
							fontFamily: 'Cormorant Garamond, serif',
							color: 'var(--accent-gold)',
							fontSize: '2rem',
							fontWeight: '300',
							letterSpacing: '6px',
							textTransform: 'uppercase',
							marginBottom: '1.5rem',
						}}
					>
						Everbean
					</h3>
					<p
						style={{
							color: 'rgba(242,232,220,0.5)',
							lineHeight: '2',
							fontSize: '0.85rem',
							fontWeight: '300',
							maxWidth: '280px',
							marginBottom: '2rem',
						}}
					>
						Crafted for moments that matter. Single-origin beans, handcrafted
						drinks, delivered with love from Seattle, Washington.
					</p>
					<div style={{ display: 'flex', gap: '1.5rem' }}>
						{['FB', 'IG', 'TW', 'YT'].map((s) => (
							<span
								key={s}
								style={{
									color: 'rgba(242,232,220,0.3)',
									fontSize: '0.65rem',
									letterSpacing: '1px',
									cursor: 'pointer',
									fontFamily: 'Montserrat',
									fontWeight: '600',
									transition: 'color 0.2s',
								}}
								onMouseEnter={(e) =>
									(e.target.style.color = 'var(--accent-gold)')
								}
								onMouseLeave={(e) =>
									(e.target.style.color = 'rgba(242,232,220,0.3)')
								}
							>
								{s}
							</span>
						))}
					</div>
				</div>

				{/* Menu */}
				<div>
					<h4
						style={{
							color: 'var(--accent-gold)',
							letterSpacing: '3px',
							fontSize: '0.6rem',
							textTransform: 'uppercase',
							marginBottom: '2rem',
							fontFamily: 'Montserrat',
							fontWeight: '600',
						}}
					>
						Menu
					</h4>
					{[
						{ label: 'Drinks', to: '/' },
						{ label: 'Coffee Beans', to: '/' },
						{ label: 'Food', to: '/' },
						{ label: 'Merch', to: '/' },
					].map((item) => (
						<Link
							key={item.label}
							to={item.to}
							style={{
								display: 'block',
								color: 'rgba(242,232,220,0.45)',
								textDecoration: 'none',
								marginBottom: '1rem',
								fontSize: '0.85rem',
								fontWeight: '300',
								letterSpacing: '0.5px',
								transition: 'color 0.2s',
							}}
							onMouseEnter={(e) => (e.target.style.color = 'var(--cream)')}
							onMouseLeave={(e) =>
								(e.target.style.color = 'rgba(242,232,220,0.45)')
							}
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
							letterSpacing: '3px',
							fontSize: '0.6rem',
							textTransform: 'uppercase',
							marginBottom: '2rem',
							fontFamily: 'Montserrat',
							fontWeight: '600',
						}}
					>
						Company
					</h4>
					{[
						{ label: 'About Us', to: '/' },
						{ label: 'Journal', to: '/blog' },
						{ label: 'Find Cafés', to: '/map' },
						{ label: 'Sustainability', to: '/' },
					].map((item) => (
						<Link
							key={item.label}
							to={item.to}
							style={{
								display: 'block',
								color: 'rgba(242,232,220,0.45)',
								textDecoration: 'none',
								marginBottom: '1rem',
								fontSize: '0.85rem',
								fontWeight: '300',
								letterSpacing: '0.5px',
								transition: 'color 0.2s',
							}}
							onMouseEnter={(e) => (e.target.style.color = 'var(--cream)')}
							onMouseLeave={(e) =>
								(e.target.style.color = 'rgba(242,232,220,0.45)')
							}
						>
							{item.label}
						</Link>
					))}
				</div>

				{/* Visit */}
				<div>
					<h4
						style={{
							color: 'var(--accent-gold)',
							letterSpacing: '3px',
							fontSize: '0.6rem',
							textTransform: 'uppercase',
							marginBottom: '2rem',
							fontFamily: 'Montserrat',
							fontWeight: '600',
						}}
					>
						Visit Us
					</h4>
					<p
						style={{
							color: 'rgba(242,232,220,0.45)',
							fontSize: '0.85rem',
							fontWeight: '300',
							lineHeight: '2',
							marginBottom: '1.5rem',
						}}
					>
						123 Coffee Lane
						<br />
						Seattle, WA 98101
					</p>
					<p
						style={{
							color: 'rgba(242,232,220,0.45)',
							fontSize: '0.85rem',
							fontWeight: '300',
							lineHeight: '2',
							marginBottom: '1.5rem',
						}}
					>
						Mon–Fri: 7am – 8pm
						<br />
						Sat–Sun: 8am – 6pm
					</p>
					<a
						href='mailto:hello@everbean.coffee'
						style={{
							color: 'var(--accent-gold)',
							fontSize: '0.8rem',
							textDecoration: 'none',
							fontFamily: 'Montserrat',
							letterSpacing: '1px',
						}}
					>
						hello@everbean.coffee
					</a>
				</div>
			</div>

			{/* Bottom bar */}
			<div
				style={{
					padding: '2rem 4rem',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					maxWidth: '1400px',
					margin: '0 auto',
					flexWrap: 'wrap',
					gap: '1rem',
				}}
			>
				<p
					style={{
						color: 'rgba(242,232,220,0.25)',
						fontSize: '0.7rem',
						letterSpacing: '1px',
						fontFamily: 'Montserrat',
					}}
				>
					© 2026 Everbean Coffee. All rights reserved.
				</p>
				<div style={{ display: 'flex', gap: '2rem' }}>
					{['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
						(item) => (
							<Link
								key={item}
								to='/'
								style={{
									color: 'rgba(242,232,220,0.25)',
									textDecoration: 'none',
									fontSize: '0.65rem',
									letterSpacing: '1px',
									fontFamily: 'Montserrat',
									transition: 'color 0.2s',
								}}
								onMouseEnter={(e) =>
									(e.target.style.color = 'rgba(242,232,220,0.6)')
								}
								onMouseLeave={(e) =>
									(e.target.style.color = 'rgba(242,232,220,0.25)')
								}
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
