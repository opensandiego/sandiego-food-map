import React from "react";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from '@material-ui/core/Divider';
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { withStyles, useTheme, makeStyles, withTheme } from "@material-ui/core/styles";

// const theme = useTheme();

// const DRAWER_WIDTH = 240;

// const styles = {

// //const styles = makeStyles(theme => ({
//   drawer: {
//     width: DRAWER_WIDTH,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: DRAWER_WIDTH,
//   },
//   drawerHeader: {
//     display: "flex",
//     alignItems: "center",
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     //...theme.mixins.toolbar,
//     justifyContent: "flex-end",
//   }}

//}))

const DrawerStyled = ({ classes, open, handleDrawerClose, theme }) => {
//const theme = useTheme();
return (
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
        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </div>
    <Divider />
    <List>
      <ListItem>
        <ListItemText>Filtering Coming Soon!</ListItemText>
      </ListItem>
    </List>
  </Drawer>
)};

export default DrawerStyled;

//export default withStyles(styles)(DrawerStyled);
