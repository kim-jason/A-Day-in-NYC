import React from 'react';
import SubwayIcon from '@material-ui/icons/Subway';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import grey from "@material-ui/core/colors/grey";
import '../style/ResultCells.css';


function ResultCells() {
    return (
        <div className="resultCells">
            <div className='usercell'>
                <div className="header-left">
                    <SubwayIcon style={{ color: "grey" }}/>
                    <div className="cellinfo">
                        <h4>Subway</h4>
                    </div>
                </div>
                <div className="header-right"><h5>$15</h5><p>15 min</p></div>
            </div>
            <div className='usercell'>
                <div className="header-left">
                    <LocalTaxiIcon style={{ color: "grey" }}/>
                    <div className="cellinfo">
                        <h4>Taxi</h4>
                    </div>
                </div>
                <div className="header-right"><h5>$15</h5><p>15 min</p></div>
            </div>
            <div className='usercell'>
                <div className="header-left">
                    <PhoneIphoneIcon style={{ color: "grey" }}/>
                    <div className="cellinfo">
                        <h4>Lyft</h4>
                    </div>
                </div>
                <div className="header-right"><h5>$15</h5><p>15 min</p></div>
            </div>
        </div>

    )
}

export default ResultCells