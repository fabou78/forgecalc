import React, { Component, Fragment } from 'react';

import { Paper, Typography, TextField, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Info from '@material-ui/icons/Info';

import { Line } from 'rc-progress';


const styles = theme => ({
  layout: {
    width: 'auto',
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 650,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
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
    msg3: '',
    msg1flag: false, // True if win, lose or stale. False if player can't win
    msgcolor: '#000000',
    msg3color: '#000000',
    reachfp: 0,
    progressbar: 0,
    reqfp: 0,
    simfp: 0
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
    this.setState({reachfp});
    // Checking if the player can secure the place
    // If the player can secure the place then it can be a win, loss or stale on FP spending
    let simfp;
    console.clear();
    if (myfp > (overtake + remain)) {
      this.setState({
        msg: 'Your place is already secured you don\'t need to put any more FP'
      });
    } else {
      for (var inc = 1; inc <= remain; inc++) {
        simfp = myfp + inc ;
        if (simfp >= (overtake + (remain - inc))) {
          if ((simfp === overtake) && (inc === remain )) {
            this.setState({ msg1: 'You can\'t secure the place',
            msgcolor: '#b70431',
            msg1flag: false
            });
            break;
          } else {
            this.setState({simfp});
            this.setState({
              msg: 'To secure the place, you will need to reach a total of ' + simfp + ' FP'
            });
            // Checking for win, loss or stale
            if (fpwin !==0) {
              var reqfp = simfp - myfp; // required FP to win
              this.setState({reqfp});
              if (fpwin > reqfp) {
                this.setState({
                  msg1: 'You will win ' + (fpwin - reqfp) + ' FP on this transaction',
                  msgcolor: '#177e0e',
                  msg1flag: true
                });
              } else if (fpwin < reqfp) {
                this.setState({
                  msg1: 'If you secure the place you will lose ' + (reqfp - fpwin )+ ' FP',
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
            break;
          }
        } else if (myfp + remain <= overtake) {
          this.setState({ msg1: 'You can\'t secure the place',
          msgcolor: '#b70431',
          msg1flag: false
          });
          break;
        }
      } // For loop
    }
    // Checking for inventory and bank additional information
    if (bank === 0) {
      this.setState({
        msg2: 'With 0 FP in the bank the whole amout will need to come from inventory'
      });
    } else if (bank >= reqfp) {
      this.setState({
        msg2: 'You don\'t need to take any FP from inventory'
      });
    } else {
      this.setState({
        msg2: 'You will need to take out ' + (reqfp - bank) + ' FP from inventory'
      });
    }
    if ((reqfp - (bank + fpwin) > 0)) {
      this.setState({
        msg3: 'Your inventory will decrease by ' + (reqfp - (bank + fpwin)) + ' FP' ,
        msg3color: '#b70431',
        });
    } else if ((reqfp - (bank + fpwin) === 0)) {
      this.setState({
        msg3: 'Your inventory will remain the same' ,
        msg3color: '#fed029',
      });
    } else {
      if (fpwin !== 0) {
        var incamount;
        if (bank >= reqfp) {
          incamount = fpwin;
        } else {
          incamount = (fpwin - (reqfp - bank));
        }
        this.setState({
          msg3: 'Inventory will increase by ' + incamount + ' FP' ,
          msg3color: '#177e0e',
        });
      }
    }
  } // calculateResults

  handleChange = (event) => {
    /*   TODO:
       * nb for player to overtake can't be above level cost
       * nb for player to overtake can't be above current deposit
       * current deposit can't be smaller than (my invested FP + overtake)
    */
    this.setState({ msg:'', msg1: '', msg2: '', msg3:'' });
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
    const { reqfp, simfp, bank, msg, msg1, msg2, msg3 } = this.state;
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
                      You need to invest {reqfp} more FP to reach the required {simfp} FP
                    </Typography>
                  }
                  {(msg2!=='') &&
                    <Fragment>
                      <Typography variant='body1' align='left' >
                        {msg2}
                      </Typography>
                      <Typography variant='body1' align='left' >
                      <strong><span style={{ color: `${this.state.msg3color}` }}>{msg3}</span></strong>
                      </Typography>
                    </Fragment>
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