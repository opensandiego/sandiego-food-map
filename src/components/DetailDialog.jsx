import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import React from "react";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  title: {  
    flexGrow: 1,
    color: 'white',
},
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const DetailDialog = ({handleDetailClose, detail, classes}) => (
<Dialog fullScreen open={true} onClose={handleDetailClose} TransitionComponent={Transition}>
<AppBar className={classes.detailAppBar}>
    <Toolbar>
    <IconButton edge="start" color="inherit" onClick={handleDetailClose} aria-label="close">
        <CloseIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
        {detail.Name}
    </Typography>
    <Button autoFocus color="inherit" onClick={handleDetailClose}>
        close 
    </Button>
    </Toolbar>
</AppBar>
<Container className={classes.dialogContent}>
    <Typography variant="h4">{detail.Full_Service_Name__c}</Typography>
    <Typography variant="h6">Address</Typography>
    <Typography>
        {detail.Physical_Address__c}<br/>
        {detail.Physical_City__c}, {detail.Physical_Zip__c}<br/>
        <Link href={"tel:"+detail.Phone_Number__c}>
            {detail.Phone_Number__c}
        </Link>
    </Typography>
    <Typography variant="h6">Description</Typography>
    <Typography>
            {detail.Description__c}
    </Typography>
    <Typography variant="h6">Eligibility</Typography>
    <Typography>
            {detail.Eligibility__c}
    </Typography>
    <Typography variant="h6">Hours of Operation</Typography>
    <Typography>
            {detail.Hours_of_Operation__c}
    </Typography>
</Container>
</Dialog>);



export default withStyles(styles)(DetailDialog);