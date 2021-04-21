import React, { useEffect, useState } from 'react';
import './CategoryImage.css';
import Base from '../core/Base';
import { getPictureByCategory } from './coreapicalls/apicalls';
import Picimage from './Picimage';

const CategoryImage = ({ match }) => {
	const [ pictures, setPictures ] = useState({
		pictures: [],
		error: false,
		success: true
	});

	const preload = (cateId) => {
		getPictureByCategory(cateId)
			.then((response) => {
				if (response.error) {
					setPictures({ ...pictures, error: true, success: false });
				} else {
					setPictures({ ...pictures, error: false, success: true, pictures: response });
				}
			})
			.catch((error) => console.log(error));
	};

	useEffect(
		() => {
			preload(match.params.categoryId);
		},
		[ match.params.categoryId ]
	);

	const errormessage = () => {
		pictures.error && <p>No pictures found!</p>;
	};

	const ifSuccessLoadImages = () => {
		return pictures.success && pictures.pictures.map((picture, index) => <Picimage key={index} image={picture} />);
	};

	return (
		<Base>
			{errormessage()}
			<div className="picimages__container">{ifSuccessLoadImages()}</div>
		</Base>
	);
};

export default CategoryImage;
