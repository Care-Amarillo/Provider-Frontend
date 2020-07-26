import React from 'react';
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import CareAppDrawer from "../../containers/CareAppDrawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
    }
}));



// simply write a function in ES6+ then pass in the keyword props to access this special object
const CareAppNav = (props) => {
    const classes = useStyles();
    // every component in React MUST return something...
    // notice the ( ) after the return. This is called an implicit return
    const { container } = props;
    const theme = useTheme();

    const handleDrawerToggle = () => {
        console.log("handle drawer toggle");
        // setMobileOpen(!mobileOpen);
        props.setOpen(!props.mobileOpen);
    };


    // todo: maybe change to functional component
    const appBar = (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Care Amarillo
                </Typography>
            </Toolbar>
        </AppBar>
    );

    return (

        <div>
            {appBar}
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === "rtl" ? "right" : "left"}
                    open={props.mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                >
                    <CareAppDrawer/>

                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    variant="permanent"
                    open
                >
                    <CareAppDrawer/>
                </Drawer>
            </Hidden>
        </nav>
        </div>
    )
}

// Then, because we want to compose our web pages with composable elements we have to export the code in the file. Always write this line at then end of your .js files:
export default CareAppNav