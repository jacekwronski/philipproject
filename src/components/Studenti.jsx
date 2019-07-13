import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import { List, ListItem, ListItemText } from '@material-ui/core';
var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'keyNJGcRLBLYAvWZF' }).base('app8oTIjODSqAL6Fp');

function getModalStyle() {
    return {
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
    };
}

var names = [];

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    paper: {
        position: 'absolute',
        /*width: 400,*/
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none',
    },
}));


base('Allievi').select({
    // Selecting the first 3 records in Pendenti mese (i/sc):
    
    view: "Attivi in classi (i/sc)"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function (record) {
        names.push({ id: record.id, name: record.get('Cognome e Nome') })
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});


const Studenti = () => {
    
    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);

 return (<div style={modalStyle} className={classes.paper}>
        <List>
            {names.map((value) => (
                <ListItem  key={value.id}>
                    <ListItemText primary={value.name} />
                </ListItem>
            ))}
        </List>
 </div>)  
}

export default withRouter(Studenti)