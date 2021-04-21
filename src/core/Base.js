import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, uploadPicture } from './coreapicalls/coreapicalls';
import Menu from './Menu';

function Base({ children }) {
	const [ categories, setCategories ] = useState([]);

	const [ values, setValues ] = useState({
		picture: '',
		category: '',
		formData: '',
		error: false,
		success: false
	});

	const { picture, category, formData, error, success } = values;

	const preload = () => {
		getCategories()
			.then((response) => {
				setCategories(response);
				setValues({ ...values, formData: new FormData() });
			})
			.catch((error) => console.log(error));
	};

	const handleChange = (name) => (event) => {
		const value = name === 'picture' ? event.target.files[0] : event.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });

		// for (var pair of formData.entries()) {
		// 	console.log(pair[0]+ ', ' + pair[1]);
		// }
	};

	useEffect(() => {
		preload();
	}, []);

	const onSubmit = (event) => {
		event.preventDefault();

		uploadPicture(formData).then((response) => {
			if (response.error) {
				setValues({ ...values, error: true });
				console.log(response.error);
			} else {
				setValues({
					...values,
					picture: '',
					category: '',
					success: true
				});
			}
			// console.log(response);
		});
		// .catch((error) => {
		// 	console.log(error);
		// });
	};

	const successMessage = () => {
		return (
			<p className="alert alert-success mt-4" style={{ display: success ? 'block' : 'none' }}>
				Picture has been uploaded successfully...
			</p>
		);
	};

	const errorMessage = () => {
		return (
			<p className="alert alert-warning mt-4" style={{ display: error ? 'block' : 'none' }}>
				Picture uploading failed
			</p>
		);
	};

	return (
		<div>
			<div className="navfixed">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<div className="container">
						<Link className="navbar-brand" to="/">
							PixelSplash
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon" />
						</button>
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
								<li className="nav-item">
									<Link className="nav-link active" aria-current="page" to="/">
										Home
									</Link>
								</li>
								<li className="nav-item">
									<a className="nav-link">
										<button
											type="button"
											className="btn btn-primary btn-sm"
											data-bs-toggle="modal"
											data-bs-target="#exampleModal"
										>
											Upload Picture
										</button>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>

				<Menu />
			</div>

			{children}

			{/* modal is here becasuse of positon issue */}
			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Modal title
							</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
						</div>
						<div className="modal-body">
							<form onSubmit={onSubmit}>
								<div className="row">
									<div className="com-sm-6 col-lg-6 col-md-6 col-xl-6">
										<div class="mb-3">
											<label for="formFileSm" class="form-label">
												Select picture
											</label>
											<input
												class="form-control form-control-sm"
												id="formFileSm"
												type="file"
												onChange={handleChange('picture')}
											/>
										</div>
									</div>
									<div className="com-sm-6 col-lg-6 col-md-6 col-xl-6">
										<div className="mb-3">
											<label for="formFileSm" class="form-label">
												Category
											</label>
											<br />
											<select
												class="form-select-sm"
												aria-label="Default select"
												onChange={handleChange('category')}
											>
												<option selected>Select</option>
												{categories.map((category, index) => (
													<option key={index} value={category._id}>
														{category.name}
													</option>
												))}
											</select>
										</div>
									</div>
								</div>
								{errorMessage()}
								{successMessage()}
								<button type="submit" className="btn btn-primary btn-sm pull-right">
									Upload
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Base;
