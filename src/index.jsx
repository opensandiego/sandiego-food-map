import "./style.css";

// React
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

// Leaflet Style and JS for React
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import marker_icon from "leaflet/dist/images/marker-icon.png";
import newMarker from "../assets/newMarker.svg";

import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

// React and MAterial - UI
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import AddressLookUp from "./components/AddressLookUp.jsx";
import SelfLookUp from "./components/SelfLookUp.jsx";
import DetailDialog from "./components/DetailDialog.jsx";
import DrawerStyled from "./components/DrawerStyled.jsx";
import AlertDialog from "./components/AlertDialog.jsx";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";
import PopUpInfo from "./components/PopUpInfo.jsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// Load And Parse Data
import parse from "csv-parse/lib/sync";
import axios from "axios";
import { Tooltip } from "leaflet";

// Constants
const SAN_DIEGO_CENTER = [32.8546305, -117.051348];
const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/1PACX-1vTSnF1wYkCiAbHAqhs_WG2i0EjVh5JPRTAp5pQW-9b_52TsYuaEOzNgz8EbFEGO6JB1o2Okd4QWRAWR/pub?output=csv";
const DRAWER_WIDTH = 240;

// leaflet css does not import into webpack nicely
const blueIcon = L.icon({
  iconUrl: marker_icon,
});

const newIcon = L.icon({
  iconUrl: newMarker,
  iconSize: [40, 40],
});

// clean tel numbers for tel+ links
const telLinkRE = /[^\d]/g;

// From Drawer Example
// https://material-ui.com/components/drawers/
const useStyles = makeStyles((theme) => ({
  app: {},
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -DRAWER_WIDTH,
    justifyContent: "flex-end",
  },
  map: {
    height: `calc(100% - 64px)`, // TODO make this adapt to header height
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  dialogContent: {
    marginTop: "100px", // TODO make this adapt to header height
  },
}));

function FoodMap() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [filters, setFilters] = React.useState({ Service_Status__c: "Active" });
  const [detail, setDetail] = React.useState(null);
  const [centerZoom, setCenterZoom] = React.useState(10);
  const [position, setPosition] = React.useState(SAN_DIEGO_CENTER);
  const [openButton, setOpenButton] = React.useState(false);
  const [isLocating, setLocating] = React.useState(false);

  const handleDataLoaded = (data) => {
    setData(data);
  };

  const handleDetailClose = () => {
    setDetail(null);
  };

  const handleClose = () => {
    setOpenButton(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onSearchComplete = (data) => {
    if (data[0]) {
      {
        setLocating(true);
        setPosition([data[0].lat, data[0].lon]), setCenterZoom(15);
      }
    } else {
      setOpenButton(true);
    }
  };

  function ZoomComponent(props) {
    const map = useMap();
    map.setView(props.center, centerZoom);
    return null;
  }

  const locateUser = () => {
    navigator.geolocation.getCurrentPosition((e) => {
      setPosition([e.coords.latitude, e.coords.longitude], setCenterZoom(13));
    });
    setLocating(true);
  };

  // Effect to load our data
  useEffect(() => {
    if (data.length == 0) {
      axios.get(CSV_URL).then((response) => {
        const locations = parse(response.data, {
          columns: true,
          skip_empty_lines: true,
        });
        console.log(locations);
        setData(locations);
        window.data = locations;
      });
    }
  });

  // Processed data
  const filtered_list = data.filter((d) => {
    for (var k in filters) {
      if (d[k] != filters[k]) {
        return false;
      }
    }
    return true;
  });

  // Group markers by zip
  const by_zip = filtered_list.reduce((by_zip, d) => {
    if (!by_zip.hasOwnProperty(d.Physical_Zip_Code__c)) {
      by_zip[d.Physical_Zip_Code__c] = [];
    }
    by_zip[d.Physical_Zip_Code__c].push(d);
    return by_zip;
  }, {});

  window.by_zip = by_zip;
  // Then generate marker clusters
  const marker_clusters = Object.entries(by_zip).map((zip_data) => {
    const markers = zip_data[1].map((d) => {
      const pos = [d.Geo_Location__Latitude__s, d.Geo_Location__Longitude__s];
      const marker = (
        <PopUpInfo
          d={d}
          position={pos}
          icon={blueIcon}
          setDetail={setDetail}
          isLocating={false}
        />
      );
      return marker;
    });
    return <MarkerClusterGroup key={zip_data[0]}>{markers}</MarkerClusterGroup>;
  });

  // Generate Drawer items
  // NOT USED
  const list_items = filtered_list.map((d) => {
    const phone = `tel:${d.Phone_Number__c.replaceAll(telLinkRE, "")}`;
    return (
      <ListItem key={d.Id}>
        <Typography>{d.Name}</Typography>
        <Link href={phone}>{d.Phone_Number__c}</Link>
      </ListItem>
    );
  });

  const detailDialog =
    detail != null ? (
      <DetailDialog
        classes={classes}
        handleDetailClose={handleDetailClose}
        detail={detail}
      />
    ) : null;

  // Return our fragment
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
          <AlertDialog openButton={openButton} handleClose={handleClose} />
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            San Diego Food Map
          </Typography>
          <AddressLookUp onSearchComplete={onSearchComplete} />
          <SelfLookUp onClick={locateUser} />
          <Button
            href="https://github.com/opensandiego/sandiego-food-map"
            color="inherit"
            target="_blank"
          >
            About
          </Button>
        </Toolbar>
      </AppBar>

      <DrawerStyled
        open={open}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
        classes={classes}
      />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <MapContainer
          center={SAN_DIEGO_CENTER}
          zoom={10}
          scrollWheelZoom={true}
          className={classes.map}
        >
          <ZoomComponent center={position} />
          <ZoomControl position="bottomright" />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {marker_clusters}

          {isLocating && (
            <PopUpInfo
              d={data}
              position={position}
              icon={newIcon}
              isLocating={true}
              setDetail={setDetail}
            />
          )}
        </MapContainer>
      </main>
      {detailDialog}
    </React.Fragment>
  );
}

ReactDOM.render(<FoodMap />, document.getElementById("app"));
