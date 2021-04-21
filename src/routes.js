import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CategoryImage from './user/CategoryImage';
import Home from './user/Home';

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/pictures/:categoryId" component={CategoryImage} />
				<Route path="/" component={Home} />
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;
