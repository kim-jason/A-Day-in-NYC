import React from 'react';
import SubwayIcon from '@material-ui/icons/Subway';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import RoomTwoToneIcon from '@material-ui/icons/RoomTwoTone';
import grey from "@material-ui/core/colors/grey";
import '../style/ResultCells.css';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';


function ResultCells(props) {
	return (
		<div className="resultCells">
			<div className='usercell'>
				<div className="header-left">
					<LocalTaxiIcon style={{ color: "grey" }} />
					<div className="cellinfo">
						<h4>Taxi</h4>
					</div>
				</div>
				<div className="header-right"><h5>${(props.cellsData.taxi.price).toFixed(2)}</h5>
					<p>{Math.round(props.cellsData.taxi.duration)} min</p></div>
			</div>
			<div className='usercell'>
				<div className="header-left">
					<PhoneIphoneIcon style={{ color: "grey" }} />
					<div className="cellinfo">
						<h4>Lyft</h4>
					</div>
				</div>
				<div className="header-right"><h5>${(props.cellsData.lyft.reg_price / 100).toFixed(2)}</h5>
					<p>{Math.round(props.cellsData.lyft.reg_duration / 60)} min</p></div>
			</div>
			{props.cellsData.subway !== undefined &&
				<div className='subwaycell'>
					<div className="header-cont">
						<div className="header-left">
							<SubwayIcon style={{ color: "grey" }} />
							<div className="cellinfo">
								<h4>Subway</h4>
							</div>
						</div>
						<div className="header-right"><h5>{props.cellsData.subway.num_transfers} transfers</h5></div>
					</div>
					<div className="subwayDirections">
						<List dense={true}>
							<ListItem>
								<ListItemIcon><FiberManualRecordTwoToneIcon /></ListItemIcon>
								<ListItemText
									primary={`${props.cellsData.subway.sourceStation} station`}
									secondary={props.cellsData.subway.sourceLine}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon><RoomTwoToneIcon /></ListItemIcon>
								<ListItemText
									primary={`${props.cellsData.subway.destStation} station`}
									secondary={props.cellsData.subway.destLine}
								/>
							</ListItem>
						</List>
					</div>
				</div>
			}
		</div>

	)
}

export default ResultCells