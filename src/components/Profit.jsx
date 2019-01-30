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
    fielderror: false,
    remain: 0,
    msg1: '',
    msgcolor: '#000000'
  }

  calculateResults = () => {
    let { remain, overtake, fpwin } = this.state;
    // Taking into account user blanking the field (backspace)
    if (isNaN(remain)) remain = 0;
    if (isNaN(overtake)) overtake = 0;
    if (isNaN(fpwin)) fpwin = 0;
    let bidcost = (Math.ceil((remain + overtake) / 2));
    let reward = Math.floor(fpwin * 1.9);
    if (remain > bidcost) {
      if (reward > bidcost) {
        this.setState({
          msg1: 'There will be a profit of ' + (reward - bidcost) + ' FP(s)',
          msgcolor: '#177e0e'
        })
      } else if (reward === bidcost) {
        this.setState({
          msg1: 'No profit nor loss on this transaction',
          msgcolor: '#fed029'
        })
      } else {
        this.setState({
          msg1: 'There will be a loss of ' + (reward - bidcost) + ' FP(s)',
          msgcolor: '#b70431'
        });
      }
    } else {
      // There is still a small chance that the player win while leveling the GB
      this.setState({ msg1: 'Player can\'t win', msgcolor: '#b70431' });
    }
  }

  handleChange = (event) => {
    /*   TODO:
       * nb for player to overtake can't be above level cost
       * nb for player to overtake can't be above current deposit
    */
    this.setState({ msg1: '' });
    const { name, value } = event.target;
    let intValue = parseInt(value, 10);
    if (intValue < 0) intValue = 0;
    this.setState({
      [name]: intValue
    }, () => {
      if (this.state.curdeposit >= this.state.levelcost) {
        this.setState({ fielderror: true });
      } else {
        this.setState({ fielderror: false });
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
                error={this.state.fielderror}
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
                error={this.state.fielderror}
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
                FPs remaining for current level: {(!isNaN(this.state.remain)) && this.state.remain}
              </Typography>
              {(this.state.msg1 !== '') &&
                <Typography variant='body1' align='left' paragraph>
                  <strong><span style={{ color: `${this.state.msgcolor}` }}>{this.state.msg1}</span></strong>
                </Typography>
              }
            </Grid>
          </Grid> {/* container */}
          <Grid className={classes.result} container spacing={0} direction='row' justify='flex-start'>
            <Grid item xs={12} >
              <Typography color='secondary'>
                <Info className={classes.icon} />
                <span className={classes.icon}>
                  &nbsp;Profit is calculated based on the investing player owning a level 80 Arc
                </span>
              </Typography>
            </Grid>
          </Grid> { /* container */ }
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Profit);