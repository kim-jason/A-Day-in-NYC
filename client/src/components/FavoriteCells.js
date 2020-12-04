import React from 'react';
import '../style/POICells.css';

export default class FavoriteCells extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="resultCells">
            <div className='usercell'>
                <div className="header-left">
                    <div className="cellinfo">
                        <h4>{this.props.name}</h4>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}