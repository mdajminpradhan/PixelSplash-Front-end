import React from 'react';
import './Picimage.css';

const Picimages = ({ image }) => {

	console.log(image)

	return (
		<div className="pxiamges">
			<div className="container">
				<div className="pxiamges__image">
					<img
						src={`data:image/png;base64,${Buffer.from(image.picture.data.data).toString('base64')}`}
						alt=""
					/>
				</div>
			</div>
		</div>
	);
};

export default Picimages;
