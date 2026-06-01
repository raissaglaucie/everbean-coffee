import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
	const { cartItems } = useSelector((state) => state.cart);
	const { userInfo } = useSelector((state) => state.user);

	return (
		<nav
			style={{
				backgroundColor: 'var(--espresso)',
				padding: '1rem 2rem',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<Link
				to='/'
				style={{
					color: 'var(--accent-gold)',
					textDecoration: 'none',
					fontFamily: 'Playfair Display, serif',
					fontSize: '1.5rem',
					fontWeight: '700',
					letterSpacing: '2px',
				}}
			>
				☕ EVERBEAN
			</Link>

			<div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
				<Link
					to='/cart'
					style={{ color: 'var(--cream)', textDecoration: 'none' }}
				>
					🛒 Cart {cartItems.length > 0 && `(${cartItems.length})`}
				</Link>
				{userInfo ? (
					<Link
						to='/profile'
						style={{ color: 'var(--cream)', textDecoration: 'none' }}
					>
						👤 {userInfo.name}
					</Link>
				) : (
					<Link
						to='/login'
						style={{ color: 'var(--cream)', textDecoration: 'none' }}
					>
						Sign In
					</Link>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
