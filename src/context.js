import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

//создаем объект типа Context
const AppContext = React.createContext();

//компонент который позволяет получить доступ к данным и методам 
//содержащимся в контексте
const AppProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("a");
	const [cocktails, setCocktails] = useState([]);

	// функция fetchDrinks которая производит запрос данных по url
	// useCallback здесь используется так как в зависимостях useEffect содержится
	// fetchDrinks() и если не использовать useCallback, то происходит бесконечный цикл
	const fetchDrinks = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch(`${url}${searchTerm}`);

			if (!response.ok) {
				throw new Error(response.status);
			}

			const data = await response.json();
			const { drinks } = data;
			if (drinks) {
				const newCocktails = drinks.map((drink) => {
					const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
						drink;
					return {
						id: idDrink,
						name: strDrink,
						image: strDrinkThumb,
						info: strAlcoholic,
						glass: strGlass,
					};
				});
				setCocktails(newCocktails);
				setLoading(false);
			} else {
				setCocktails([]);
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}, [url, searchTerm]);

	//каждый раз, когда строка поиска изменяется, загрузить новые данные
	useEffect(() => {
		fetchDrinks();
	}, [searchTerm, fetchDrinks]);

	return (
		<AppContext.Provider
			value={{ loading, searchTerm, cocktails, setSearchTerm }}
		>
			{children}
		</AppContext.Provider>
	);
};
// создаем кастомный хук, для того чтобы получить доступ к данным и методам
// в контексте
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
