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
					// If user denies location, use Seattle as default
					axios
						.get('/api/weather/')
						.then(({ data }) => setWeather(data))
						.catch(() => setError(true))
						.finally(() => setLoading(false));
				},
			);
		}
	}, []);

	if (loading)
		return (
			<div
				style={{
					backgroundColor: 'var(--dark-roast)',
					padding: '1.5rem 2rem',
					textAlign: 'center',
					color: 'var(--cream)',
					fontSize: '0.9rem',
					opacity: 0.8,
				}}
			>
				☁️ Checking the weather for your perfect cup...
			</div>
		);

	if (error || !weather) return null;

	return (
		<div
			style={{
				background: `linear-gradient(135deg, ${weather.bg} 0%, var(--dark-roast) 100%)`,
				padding: '1.5rem 2rem',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '2rem',
				flexWrap: 'wrap',
			}}
		>
			{/* Weather info */}
			<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
				<img
					src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
					alt={weather.description}
					style={{ width: '50px', height: '50px' }}
				/>
				<div>
					<p
						style={{
							color: 'var(--accent-gold)',
							fontSize: '0.75rem',
							letterSpacing: '2px',
							textTransform: 'uppercase',
						}}
					>
						{weather.city}
					</p>
					<p
						style={{
							color: 'var(--cream)',
							fontSize: '1.3rem',
							fontWeight: '700',
						}}
					>
						{weather.temp_c}°C
						<span
							style={{ fontSize: '0.9rem', opacity: 0.7, marginLeft: '0.5rem' }}
						>
							{weather.description}
						</span>
					</p>
				</div>
			</div>

			{/* Divider */}
			<div
				style={{
					width: '1px',
					height: '40px',
					backgroundColor: 'rgba(255,255,255,0.2)',
				}}
			/>

			{/* Recommendation */}
			<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
				<span style={{ fontSize: '2.5rem' }}>{weather.emoji}</span>
				<div>
					<p
						style={{
							color: 'var(--accent-gold)',
							fontSize: '0.75rem',
							letterSpacing: '2px',
							textTransform: 'uppercase',
							marginBottom: '0.2rem',
						}}
					>
						Today's Pick
					</p>
					<p
						style={{
							color: 'var(--cream)',
							fontFamily: 'Playfair Display, serif',
							fontSize: '1.2rem',
							fontWeight: '700',
						}}
					>
						{weather.recommendation}
					</p>
					<p
						style={{
							color: 'var(--cream)',
							fontSize: '0.8rem',
							opacity: 0.7,
						}}
					>
						{weather.reason}
					</p>
				</div>
			</div>
		</div>
	);
}

export default WeatherWidget;
