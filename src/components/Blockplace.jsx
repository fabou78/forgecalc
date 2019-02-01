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


class Blockplace extends Component {
  state = {
    curdeposit: 4,
    levelcost: 7,
    overtake: 3,
    fpwin: 1,
    myfp: 3,
    fielderror: false,
    remain: 0,
    msg1: '',
    msgflag: false,
    msgcolor: '#000000',
    reward: 0,
    bidcost: 0,
    bank: 0,
    progressbar: 0
  }

  calculateResults = () => {
    let { remain, overtake, fpwin, curdeposit, levelcost, myfp } = this.state;
    // Taking into account user blanking the field (backspace)
    if (isNaN(remain)) remain = 0;
    if (isNaN(overtake)) overtake = 0;
    if (isNaN(fpwin)) fpwin = 0;
    if (isNaN(curdeposit)) curdeposit = 0;
    if (isNaN(levelcost)) levelcost = 0;
    if (isNaN(myfp)) myfp = 0;
    if (levelcost>0 && curdeposit>0) {
      this.setState({progressbar: Math.ceil((curdeposit / levelcost)*100)});
    } else {
      this.setState({progressbar: 0});
    }
    let bidcost = (Math.ceil((remain + overtake - myfp) / 2));
    // let reward = Math.floor(fpwin * 1.9);
    // this.setState({reward});
    this.setState({bidcost});

    if ((bidcost > remain) || (    bidcost + myfp < (overtake + remain - bidcost)     )) {
      this.setState({ msg1: 'Player can\'t win win win',
        msgcolor: '#b70431',
        msgflag: false
      });
    } else {
      if (fpwin !==0) {
        if (fpwin > bidcost) {
          this.setState({
            msg1: 'You will win ' + (fpwin - bidcost) + ' FP on this transaction',
            msgcolor: '#177e0e',
            msgflag: true
          });
        } else if (fpwin < bidcost) {
          this.setState({
            msg1: 'You will lose ' + (bidcost - fpwin )+ ' FP on this transaction',
            msgcolor: '#b70431',
            msgflag: true
          });
        } else {
          this.setState({
            msg1: 'No profit nor loss on this transaction',
            msgcolor: '#fed029',
            msgflag: true
          });
        }
      }
    }



    // if (remain > bidcost) {
    //   if (reward > bidcost) {
    //     this.setState({
    //       msg1: 'There will be a profit of ' + (reward - bidcost) + ' FP(s)',
    //       msgcolor: '#177e0e',
    //       msgflag: true
    //     })
    //   } else if (reward === bidcost) {
    //     this.setState({
    //       msg1: 'No profit nor loss on this transaction',
    //       msgcolor: '#fed029',
    //       msgflag: true
    //     })
    //   } else {
    //     this.setState({
    //       msg1: 'There will be a loss of ' + (reward - bidcost) + ' FP(s)',
    //       msgcolor: '#b70431',
    //       msgflag: true
    //     });
    //   }
    // } else {
    //   // There is still a small chance that the player win while leveling the GB
    //   this.setState({ msg1: 'Player can\'t win',
    //     msgcolor: '#b70431',
    //     msgflag: false
    //   });
    // }
  }

  handleChange = (event) => {
    /*   TODO:
       * nb for player to overtake can't be above level cost
       * nb for player to overtake can't be above current deposit
       * current deposit can't be smaller than (my invested FP + overtake)
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
                Secure (Block) place
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
                label='Player to overtake'
                type='number'
                fullWidth
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={this.state.myfp}
                name='myfp'
                label='My invested FP'
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
            <Grid item xs={6}>
              <TextField
                value={this.state.bank}
                name='bank'
                label='Amount in the Bank'
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
                  {(!isNaN(this.state.myfp) && (this.state.myfp!==0)) &&
                    <Typography variant='body1' align='left' >
                      My currently invested FP:
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {this.state.myfp}
                    </Typography>
                  }
                  {(!isNaN(this.state.fpwin) && (this.state.fpwin!==0)) &&
                    <Typography variant='body1' align='left' >
                      FP Reward:
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {this.state.fpwin}
                    </Typography>
                  }
                  {(!isNaN(this.state.bank) && (this.state.bank!==0)) &&
                    <Typography variant='body1' align='left' >
                      Availaible FP in my bank:
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {this.state.bank}
                    </Typography>
                  }
                  {(this.state.msg1 !== '') &&
                    <Fragment>
                      <Typography className={classes.result} variant='body1' align='left' >
                        <strong>Results: </strong>
                      </Typography>
                      {(this.state.msgflag) &&
                        <Typography variant='body1' align='left'>
                          You will need to invest {this.state.bidcost} FP to secure the place.
                        </Typography>
                      }
                      <Typography variant='body1' align='left' >
                        <strong><span style={{ color: `${this.state.msgcolor}` }}>{this.state.msg1}</span></strong>
                      </Typography>
                      {(!isNaN(this.state.bank) && (this.state.bank!==0)) &&
                        <Typography variant='body1' align='left' >
                          You will need to take { (this.state.bidcost - this.state.bank) } FP from your inventory while
                        </Typography>
                      }
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
                  &nbsp;I have nothing to say here
                </span>
              </Typography>
            </Grid>
          </Grid> { /* container */ }
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Blockplace);