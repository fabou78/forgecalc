import React, { Component } from 'react';

import { Paper, Typography, TextField, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Info from '@material-ui/icons/Info';


const styles = theme => ({  
  root: {
    flexGrow: 1,
    margin: 40,
    overflow: 'hidden',
    padding: `0 ${theme.spacing.unit * 3}px`,
  },
  paper: {    
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
  },
  result: {
    marginTop: 30
  },
  icon: {
    verticalAlign: 'middle'
  }
});


class Profit extends Component {
  state = {
    curdeposit: 0,
    levelcost: 0,
    overtake: 0,
    fpwin: 0,
    error: false,
    remain: 0,
    msg1: ''
  }

  calculateResults = () => {
    const { remain, overtake, fpwin } = this.state;
    let realcost = Math.ceil((remain + overtake) / 2);
    let reward = Math.floor(fpwin * 1.9);
    console.log('Realcost: ' + realcost);
    console.log('Reward: ' + reward);
    if (remain > realcost) {
      if (reward > realcost) {
        console.log('The profit will be ' + (reward - realcost));
      } else if (reward === realcost) {
        console.log('No profit nor loss on this transaction');
      } else {
        console.log('There will be a loss on this transaction ' + (reward - realcost));
      }
    } else {
      console.log('You can\'t win');
    }
  }

  handleChange = (event) => {
    // TODO: If some field get back to zero set msg1 = ''
    const { name, value } = event.target;
    var intValue = parseInt(value, 10);
    if (intValue < 0) intValue = 0;
    this.setState({
      [name]: intValue
    }, () => {
      if (this.state.curdeposit >= this.state.levelcost) {
        this.setState({ error: true });
      } else{
        this.setState({ error: false });
        this.setState({ remain: (this.state.levelcost - this.state.curdeposit) }, () => {
          this.calculateResults()
        });
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={4}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography variant='h4' align='center' color='primary'>
                FP Profit Calculator
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={this.state.curdeposit}
                error={this.state.error}
                name='curdeposit'
                label='Sum of current deposits'
                type='number'
                fullWidth
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={this.state.levelcost}
                error={this.state.error}
                name='levelcost'
                label='Level Cost'
                type='number'
                fullWidth
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={this.state.overtake}
                name='overtake'
                label='FP nb of the player to overtake'
                type='number'
                fullWidth
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={this.state.fpwin}
                name='fpwin'
                label='FP of the targeted place'
                type='number'
                fullWidth
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.result} variant='body1' align='left' >
              Number of FPs remaining to complete the level: {this.state.remain}
              </Typography>
              {(this.state.msg1 !== '') &&
                <Typography variant='body1' align='left' paragraph>
                  {this.state.msg1}
                </Typography>
              }
            </Grid>
          </Grid> {/* container */}
          <Grid className={classes.result} container spacing={0} direction='row' justify='flex-start'>
            <Grid item xs={12} >
              <Typography color='secondary'>
                <Info className={classes.icon} />
                <span className={classes.icon}> Profit is calculated based on player having an Arc at level 80</span>
              </Typography>
            </Grid>
          </Grid> { /* container */ }
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Profit);