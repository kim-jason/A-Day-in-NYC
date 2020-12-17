import React from 'react';
import '../style/POICells.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export default class POICells extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			favorited: false
		}
		this.favoritePOI = this.favoritePOI.bind(this);
	}

	favoritePOI() {
		this.setState({
			favorited: !this.state.favorited
		}, () => {
			this.props.addToFavorites(this.props.name, this.state.favorited);
		});
	}

	render() {
		return (
			<div className="resultCells">
				<div className='usercell'>
					<div className="header-left">
						<div className="cellinfo">
							<h4 className="text-box" >{this.props.name}</h4>
						</div>
					</div>
					<div className="header-right" onClick={this.favoritePOI} ><h5>{this.state.favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}</h5></div>
				</div>
			</div>
		)
	}
}