import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

function App() {
	return (
		<Router>
			<Navbar />
			<main>
				<Routes>
					<Route path='/' element={<HomePage />} />
				</Routes>
			</main>
		</Router>
	);
}

export default App;
