import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from './coreapicalls/coreapicalls';

const Menu = () => {
	const [ categories, setCategories ] = useState([]);

	const preload = () => {
		getCategories()
			.then((response) => {
				setCategories(response);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		preload();
	}, []);

	return (
		<div className="pictureCategories">
			<ul>
				{categories.map((categories, index) => (
					<li key={index}>
						<Link to={`/pictures/${categories._id}`}>{categories.name}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Menu;
