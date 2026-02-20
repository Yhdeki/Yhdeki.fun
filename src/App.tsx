import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlackjackPage from "./pages/BlackJackPage";
import { CasinoProvider } from "./Contexts/CasinoContext";
import ChinesePoker from "./pages/ChinesePokerPage";

function App() {
    return (
        <CasinoProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/blackjack" element={<BlackjackPage />} />
					<Route path="/chinese poker" element={<ChinesePoker />}></Route>
				</Routes>
			</BrowserRouter>
		</CasinoProvider>
    );
}

export default App;
