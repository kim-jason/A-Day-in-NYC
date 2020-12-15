import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Recommendations from './Recommendations';
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
								<Dashboard />
							)}
						/>
						<Route
							path="/plan"
							render={() => (
								<Recommendations />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}