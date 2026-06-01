import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/slices/productSlice';

function HomePage() {
	const dispatch = useDispatch();
	const { products, loading, error } = useSelector((state) => state.products);

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<div style={{ padding: '2rem' }}>
			<h1
				style={{
					fontFamily: 'Playfair Display, serif',
					color: 'var(--espresso)',
					marginBottom: '2rem',
					fontSize: '2.5rem',
				}}
			>
				Our Coffees ☕
			</h1>

			{loading && <p>Loading...</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
					gap: '1.5rem',
				}}
			>
				{products.map((product) => (
					<div
						key={product._id}
						style={{
							backgroundColor: 'white',
							borderRadius: '12px',
							padding: '1rem',
							boxShadow: '0 2px 8px rgba(28,10,0,0.1)',
						}}
					>
						<h3 style={{ color: 'var(--coffee)' }}>{product.name}</h3>
						<p style={{ color: 'var(--latte)' }}>${product.price}</p>
					</div>
				))}
			</div>

			{products.length === 0 && !loading && (
				<p style={{ color: 'var(--coffee)' }}>
					No products yet — add some in the admin panel!
				</p>
			)}
		</div>
	);
}

export default HomePage;
