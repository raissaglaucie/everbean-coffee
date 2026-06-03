import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';

function Navbar() {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	const { cartItems } = useSelector((state) => state.cart);
	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = () => {
		dispatch(logout());
		setDropdownOpen(false);
		navigate('/');
	};

	const searchHandler = (e) => {
		e.preventDefault();
		const q = searchQuery.trim();
		navigate(q ? `/?keyword=${q}` : '/');
		setSearchOpen(false);
		setSearchQuery('');
	};

	const openSearch = () => {
		setSearchOpen(true);
		setDropdownOpen(false);
		setTimeout(
			() => document.getElementById('navbar-search-input')?.focus(),
			50,
		);
	};

	return (
		<>
			<style>{`
        .navbar-search-overlay {
          position: fixed;
          inset: 0;
          background: rgba(13,7,5,0.85);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }

        .navbar-search-box {
          width: 100%;
          max-width: 640px;
          padding: 0 2rem;
          position: relative;
        }

        .navbar-search-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent-gold, #C9A96E);
          margin-bottom: 1rem;
          display: block;
        }

        .navbar-search-input-wrap {
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--accent-gold, #C9A96E);
          padding-bottom: 0.8rem;
        }

        .navbar-search-input-wrap input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.5rem;
          font-weight: 300;
          color: var(--cream, #F2E8DC);
          caret-color: var(--accent-gold, #C9A96E);
        }

        .navbar-search-input-wrap input::placeholder {
          color: rgba(242,232,220,0.25);
          font-style: italic;
        }

        .navbar-search-submit {
          background: transparent;
          border: none;
          color: var(--accent-gold, #C9A96E);
          cursor: pointer;
          font-size: 1.3rem;
          padding: 0 0.5rem;
          transition: opacity 0.2s;
        }
        .navbar-search-submit:hover { opacity: 0.7; }

        .navbar-search-close {
          position: absolute;
          top: -3rem;
          right: 2rem;
          background: transparent;
          border: none;
          color: rgba(242,232,220,0.5);
          cursor: pointer;
          font-size: 1.5rem;
          font-family: 'Montserrat', sans-serif;
          transition: color 0.2s;
        }
        .navbar-search-close:hover { color: var(--cream, #F2E8DC); }

        .navbar-search-hint {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem;
          color: rgba(242,232,220,0.3);
          margin-top: 1rem;
          letter-spacing: 0.1em;
        }

        .navbar-search-btn {
          background: transparent;
          border: none;
          color: var(--cream, #F2E8DC);
          cursor: pointer;
          opacity: 0.85;
          padding: 0.2rem;
          display: flex;
          align-items: center;
          transition: opacity 0.2s;
        }
        .navbar-search-btn:hover { opacity: 1; }
      `}</style>

			{/* Search Overlay */}
			{searchOpen && (
				<div
					className='navbar-search-overlay'
					onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
				>
					<div className='navbar-search-box'>
						<button
							className='navbar-search-close'
							onClick={() => setSearchOpen(false)}
						>
							✕
						</button>
						<span className='navbar-search-label'>Search</span>
						<form onSubmit={searchHandler}>
							<div className='navbar-search-input-wrap'>
								<input
									id='navbar-search-input'
									type='text'
									placeholder='Ethiopian beans, cold brew…'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								<button type='submit' className='navbar-search-submit'>
									→
								</button>
							</div>
							<p className='navbar-search-hint'>
								Press Enter or click → to search · Esc to close
							</p>
						</form>
					</div>
				</div>
			)}

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

					{/* Search button */}
					<button
						className='navbar-search-btn'
						onClick={openSearch}
						title='Search'
					>
						<svg
							width='18'
							height='18'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<circle cx='11' cy='11' r='8' />
							<path d='m21 21-4.35-4.35' />
						</svg>
					</button>

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
		</>
	);
}

export default Navbar;
