import './style.css';

// React
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

// Leaflet Style and JS for React
import 'leaflet/dist/leaflet.css';
import marker_icon from 'leaflet/dist/images/marker-icon.png'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

// React and MAterial - UI
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// Load And Parse Data
import parse from 'csv-parse/lib/sync';
import axios from 'axios';


// Constants
const SAN_DIEGO_CENTER = [32.8546305,-117.051348]
const SAN_DIEGO_ZOOM = 10
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/1PACX-1vTSnF1wYkCiAbHAqhs_WG2i0EjVh5JPRTAp5pQW-9b_52TsYuaEOzNgz8EbFEGO6JB1o2Okd4QWRAWR/pub?output=csv"
const DRAWER_WIDTH = 240;

// leaflet css does not import into webpack nicely
const blueIcon = L.icon({
    iconUrl: marker_icon
})

// clean tel numbers for tel+ links
const telLinkRE = /[^\d]/g


// From Drawer Example
// https://material-ui.com/components/drawers/
const useStyles = makeStyles((theme) => ({
  app: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -DRAWER_WIDTH,
    justifyContent: 'flex-end',
  },
  map: {
    height: `calc(100% - 64px)`  // TODO make this adapt to header height
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


function FoodMap(){
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([])

    const handleDataLoaded = (data) => {
        setData(data)
    }

    useEffect(() => {
        if(data.length == 0){
            axios.get(CSV_URL).then((response) => {
                const locations = parse(
                    response.data, 
                    { columns: true,skip_empty_lines: true}
                )
                console.log(locations)
                setData(locations)
            })
        }
    })

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

    const markers = data.map( (d) => {
        const pos = [d.Geo_Location__Latitude__s,d.Geo_Location__Longitude__s];
        return <Marker key={d.Id} position={pos} icon={blueIcon}>
            <Popup>
                {d.Agency__r__Name}<br/>
                {d.Name}<br/>
            </Popup>
        </Marker>
    })

    const list_items = data.map( (d) => {
        const phone = `tel:${d.Phone_Number__c.replaceAll(telLinkRE,'')}`
        return <ListItem key={d.Id}>
            <Typography>{d.Name}</Typography>
            <Link href={phone}>{d.Phone_Number__c}</Link>
        </ListItem>
    })

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        San Diego Food Map 
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
                >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {list_items}
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <MapContainer 
                    center={SAN_DIEGO_CENTER} 
                    zoom={SAN_DIEGO_ZOOM} 
                    scrollWheelZoom={true}
                    className={ classes.map }
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers}
                </MapContainer>
            </main>
        </React.Fragment>
    )
}

ReactDOM.render(<FoodMap />,document.getElementById("app"))