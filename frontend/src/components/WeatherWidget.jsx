import { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherWidget() {
	const [weather, setWeather] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					try {
						const { latitude, longitude } = position.coords;
						const { data } = await axios.get(
							`/api/weather/?lat=${latitude}&lon=${longitude}`,
						);
						setWeather(data);
					} catch {
						setError(true);
					} finally {
						setLoading(false);
					}
				},
				() => {
					axios
						.get('/api/weather/')
						.then(({ data }) => setWeather(data))
						.catch(() => setError(true))
						.finally(() => setLoading(false));
				},
			);
		}
	}, []);

	if (error || !weather) return null;

	if (loading)
		return (
			<div
				style={{
					backgroundColor: 'var(--dark-roast)',
					padding: '2rem',
					textAlign: 'center',
					borderTop: '1px solid rgba(201,169,110,0.1)',
					borderBottom: '1px solid rgba(201,169,110,0.1)',
				}}
			>
				<p
					style={{
						color: 'rgba(242,232,220,0.4)',
						fontSize: '0.65rem',
						letterSpacing: '3px',
						textTransform: 'uppercase',
						fontFamily: 'Montserrat',
					}}
				>
					Reading the weather...
				</p>
			</div>
		);

	return (
		<div
			style={{
				backgroundColor: 'var(--dark-roast)',
				borderTop: '1px solid rgba(201,169,110,0.1)',
				borderBottom: '1px solid rgba(201,169,110,0.1)',
				padding: '3rem 4rem',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '5rem',
				flexWrap: 'wrap',
			}}
		>
			{/* Label */}
			<div style={{ textAlign: 'center' }}>
				<p
					style={{
						color: 'rgba(242,232,220,0.3)',
						fontSize: '0.55rem',
						letterSpacing: '4px',
						textTransform: 'uppercase',
						fontFamily: 'Montserrat',
						fontWeight: '600',
						marginBottom: '0.3rem',
					}}
				>
					Today's Weather
				</p>
				<p
					style={{
						color: 'var(--accent-gold)',
						fontSize: '0.7rem',
						letterSpacing: '3px',
						textTransform: 'uppercase',
						fontFamily: 'Montserrat',
						fontWeight: '500',
					}}
				>
					{weather.city}
				</p>
			</div>

			{/* Weather */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '1.5rem',
				}}
			>
				<span style={{ fontSize: '3rem' }}>
					{weather.temp_c < 5
						? '🥶'
						: weather.temp_c < 12
							? '🌥️'
							: weather.temp_c < 18
								? '⛅'
								: weather.temp_c < 24
									? '🌤️'
									: '☀️'}
				</span>
				<div>
					<p
						style={{
							fontFamily: 'Cormorant Garamond, serif',
							color: '#FFFFFF',
							fontSize: '3rem',
							fontWeight: '300',
							lineHeight: '1',
							marginBottom: '0.2rem',
						}}
					>
						{weather.temp_c}°
					</p>
					<p
						style={{
							color: 'rgba(242,232,220,0.4)',
							fontSize: '0.7rem',
							letterSpacing: '2px',
							textTransform: 'capitalize',
							fontFamily: 'Montserrat',
							fontWeight: '300',
						}}
					>
						{weather.description}
					</p>
				</div>
			</div>

			{/* Divider */}
			<div
				style={{
					width: '1px',
					height: '60px',
					backgroundColor: 'rgba(201,169,110,0.2)',
				}}
			/>

			{/* Recommendation */}
			<div style={{ textAlign: 'center' }}>
				<p
					style={{
						color: 'rgba(242,232,220,0.3)',
						fontSize: '0.55rem',
						letterSpacing: '4px',
						textTransform: 'uppercase',
						fontFamily: 'Montserrat',
						fontWeight: '600',
						marginBottom: '0.5rem',
					}}
				>
					Today's Pick
				</p>
				<p
					style={{
						fontFamily: 'Cormorant Garamond, serif',
						color: 'var(--accent-gold)',
						fontSize: '1.8rem',
						fontWeight: '400',
						fontStyle: 'italic',
						marginBottom: '0.3rem',
						letterSpacing: '-0.5px',
					}}
				>
					{weather.recommendation}
				</p>
				<p
					style={{
						color: 'rgba(242,232,220,0.4)',
						fontSize: '0.75rem',
						fontFamily: 'Montserrat',
						fontWeight: '300',
						letterSpacing: '0.5px',
					}}
				>
					{weather.reason}
				</p>
			</div>

			{/* CTA */}
			<button
				onClick={() =>
					document
						.getElementById('products')
						.scrollIntoView({ behavior: 'smooth' })
				}
				style={{
					backgroundColor: 'transparent',
					border: '1px solid rgba(201,169,110,0.4)',
					color: 'var(--accent-gold)',
					padding: '0.8rem 2rem',
					cursor: 'pointer',
					fontFamily: 'Montserrat, sans-serif',
					fontSize: '0.6rem',
					letterSpacing: '3px',
					textTransform: 'uppercase',
					fontWeight: '600',
					transition: 'all 0.3s',
					whiteSpace: 'nowrap',
				}}
				onMouseEnter={(e) => {
					e.target.style.backgroundColor = 'var(--accent-gold)';
					e.target.style.color = 'var(--espresso)';
				}}
				onMouseLeave={(e) => {
					e.target.style.backgroundColor = 'transparent';
					e.target.style.color = 'var(--accent-gold)';
				}}
			>
				Order Now
			</button>
		</div>
	);
}

export default WeatherWidget;
