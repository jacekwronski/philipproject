import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Modal, Chip, FormControl, InputLabel, Select, Input, MenuItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'keyNJGcRLBLYAvWZF' }).base('app8oTIjODSqAL6Fp');

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

var names = [];


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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getModalStyle() {
    return {
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
    };
}


const Presenze = () => {

    const [personName, setPersonName] = React.useState([]);
    const [modalStyle] = React.useState(getModalStyle);
    const theme = useTheme();

    function addPresenti() {
        base('Presenze').create({
            "Presenti": personName
        }, function (err, record) {
            if (err) {
                console.error(err);
                return;
            }
        });
    }

    function handleChange(event) {
        setPersonName(event.target.value);
    }

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
    const classes = useStyles();

    return (<div style={modalStyle} className={classes.paper}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="select-multiple-chip">Seleziona...</InputLabel>
                    <Select
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={selected => (
                            <div className={classes.chips}>
                                {selected.map(value => (
                                    <Chip key={value} label={value} className={classes.chip} />
                                ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {names.map(value => (
                            <MenuItem key={value.id} value={value.id} style={getStyles(value.name, personName, theme)}>
                                {value.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button onClick={addPresenti} variant="contained" className={classes.button}>
                        Salva presenze
                        </Button>
                </FormControl>
            </div>)
}

export default withRouter(Presenze)