import { API } from '../../backend';

export const getCategories = () => {
	return fetch(`${API}/categories`, {
		method: 'GET'
	})
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

export const uploadPicture = (picture) => {
	return fetch(`${API}/upload/picture`, {
		method: 'POST',
		headers: {
			Accept: 'application/json'
		},
		body: picture
		// body: JSON.stringify(picture)
	})
		.then((response) => {
			return response.json();
			console.log(response);
		})
		.catch((error) => console.log(error));
};
