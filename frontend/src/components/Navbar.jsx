import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';

function Navbar() {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const { cartItems } = useSelector((state) => state.cart);
	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = () => {
		dispatch(logout());
		setDropdownOpen(false);
		navigate('/');
	};

	return (
		<nav
			style={{
				backgroundColor: 'var(--espresso)',
				padding: '1.2rem 3rem',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				position: 'sticky',
				top: 0,
				zIndex: 100,
				borderBottom: '1px solid rgba(201,169,110,0.15)',
			}}
		>
			<Link
				to='/'
				style={{
					color: 'var(--accent-gold)',
					textDecoration: 'none',
					fontFamily: 'Cormorant Garamond, serif',
					fontSize: '1.8rem',
					fontWeight: '300',
					letterSpacing: '6px',
					textTransform: 'uppercase',
				}}
			>
				EVERBEAN
			</Link>

			<div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
				<Link
					to='/blog'
					style={{
						color: 'var(--cream)',
						textDecoration: 'none',
						fontSize: '0.9rem',
						opacity: 0.85,
					}}
				>
					Journal
				</Link>

				<Link
					to='/map'
					style={{
						color: 'var(--cream)',
						textDecoration: 'none',
						fontSize: '0.9rem',
						opacity: 0.85,
					}}
				>
					Find Cafés
				</Link>

				<Link
					to='/cart'
					style={{
						color: 'var(--cream)',
						textDecoration: 'none',
						display: 'flex',
						alignItems: 'center',
						gap: '0.3rem',
					}}
				>
					🛒 Cart
					{cartItems.length > 0 && (
						<span
							style={{
								backgroundColor: 'var(--accent-gold)',
								color: 'var(--espresso)',
								borderRadius: '50%',
								width: '20px',
								height: '20px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: '0.75rem',
								fontWeight: '700',
							}}
						>
							{cartItems.length}
						</span>
					)}
				</Link>

				{userInfo ? (
					<div style={{ position: 'relative' }}>
						<button
							onClick={() => setDropdownOpen(!dropdownOpen)}
							style={{
								backgroundColor: 'transparent',
								border: '1px solid var(--latte)',
								color: 'var(--cream)',
								padding: '0.4rem 1rem',
								borderRadius: '20px',
								cursor: 'pointer',
								fontFamily: 'Lato, sans-serif',
								display: 'flex',
								alignItems: 'center',
								gap: '0.5rem',
							}}
						>
							👤 {userInfo.name} ▾
						</button>

						{dropdownOpen && (
							<div
								style={{
									position: 'absolute',
									right: 0,
									top: '110%',
									backgroundColor: 'white',
									borderRadius: '12px',
									boxShadow: '0 8px 24px rgba(28,10,0,0.15)',
									minWidth: '160px',
									overflow: 'hidden',
									zIndex: 200,
								}}
							>
								<Link
									to='/profile'
									onClick={() => setDropdownOpen(false)}
									style={{
										display: 'block',
										padding: '0.8rem 1.2rem',
										color: 'var(--espresso)',
										textDecoration: 'none',
										borderBottom: '1px solid var(--cream)',
									}}
									onMouseEnter={(e) =>
										(e.target.style.backgroundColor = 'var(--cream)')
									}
									onMouseLeave={(e) =>
										(e.target.style.backgroundColor = 'white')
									}
								>
									👤 Profile
								</Link>

								{userInfo.isAdmin && (
									<Link
										to='/admin/products'
										onClick={() => setDropdownOpen(false)}
										style={{
											display: 'block',
											padding: '0.8rem 1.2rem',
											color: 'var(--espresso)',
											textDecoration: 'none',
											borderBottom: '1px solid var(--cream)',
										}}
										onMouseEnter={(e) =>
											(e.target.style.backgroundColor = 'var(--cream)')
										}
										onMouseLeave={(e) =>
											(e.target.style.backgroundColor = 'white')
										}
									>
										⚙️ Admin
									</Link>
								)}

								<button
									onClick={logoutHandler}
									style={{
										display: 'block',
										width: '100%',
										padding: '0.8rem 1.2rem',
										color: 'var(--coffee)',
										backgroundColor: 'transparent',
										border: 'none',
										textAlign: 'left',
										cursor: 'pointer',
										fontFamily: 'Lato, sans-serif',
										fontSize: '1rem',
									}}
									onMouseEnter={(e) =>
										(e.target.style.backgroundColor = 'var(--cream)')
									}
									onMouseLeave={(e) =>
										(e.target.style.backgroundColor = 'transparent')
									}
								>
									🚪 Logout
								</button>
							</div>
						)}
					</div>
				) : (
					<Link
						to='/login'
						style={{
							color: 'var(--cream)',
							textDecoration: 'none',
							border: '1px solid var(--latte)',
							padding: '0.4rem 1rem',
							borderRadius: '20px',
						}}
					>
						Sign In
					</Link>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
