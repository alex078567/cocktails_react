import React, { useState } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
	//хук useParams позволяет получить данные типа ключ/значение из URL
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [cocktail, setCocktail] = useState(null);
	React.useEffect(() => {
		setLoading(true);
		async function getCocktails() {
			try {
				const response = await fetch(`${url}${id.slice(1)}`);

				if (!response.ok) {
					throw new Error(response.status);
				}

				const data = await response.json();

				const { drinks } = data;
				if (drinks) {
					const {
						idDrink: id,
						strDrink: name,
						strDrinkThumb: image,
						strAlcoholic: info,
						strCategory: category,
						strInstructions: instructions,
						strGlass: glass,
						strIngredient1: ingredient1,
						strIngredient2: ingredient2,
						strIngredient3: ingredient3,
						strIngredient4: ingredient4,
						strIngredient5: ingredient5,
					} = drinks[0];
					const ingredients = [
						ingredient1,
						ingredient2,
						ingredient3,
						ingredient4,
						ingredient5,
					];
					const newCocktail = {
						id,
						name,
						image,
						info,
						category,
						instructions,
						glass,
						ingredients,
					};
					setCocktail(newCocktail);
				} else {
					setCocktail(null);
				}
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
		getCocktails();
	}, [id]);
	if (loading) {
		return <Loading />;
	}
	if (!cocktail) {
		return <h2 className="section-title">no cocktail to display</h2>;
	}
	const { name, image, category, info, glass, instructions, ingredients } =
		cocktail;
	return (
		<section className="section cocktail-section">
			<Link className="btn btn-primary" to="/">
				back home
			</Link>
			<h2 className="section-title">{name}</h2>
			<div className="drink">
				<img src={image} alt={name} />
				<div className="drink-info">
					<p>
						<span className="drink-data">name:</span>
						{name}
					</p>
					<p>
						<span className="drink-data">category:</span>
						{category}
					</p>
					<p>
						<span className="drink-data">info:</span>
						{info}
					</p>
					<p>
						<span className="drink-data">glass:</span>
						{glass}
					</p>
					<p>
						<span className="drink-data">instructions:</span>
						{instructions}
					</p>
					<p>
						<span className="drink-data">
							ingredients:
							<br />
						</span>
						{ingredients.map((item, index) => {
							return item ? (
								<span key={index}>
									{item} <br />
								</span>
							) : (
								""
							);
						})}
					</p>
				</div>
			</div>
		</section>
	);
};

export default SingleCocktail;
