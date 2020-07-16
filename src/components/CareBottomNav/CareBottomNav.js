import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import './CareBottomNav.css';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
    },
});

 const CareBottomNav = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        console.log("new val is " + newValue);
        history.push(`/${newValue}`);
        setValue(newValue);
    };

    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            className={classes.root}
            id="careBottomNav"
        >
            <BottomNavigationAction label="Login" value="login" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Register" value="register" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="ProviderPanel" value="provider" icon={<LocationOnIcon />} />
        </BottomNavigation>
    );
}

export default CareBottomNav;