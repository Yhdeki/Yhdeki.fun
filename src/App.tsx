import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlackjackPage from "./pages/BlackJackPage";
import "./index.css";
import { CasinoProvider } from "./Contexts/CasinoContext";

function App() {
    return (
        <CasinoProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/blackjack" element={<BlackjackPage />} />
					{/* Add more routes as you build more games */}
				</Routes>
			</BrowserRouter>
		</CasinoProvider>
    );
}

export default App;
