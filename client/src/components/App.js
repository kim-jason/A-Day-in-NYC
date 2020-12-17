import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Explore from './Explore';
import Plan from './Plan';
import Login from './Login';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Login />
							)}
						/>
						<Route
							exact
							path="/explore"
							render={() => (
								<Explore />
							)}
						/>
						<Route
							path="/plan"
							render={() => (
								<Plan />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}