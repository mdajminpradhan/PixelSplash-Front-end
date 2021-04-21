import React, { useEffect, useState } from 'react';
import Base from '../core/Base';
import './Home.css';
import heroImage from '../assets/henrique-ferreira-a42M7a6T1jw-unsplash.jpg';
import Picimage from './Picimage';
import { getAllPicture } from './coreapicalls/apicalls';

function Home() {
	const [ pictures, setPictures ] = useState([]);

	const preload = () => {
		getAllPicture()
			.then((response) => {
				setPictures(response);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		preload();
	}, []);

	const heroSection = () => {
		return (
			<div className="herosection">
				<div className="herosection__content">
					<h5>Welcome to PixelSplash</h5>
					<h2>Explore Amazing Copyright free High Quality Images</h2>
					<h3>For Your Project</h3>
				</div>
			</div>
		);
	};

	return (
		<Base>
			{heroSection()}
			<div className="picimages__container">
				{pictures.map((picture, index) => <Picimage key={index} image={picture} />)}
			</div>
		</Base>
	);
}

export default Home;
