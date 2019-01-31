import React, { Component, Fragment } from 'react';

import { Paper, Typography, TextField, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Info from '@material-ui/icons/Info';

import { Line } from 'rc-progress';


const styles = theme => ({
  layout: {
    width: 'auto',
    marginTop: theme.spacing.unit * 5,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  result: {
    marginTop: 30
  },
  info: {
    marginTop: 20
  },
  progress: {
    marginBottom: 15
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
    msg2: false,
    msgcolor: '#000000',
    reward: 0,
    bidcost: 0,
    progressbar: 0
  }

  calculateResults = () => {
    let { remain, overtake, fpwin, curdeposit, levelcost } = this.state;
    // Taking into account user blanking the field (backspace)
    if (isNaN(remain)) remain = 0;
    if (isNaN(overtake)) overtake = 0;
    if (isNaN(fpwin)) fpwin = 0;
    if (isNaN(curdeposit)) curdeposit = 0;
    if (isNaN(levelcost)) levelcost = 0;
    if (levelcost>0 && curdeposit>0) {
      this.setState({progressbar: Math.ceil((curdeposit / levelcost)*100)});
    } else {
      this.setState({progressbar: 0});
    }
    let bidcost = (Math.ceil((remain + overtake) / 2));
    let reward = Math.floor(fpwin * 1.9);
    this.setState({reward});
    this.setState({bidcost});
    if (remain > bidcost) {
      if (reward > bidcost) {
        this.setState({
          msg1: 'There will be a profit of ' + (reward - bidcost) + ' FP(s)',
          msgcolor: '#177e0e',
          msg2: true
        })
      } else if (reward === bidcost) {
        this.setState({
          msg1: 'No profit nor loss on this transaction',
          msgcolor: '#fed029',
          msg2: true
        })
      } else {
        this.setState({
          msg1: 'There will be a loss of ' + (reward - bidcost) + ' FP(s)',
          msgcolor: '#b70431',
          msg2: true
        });
      }
    } else {
      // There is still a small chance that the player win while leveling the GB
      this.setState({ msg1: 'Player can\'t win',
        msgcolor: '#b70431',
        msg2: false
      });
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
      <div className={classes.layout}>
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
                label='Current deposits'
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
                label='Cost to level GB'
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
                label='Amount to overtake'
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
                label='Targeted place reward'
                type='number'
                fullWidth
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              {(this.state.curdeposit!==0 && this.state.levelcost!==0 && this.state.fielderror===false) &&
                <Fragment>
                  <Typography variant='body1' align='left' >
                    <strong>Summary: </strong>
                  </Typography>
                  <Typography variant='body1' align='center' >
                    {this.state.curdeposit} / {this.state.levelcost}
                  </Typography>
                  <Line
                    className={classes.progress}
                    percent={this.state.progressbar}
                    strokeLinecap='butt'
                    trailWidth='3'
                    strokeWidth='3'
                    strokeColor='#215d1b'
                  />
                  {(!isNaN(this.state.remain) && (this.state.remain!==0)) &&
                    <Typography variant='body1' align='left' >
                      Remaining FP to level GB:
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {this.state.remain}
                    </Typography>
                  }
                  {(!isNaN(this.state.overtake) && (this.state.overtake!==0)) &&
                    <Typography variant='body1' align='left' >
                      Nb of FP of player to overtake :
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;
                      {this.state.overtake}
                    </Typography>
                  }
                  {(!isNaN(this.state.reward) && (this.state.reward!==0)) &&
                    <Typography variant='body1' align='left' >
                      Reward (Arc bonus applied):
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {this.state.reward}
                    </Typography>
                  }
                  {(this.state.msg1 !== '') &&
                    <Fragment>
                      <Typography className={classes.result} variant='body1' align='left' >
                        <strong>Results: </strong>
                      </Typography>
                      {(this.state.msg2) &&
                        <Typography>
                          The player will need to invest {this.state.bidcost} FP while gaining {this.state.reward} FP.
                        </Typography>
                      }
                      <Typography variant='body1' align='left' >
                        <strong><span style={{ color: `${this.state.msgcolor}` }}>{this.state.msg1}</span></strong>
                      </Typography>
                    </Fragment>
                  }
                </Fragment>
              }
            </Grid>
          </Grid> {/* container */}
          <Grid container spacing={0} direction='row' justify='flex-start'>
            <Grid item className={classes.info} xs={12} >
              <Typography color='secondary'>
                <Info className={classes.icon} />
                <span className={classes.icon}>
                  &nbsp;Result is calculated based on the investing player owning a level 80 Arc
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