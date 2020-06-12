import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DepressionComponent from './DepressionComponent'
import DurationInfo from './data/depressionDuration.json'


// const useStyles = makeStyles({
//     root: {
//         flexGrow: 1
//     }
// });

function Navigation(props) {

    const index = props.option === "Overview" ? 0 : props.option === "Reporting Data" ? 1 : 2;
    // const classes = useStyles();

    const indexSelect = (e, index) => {
        props.onSelect(index === 0 ? "Overview" : index === 1 ? "Reporting Data" : "Verification")
    }

    console.log("This is the screen " + props.stateScreen);
    return (
        <Tabs
            value={index}
            onChange={indexSelect}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab label="Overview" />
            <Tab label="Reporting Data" />
            <Tab label="Verification" />
        </Tabs>
    );
}

export default Navigation;