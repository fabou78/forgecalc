import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
    track: {
        width: '95%',
        height: 20,
        background: '#777',
        borderRadius: 10,
        boxShadow: '0 3px 5px 2px rgba(191, 191, 191, .3)'
    },
    filling: {
        width: props => props.percentage,
        height: '100%',
        background: '#1e88e5',
        borderRadius: 8,
    }
  });


function ProgressBar(props) {
    const classes = useStyles(props);
        return (
            <div className={classes.track}>
                <div className={classes.filling}></div>
            </div>
        )
    };


export default ProgressBar;

