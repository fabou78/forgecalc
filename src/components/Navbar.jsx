import React, { Component } from 'react';

import { AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: 'relative',
  },
  productLogo: {
    display: 'inline-block',
    borderLeft: `1px solid ${theme.palette.grey['A100']}`,
    marginLeft: 32,
    paddingLeft: 24
  },
  flex: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }
  },
  button: {
    margin: theme.spacing.unit,
  },
});


class Navbar extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position='static' color='primary'>
          <Grid container spacing={24} alignItems='baseline'>
          <Grid item xs={12} className={classes.flex}>
            <Toolbar>
              <Typography variant='h6' color='inherit'>
                <strong>My Tools</strong>
              </Typography>
              <div className={classes.productLogo}>
                <Typography color='inherit'>
                  Some useful tools... &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
              </div>
              <Button variant="contained" color="secondary" className={classes.button}>Profit Calc</Button>
              <Button variant="contained" color="secondary" className={classes.button}>Secure Place</Button>
            </Toolbar>
          </Grid>
          </Grid>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(Navbar);



