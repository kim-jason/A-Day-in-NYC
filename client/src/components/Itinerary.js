import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@material-ui/core';
import SubwayIcon from '@material-ui/icons/Subway';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(2, 2, 0),
    },
}));

function Itinerary(props) {

    const classes = useStyles();

    return (
        <div>
            <Typography variant="h6" className={classes.title}>
                Itinerary ({props.schedule.length})
            </Typography>
            <List >
                {props.schedule.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemIcon>
                            {item.mode===0 && <LocalTaxiIcon/>}
                            {item.mode===1 && <PhoneIphoneIcon/>}
                            {item.mode===2 && <SubwayIcon/>}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.description}
                            secondary={`$${item.price}`}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" 
                            onClick={(e) => props.deleteItem(index, item.price)}> 
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}

            </List>
        </div>
    )
}

export default Itinerary
