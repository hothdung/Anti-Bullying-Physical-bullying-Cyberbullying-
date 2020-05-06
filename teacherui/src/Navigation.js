import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const useStyles = makeStyles({
    root: {
        paddingTop: '0px'
    }
});

export default function Navigation() {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Tabs
                value={0}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Overview" />
                <Tab label="Reporting Data" />
            </Tabs>
        </Paper>
    );
}