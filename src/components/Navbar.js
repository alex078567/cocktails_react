import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
// для навигации по страницам при использовании React Router вместо 
// тега <a></a> испоьзуется Link
const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="nav-center">
				<Link to="/">
					<img className="logo" src={logo} alt="cocktail db logo" />
				</Link>
			</div>
			<ul className="nav-links">
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="about">About</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
