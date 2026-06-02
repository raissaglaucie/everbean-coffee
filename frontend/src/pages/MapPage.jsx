import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
	iconUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
	shadowUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom coffee shop icon
const coffeeIcon = new L.Icon({
	iconUrl:
		'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2615.png',
	iconSize: [32, 32],
	iconAnchor: [16, 32],
	popupAnchor: [0, -32],
});

// Custom user location icon
const userIcon = new L.Icon({
	iconUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
	shadowSize: [41, 41],
});

function RecenterMap({ position }) {
	const map = useMap();
	useEffect(() => {
		if (position) map.setView(position, 14);
	}, [position, map]);
	return null;
}

function MapPage() {
	const [position, setPosition] = useState([47.6062, -122.3321]); // Seattle default
	const [coffeeShops, setCoffeeShops] = useState([]);
	const [loading, setLoading] = useState(true);
	const [locationLoading, setLocationLoading] = useState(true);
	const [selected, setSelected] = useState(null);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					const { latitude, longitude } = pos.coords;
					setPosition([latitude, longitude]);
					setLocationLoading(false);
					fetchCoffeeShops(latitude, longitude);
				},
				() => {
					setLocationLoading(false);
					fetchCoffeeShops(47.6062, -122.3321);
				},
			);
		}
	}, []);

	const fetchCoffeeShops = async (lat, lon) => {
		setLoading(true);
		try {
			const query = `
        [out:json][timeout:25];
        node["amenity"="cafe"](around:2000,${lat},${lon});
        out body;
      `;
			const response = await fetch(
				`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
			);
			const data = await response.json();
			setCoffeeShops(data.elements.slice(0, 20));
		} catch (err) {
			console.log('Error fetching coffee shops:', err);
		}
		setLoading(false);
	};

	return (
		<div>
			{/* Hero */}
			<div
				style={{
					background:
						'linear-gradient(135deg, var(--espresso) 0%, var(--dark-roast) 100%)',
					padding: '3rem 2rem',
					textAlign: 'center',
				}}
			>
				<p
					style={{
						color: 'var(--accent-gold)',
						letterSpacing: '4px',
						fontSize: '0.8rem',
						textTransform: 'uppercase',
						marginBottom: '0.8rem',
					}}
				>
					Find Your Next Cup
				</p>
				<h1
					style={{
						fontFamily: 'Playfair Display, serif',
						color: 'var(--milk-foam)',
						fontSize: 'clamp(1.8rem, 4vw, 3rem)',
						marginBottom: '0.8rem',
					}}
				>
					Coffee Shops{' '}
					<span style={{ color: 'var(--accent-gold)' }}>Near You</span>
				</h1>
				<p
					style={{
						color: 'var(--cream)',
						opacity: 0.8,
						fontSize: '0.95rem',
					}}
				>
					{locationLoading
						? '📍 Detecting your location...'
						: `☕ Showing cafés within 2km of your location`}
				</p>
			</div>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 320px',
					height: '600px',
				}}
			>
				{/* Map */}
				<MapContainer
					center={position}
					zoom={14}
					style={{ height: '100%', width: '100%' }}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
					<RecenterMap position={position} />

					{/* User location */}
					<Marker position={position} icon={userIcon}>
						<Popup>📍 You are here!</Popup>
					</Marker>

					{/* Coffee shops */}
					{coffeeShops.map((shop) => (
						<Marker
							key={shop.id}
							position={[shop.lat, shop.lon]}
							icon={coffeeIcon}
							eventHandlers={{
								click: () => setSelected(shop),
							}}
						>
							<Popup>
								<strong>{shop.tags?.name || 'Coffee Shop'}</strong>
								{shop.tags?.['addr:street'] && (
									<p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem' }}>
										📍 {shop.tags['addr:street']}
									</p>
								)}
							</Popup>
						</Marker>
					))}
				</MapContainer>

				{/* Sidebar */}
				<div
					style={{
						backgroundColor: 'var(--milk-foam)',
						overflowY: 'auto',
						borderLeft: '1px solid var(--cream)',
					}}
				>
					<div
						style={{
							padding: '1rem 1.2rem',
							backgroundColor: 'var(--cream)',
							borderBottom: '1px solid var(--latte)',
						}}
					>
						<h3
							style={{
								fontFamily: 'Playfair Display, serif',
								color: 'var(--espresso)',
								fontSize: '1rem',
							}}
						>
							☕ Nearby Cafés
						</h3>
						<p
							style={{
								color: 'var(--coffee)',
								fontSize: '0.8rem',
								marginTop: '0.2rem',
							}}
						>
							{loading
								? 'Searching...'
								: `${coffeeShops.length} found within 2km`}
						</p>
					</div>

					{loading ? (
						<div
							style={{
								padding: '2rem',
								textAlign: 'center',
								color: 'var(--coffee)',
							}}
						>
							Searching for coffee... ☕
						</div>
					) : coffeeShops.length === 0 ? (
						<div
							style={{
								padding: '2rem',
								textAlign: 'center',
								color: 'var(--coffee)',
							}}
						>
							No cafés found nearby
						</div>
					) : (
						coffeeShops.map((shop) => (
							<div
								key={shop.id}
								onClick={() => setSelected(shop)}
								style={{
									padding: '1rem 1.2rem',
									borderBottom: '1px solid var(--cream)',
									cursor: 'pointer',
									backgroundColor:
										selected?.id === shop.id ? 'var(--cream)' : 'transparent',
									transition: 'background 0.2s',
								}}
								onMouseEnter={(e) =>
									(e.currentTarget.style.backgroundColor = 'var(--cream)')
								}
								onMouseLeave={(e) =>
									(e.currentTarget.style.backgroundColor =
										selected?.id === shop.id ? 'var(--cream)' : 'transparent')
								}
							>
								<p
									style={{
										color: 'var(--espresso)',
										fontWeight: '700',
										fontSize: '0.9rem',
										marginBottom: '0.2rem',
									}}
								>
									☕ {shop.tags?.name || 'Coffee Shop'}
								</p>
								{shop.tags?.['addr:street'] && (
									<p style={{ color: 'var(--coffee)', fontSize: '0.8rem' }}>
										📍 {shop.tags['addr:street']}
										{shop.tags?.['addr:housenumber'] &&
											` ${shop.tags['addr:housenumber']}`}
									</p>
								)}
								{shop.tags?.opening_hours && (
									<p
										style={{
											color: 'var(--latte)',
											fontSize: '0.75rem',
											marginTop: '0.2rem',
										}}
									>
										🕐 {shop.tags.opening_hours}
									</p>
								)}
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default MapPage;
