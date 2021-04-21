import { API } from '../../backend';

export const getAllPicture = () => {
	return fetch(`${API}/pictures`, {
		method: 'GET'
	})
		.then((response) => response.json())
		.catch((error) => console.log(error));
};


export const getPictureByCategory = (cateId) => {
	return fetch(`${API}/picture/${cateId}`, {
		method: 'GET'
	})
		.then((response) => response.json())
		.catch((error) => console.log(error));
};
