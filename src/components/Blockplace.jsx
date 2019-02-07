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
    marginTop: 5
  },
  summary: {
    marginLeft: 10
  },
  infogrid: {
    marginTop: 20
  },
  progress: {
    marginBottom: 15
  }
});


class Blockplace extends Component {
  state = {
    curdeposit: 0,
    levelcost: 0,
    overtake: 0,
    fpwin: 0,
    myfp: 0,
    bank: 0,
    fielderror: false,
    remain: 0,
    msg: '',
    msg1: '',
    msg2: '',
    msg1flag: false, // True if win, lose or stale. False if player can't win
    msgcolor: '#000000',
    reachfp: 0,
    progressbar: 0,
    delta: 0
  }

  calculateResults = () => {
    let { remain, overtake, fpwin, curdeposit, levelcost, myfp, bank } = this.state;
    // Taking into account user blanking the field (backspace)
    if (isNaN(remain)) remain = 0;
    if (isNaN(overtake)) overtake = 0;
    if (isNaN(fpwin)) fpwin = 0;
    if (isNaN(curdeposit)) curdeposit = 0;
    if (isNaN(levelcost)) levelcost = 0;
    if (isNaN(myfp)) myfp = 0;
    if (isNaN(bank)) bank = 0;
    if (levelcost>0 && curdeposit>0) {
      this.setState({progressbar: Math.ceil((curdeposit / levelcost)*100)});
    } else {
      this.setState({progressbar: 0});

    }
    let reachfp = (Math.ceil((remain + overtake) / 2));
    let delta = reachfp - myfp;
    this.setState({reachfp, delta});


    // Checking if the player can secure the place
    // If the player can secure the place then it can be a win, loss or stale on FP spending
    console.clear();
    console.log('reachfp > remain: ' + (reachfp > remain ) );
    console.log('reachfp <= overtake :' + (reachfp <= overtake));
    console.log('--------------------------------------');
    if ((reachfp > remain ) || reachfp <= (overtake - myfp) ) {
      this.setState({ msg1: 'You can\'t secure the place',
        msgcolor: '#b70431',
        msg1flag: false
      });
    } else {
      if (myfp > (overtake + remain)) {
        this.setState({
          msg: 'Your place is already secured you don\'t need to put any more FP'
        });
      } else {
        this.setState({
          msg: 'To secure the place, you will need to reach a total of ' + reachfp + ' FP'
        });
        // Checking for win, loss or stale
        if (fpwin !==0) {
          if (fpwin > delta) {
            this.setState({
              msg1: 'You will win ' + (fpwin - delta) + ' FP on this transaction',
              msgcolor: '#177e0e',
              msg1flag: true
            });
          } else if (fpwin < delta) {
            this.setState({
              msg1: 'If you secure the place you will lose ' + (delta - fpwin )+ ' FP',
              msgcolor: '#b70431',
              msg1flag: true
            });
          } else {
            this.setState({
              msg1: 'You will not lose or gain any FP if you secure the place',
              msgcolor: '#fed029',
              msg1flag: true
            });
          }
        }
        // Checking for inventory and bank additional information
        if (bank === 0) {
          // Take all from inventory
          this.setState({
            msg2: 'With 0 FP in the bank the whole amout will need to come from inventory'
          });
        } else if (bank >= delta) {
          // no need to take anything from inventory
          this.setState({
            msg2: 'You don\'t need to take any FP from inventory'
          });
        } else {
          // soustraction
          this.setState({
            msg2: 'You will need to take out ' + (delta - bank) + ' FP from inventory'
          });
        }
      } // (reachfp <= 0) mean the place is already secured
    }
  }

  handleChange = (event) => {
    /*   TODO:
       * nb for player to overtake can't be above level cost
       * nb for player to overtake can't be above current deposit
       * current deposit can't be smaller than (my invested FP + overtake)
    */
    this.setState({ msg:'', msg1: '', msg2: '' });
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
    /*   TODO:
       * Implement tooltips on summary fields (help for usage)
    */
    const { classes } = this.props;
    const { delta, reachfp, bank, msg, msg1, msg2 } = this.state;
    return (
      <div className={classes.layout}>
        <Paper className={classes.paper} elevation={4}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography variant='h4' align='center' color='primary'>
                Secure (sim test) place
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
                value={bank}
                name='bank'
                label='Amount in the Bank'
                type='number'
                fullWidth
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>   { /* Summary  */ }
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
                    strokeLinecap='square'
                    trailWidth='3'
                    strokeWidth='3'
                    strokeColor='#47933f'
                  />
                </Fragment>
              }
            </Grid>
            <Grid container spacing={0}>
              {(!isNaN(this.state.remain) && (this.state.remain!==0)) &&
                <Fragment>
                  <Grid item className={classes.summary} xs={6}>
                    <Typography variant='body1' align='left' >
                      Remaining FP to level GB:
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant='body1' align='left' >
                      {this.state.remain}
                    </Typography>
                  </Grid>
                </Fragment>
              }
              {(!isNaN(this.state.overtake) && (this.state.overtake!==0)) &&
                <Fragment>
                  <Grid item className={classes.summary} xs={6}>
                    <Typography variant='body1' align='left' >
                      Nb of FP of player to overtake :
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant='body1' align='left' >
                      {this.state.overtake}
                    </Typography>
                  </Grid>
                </Fragment>
              }
              {(!isNaN(this.state.fpwin) && (this.state.fpwin!==0)) &&
                <Fragment>
                  <Grid item className={classes.summary} xs={6}>
                    <Typography variant='body1' align='left' >
                      Targeted place reward:
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant='body1' align='left' >
                      {this.state.fpwin}
                    </Typography>
                  </Grid>
                </Fragment>
              }
              {(!isNaN(this.state.myfp) && (this.state.myfp!==0)) &&
                <Fragment>
                  <Grid item className={classes.summary} xs={6}>
                    <Typography variant='body1' align='left' >
                      My currently invested FP:
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant='body1' align='left' >
                      {this.state.myfp}
                    </Typography>
                  </Grid>
                </Fragment>
              }
              {(!isNaN(bank) && (bank!==0)) &&
                <Fragment>
                  <Grid item className={classes.summary} xs={6}>
                    <Typography variant='body1' align='left' >
                      Availaible FP in my bank:
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant='body1' align='left' >
                      {bank}
                  </Typography>
                  </Grid>
                </Fragment>
              }
            </Grid>   {/* container */}
            <Grid item xs={12}>   {/* Result */}
              {((msg !== '') || (msg1!=='')) &&
                <Fragment>
                  <Typography className={classes.result} variant='body1' align='left' >
                    <strong>Results: </strong>
                  </Typography>
                  <Typography variant='body1' align='left' >
                    {msg}
                  </Typography>
                  {(msg1 !== '') &&
                    <Typography variant='body1' align='left' >
                      <strong><span style={{ color: `${this.state.msgcolor}` }}>{msg1}</span></strong>
                    </Typography>
                  }
                </Fragment>
              }
            </Grid>
            <Grid item xs={12}>   {/* Additional Info */}
              {(msg1 !== '' && (this.state.msg1flag)) &&
                <Fragment>
                  <Typography className={classes.result} variant='body1' align='left' >
                    <strong>Additional info: </strong>
                  </Typography>
                  {(this.state.msg1flag) &&
                    <Typography variant='body1' align='left'>
                      You need to invest {delta} more FP to reach the required {reachfp} FP
                    </Typography>
                  }
                  {(msg2!=='') &&
                    <Typography variant='body1' align='left' >
                      {msg2}
                    </Typography>
                  }
                </Fragment>
              }
            </Grid>
          </Grid> {/* container */}
          <Grid container className={classes.infogrid} spacing={0}>
            <Grid item  xs={1} >
              <Typography align='center' color='secondary'>
                <Info />
              </Typography>
            </Grid>
            <Grid item xs={11} >
              <Typography align='left' color='secondary'>
                It is assumed that the player has not used any FP from inventory previously
              </Typography>
            </Grid>
          </Grid> { /* container */ }
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Blockplace);