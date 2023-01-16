import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Импорт страниц
import Home from "./pages/Home";
import About from "./pages/About";
import SingleCocktail from "./pages/SingleCocktail";
import Error from "./pages/Error";
// Импорт компонентов
import Navbar from "./components/Navbar";

function App() {
	return (

		<Router>
			<Navbar />
			//определяем набор маршрутов
			<Routes>
				{/* Определяем маршруты */}
				<Route path="/" element={<Home />} />
				<Route path="about" element={<About />} />
				<Route path="cocktail/:id" element={<SingleCocktail />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</Router>
	);
}

export default App;
