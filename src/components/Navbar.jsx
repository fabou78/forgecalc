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
  version: {
    fontSize: '14px',
    fontStyle: 'italic'
  }
});


class Navbar extends Component {

  render() {
    const { classes, handleClick } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position='static' color='primary'>
          <Grid container spacing={24} alignItems='baseline'>
          <Grid item xs={12} className={classes.flex}>
            <Toolbar>
              <Typography variant='h6' color='inherit'>
                <strong>Fabou's FoE Tools</strong> <span className={classes.version}> v1.3.1</span>
              </Typography>
              <div className={classes.productLogo}>
                <Typography color='inherit'>
                  Hopefully useful... &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
              </div>
              <Button
                name="secure"
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleClick}
              >
                Secure Place
              </Button>
              <Button
                name="profit"
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleClick}
              >
                Profit Calc
              </Button>
              <Button
                name="fasttk"
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleClick}
              >
                FastTrack v1
              </Button>
              <Button
                name="fastng"
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleClick}
              >
                FastTrack v2
              </Button>
              <Button
                name="arcstats"
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleClick}
              >
                Guild Arc Stats
              </Button>
            </Toolbar>
          </Grid>
          </Grid>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(Navbar);



