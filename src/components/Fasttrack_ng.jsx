import React, { Component, Fragment } from 'react';

import { Paper, Typography, TextField, Grid } from '@material-ui/core';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import Info from '@material-ui/icons/Info';


const styles = theme => ({
  layout: {
    width: 'auto',
    marginTop: theme.spacing.unit * 5,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 650,
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
  info2: {
    marginTop: 5
  },
  progress: {
    marginBottom: 15
  },
  icon: {
    verticalAlign: 'middle'
  }
});


class Fasttrackng extends Component {
  state = {
    bonus: 1.8,
    totfpreq: 0,
    reward1st: 0,
    reward2nd: 0,
    reward3rd: 0,
    reward4th: 0,
    paybyp1: 0,
    paybyp2: 0,
    paybyp3: 0,
    paybyp4: 0,
    rewardarc1: 0,
    rewardarc2: 0,
    rewardarc3: 0,
    rewardarc4: 0,
    lossp1: 0,
    lossp2: 0,
    lossp3: 0,
    lossp4: 0,
    payowner1: 0,
    payowner2: 0,
    payowner3: 0,
    payowner4: 0,
    gainp1: 0,
    gainp2: 0,
    gainp3: 0,
    gainp4: 0,
    msg1: '',
    msg2: '',
    msg3: '',
    msg4: '',
    summessage: '',
    fielderror: false,
    msgcolor: '#000000',
  }


  calculateResults = () => {
    let { bonus, totfpreq, reward1st, reward2nd, reward3rd, reward4th } = this.state;
    var paybyp1, rewardarc1, lossp1, payowner1, gainp1;
    var paybyp2, rewardarc2, lossp2, payowner2, gainp2;
    var paybyp3, rewardarc3, lossp3, payowner3, gainp3;
    var paybyp4, rewardarc4, lossp4, payowner4, gainp4;
    // Taking into account user blanking the field (backspace)
    if (isNaN(totfpreq)) totfpreq = 0;
    if (isNaN(reward1st)) reward1st = 0;
    if (isNaN(reward2nd)) reward2nd = 0;
    if (isNaN(reward3rd)) reward3rd = 0;
    if (isNaN(reward4th)) reward4th = 0;
    // Resetting all messages
    this.setState({ msg1: '', msg2:'', msg3:'', summessage: '' })
    if (reward1st>0) {
      rewardarc1 = Math.ceil(reward1st * bonus);
      paybyp1 = Math.ceil(totfpreq / 2);
      lossp1 = paybyp1 - rewardarc1;
      if (paybyp1 < rewardarc1) { lossp1 = 0}; // Taking into account Arc reward is greater than what p1 pays in

      gainp1 = Math.ceil(0.02 * paybyp1);
      if ((paybyp1 - rewardarc1 + gainp1) < 1) {
        payowner1 = 0
      } else {
        payowner1 = paybyp1 - rewardarc1 + gainp1
      }

      // if (payowner1 === 0) { gainp1 = rewardarc1 - paybyp1 };
      let message = '1st:  player=' + paybyp1 + ' (Arc≈' + rewardarc1 + ', Tot profit≈' + gainp1 + '),   I\'ll pay you back=' + payowner1 ;
      let effi = Math.ceil((payowner1 / totfpreq) * 100);
      let tolevel = totfpreq - paybyp1
      let summessage = 'With only 1st place open, the total contribution by owner will be ' + payowner1 + ' FP (' + effi + '% of total required FP). The total FP remaining to level the GB will be ' + tolevel + '.';
      this.setState({ rewardarc1: rewardarc1, paybyp1: paybyp1, lossp1: lossp1, payowner1: payowner1, gainp1: gainp1, msg1: message, summessage: summessage });
    }

    if (reward2nd>0) {
      rewardarc2 = Math.ceil(reward2nd * bonus);
      paybyp2 = Math.ceil(paybyp1 / 2);
      lossp2 = paybyp2 - rewardarc2;
      if (paybyp2 < rewardarc2) { lossp2 = 0};

      gainp2 = Math.ceil(0.04 * paybyp2);
      if ((paybyp2 - rewardarc2 + gainp2) < 1) {
        payowner2 = 0
      } else {
        payowner2 = paybyp2 - rewardarc2 + gainp2
      }

      // if (payowner2 === 0) { gainp2 = rewardarc2 - paybyp2 };
      let message = '2nd:  player=' + paybyp2 + ' (Arc≈' + rewardarc2 + ', Tot profit≈' + gainp2 + '),   I\'ll pay you back=' + payowner2 ;
      let totpayowner = payowner1 + payowner2;
      let tolevel = totfpreq - (paybyp1 + paybyp2);
      let effi = Math.ceil(( totpayowner / totfpreq) * 100);
      let summessage = 'With 1st and 2nd place open, the total contribution by owner will be ' + totpayowner + ' FP (' + effi + '% of total required FP). The total FP remaining to level the GB will be ' + tolevel + '.';
      this.setState({ rewardarc2: rewardarc2, paybyp2: paybyp2, lossp2: lossp2, payowner2: payowner2, gainp2: gainp2, msg2: message, summessage: summessage  });
    }

    if (reward3rd>0) {
      rewardarc3 = Math.ceil(reward3rd * bonus);
      paybyp3 = Math.ceil(paybyp2 / 2);
      lossp3 = paybyp3 - rewardarc3;
      if (paybyp3 < rewardarc3) { lossp3 = 0};

      gainp3 = Math.ceil(0.08 * paybyp3);
      if ((paybyp3 - rewardarc3 + gainp3) < 1) {
        payowner3 = 0
      } else {
        payowner3 = paybyp3 - rewardarc3 + gainp3
      }

      // if (payowner3 === 0) { gainp3 = rewardarc3 - paybyp3 };
      let message = '3rd:  player=' + paybyp3 + ' (Arc≈' + rewardarc3 + ', Tot profit≈' + gainp3 + '),   I\'ll pay you back=' + payowner3 ;
      let totpayowner = payowner1 + payowner2 + payowner3;
      let tolevel = totfpreq - ( paybyp1 + paybyp2 + paybyp3);
      let effi = Math.ceil(( totpayowner / totfpreq) * 100);
      let summessage = 'With 1st, 2nd and 3rd place open, the total contribution by owner will be ' + totpayowner + ' FP (' + effi + '% of total required FP). The total FP remaining to level the GB will be ' + tolevel + '.';
      this.setState({ rewardarc3: rewardarc3, paybyp3: paybyp3, lossp3: lossp3, payowner3: payowner3, gainp3: gainp3, msg3: message, summessage: summessage });
    }

    if (reward4th>0) {
      rewardarc4 = Math.ceil(reward4th * bonus);
      paybyp4 = Math.ceil(paybyp3 / 2);
      lossp4 = paybyp4 - rewardarc4;
      if (paybyp4 < rewardarc4) { lossp4 = 0};

      gainp4 = Math.ceil(0.16 * paybyp4);
      if ((paybyp4 - rewardarc4 + gainp4) < 1) {
        payowner4 = 0
      } else {
        payowner4 = paybyp4 - rewardarc4 + gainp4
      }

      // if (payowner4 === 0) { gainp4 = rewardarc4 - paybyp4 };
      let message = '4th:  player=' + paybyp4 + ' (Arc≈' + rewardarc4 + ',Tot profit≈' + gainp4 + '),   I\'ll pay you back=' + payowner4 ;
      let totpayowner = payowner1 + payowner2 + payowner3 + payowner4;
      let tolevel = totfpreq - (paybyp1 + paybyp2 + paybyp3 + paybyp4);
      let effi = Math.ceil(( totpayowner / totfpreq) * 100);
      let summessage = 'With 1st, 2nd, 3rd and 4th place open, the total contribution by owner will be ' + totpayowner + ' FP (' + effi + '% of total required FP). The total FP remaining to level the GB will be ' + tolevel + '.';
      this.setState({ rewardarc4: rewardarc4, paybyp4: paybyp4, lossp4: lossp4, payowner4: payowner4, gainp4: gainp4, msg4: message, summessage: summessage });
    }
  }


  handleChange = (event) => {
    const { name, value } = event.target;
    let intValue = parseInt(value, 10);
    if (intValue < 0) intValue = 0;
    this.setState({
      [name]: intValue
    }, () => {
      if (this.state.reward1st >= this.state.totfpreq) {
        console.log('Inside IF');
        this.setState({ fielderror: true });
      } else {
        this.setState({ fielderror: false });
        this.calculateResults();

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
                Great Building FastTrack
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2'>
                <p fontStyle="italic">This is the second version of the FastTrack process </p>
              </Typography>
              <Typography className={classes.info2} variant='subtitle2'>
                If you are not familiar with GB FastTrack process read explantion on the guild forum.
              </Typography><br></br>
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={this.state.totfpreq}
                error={this.state.fielderror}
                name='totfpreq'
                label='Total FP required'
                type='number'
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={this.state.reward1st}
                error={this.state.fielderror}
                name='reward1st'
                label='1st place reward'
                type='number'
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={this.state.reward2nd}
                name='reward2nd'
                label='2nd place reward'
                type='number'
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={this.state.reward3rd}
                name='reward3rd'
                label='3rd place reward'
                type='number'
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={this.state.reward4th}
                name='reward4th'
                label='4th place reward'
                type='number'
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <br></br>
              <Table className={classes.table} size="small">
                <TableHead>
                  {(!isNaN(this.state.totfpreq) && this.state.totfpreq!==0 &&
                    !isNaN(this.state.reward1st) && this.state.reward1st!==0) &&
                    <Fragment>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="center">Rewards</TableCell>
                        <TableCell align="center">Player pays in</TableCell>
                        <TableCell align="center">Owner pays back</TableCell>
                        <TableCell align="center">Player profit</TableCell>
                      </TableRow>
                    </Fragment>
                  }
                </TableHead>
                <TableBody>
                  {(!isNaN(this.state.totfpreq) && this.state.totfpreq!==0 &&
                    !isNaN(this.state.reward1st) && this.state.reward1st!==0) &&
                    <Fragment>
                      <TableRow>
                        <TableCell component="th" scope="row">1st place</TableCell>
                        <TableCell align="center">{this.state.reward1st}</TableCell>
                        <TableCell align="center">{this.state.paybyp1}</TableCell>
                        <TableCell align="center">{this.state.payowner1}</TableCell>
                        <TableCell align="center">{this.state.gainp1}</TableCell>
                      </TableRow>
                    </Fragment>
                  }
                  {(!isNaN(this.state.totfpreq) && this.state.totfpreq!==0 &&
                    !isNaN(this.state.reward1st) && this.state.reward1st!==0 &&
                    !isNaN(this.state.reward2nd) && this.state.reward2nd!==0) &&
                    <Fragment>
                      <TableRow>
                        <TableCell component="th" scope="row">2nd place</TableCell>
                        <TableCell align="center">{this.state.reward2nd}</TableCell>
                        <TableCell align="center">{this.state.paybyp2}</TableCell>
                        <TableCell align="center">{this.state.payowner2}</TableCell>
                        <TableCell align="center">{this.state.gainp2}</TableCell>
                      </TableRow>
                    </Fragment>
                  }
                  {(!isNaN(this.state.totfpreq) && this.state.totfpreq!==0 &&
                    !isNaN(this.state.reward1st) && this.state.reward1st!==0 &&
                    !isNaN(this.state.reward2nd) && this.state.reward2nd!==0 &&
                    !isNaN(this.state.reward3rd) && this.state.reward3rd!==0) &&
                    <Fragment>
                      <TableRow>
                        <TableCell component="th" scope="row">3rd place</TableCell>
                        <TableCell align="center">{this.state.reward3rd}</TableCell>
                        <TableCell align="center">{this.state.paybyp3}</TableCell>
                        <TableCell align="center">{this.state.payowner3}</TableCell>
                        <TableCell align="center">{this.state.gainp3}</TableCell>
                      </TableRow>
                    </Fragment>
                  }
                  {(!isNaN(this.state.totfpreq) && this.state.totfpreq!==0 &&
                    !isNaN(this.state.reward1st) && this.state.reward1st!==0 &&
                    !isNaN(this.state.reward2nd) && this.state.reward2nd!==0 &&
                    !isNaN(this.state.reward3rd) && this.state.reward3rd!==0 &&
                    !isNaN(this.state.reward4th) && this.state.reward4th!==0) &&
                    <Fragment>
                      <TableRow>
                        <TableCell component="th" scope="row">4th place</TableCell>
                        <TableCell align="center">{this.state.reward4th}</TableCell>
                        <TableCell align="center">{this.state.paybyp4}</TableCell>
                        <TableCell align="center">{this.state.payowner4}</TableCell>
                        <TableCell align="center">{this.state.gainp4}</TableCell>
                      </TableRow>
                    </Fragment>
                  }
                </TableBody>
              </Table>
            </Grid>

            <Grid item xs={12}>
              {(!isNaN(this.state.totfpreq) && this.state.totfpreq!==0 &&
                !isNaN(this.state.reward1st) && this.state.reward1st!==0 && this.state.fielderror===false) &&
                <Fragment>
                  <br></br>
                  <Typography variant='body1' align='left' >
                    <strong>Summary: </strong>
                  </Typography>
                  <Typography>{this.state.summessage}</Typography>
                  <Typography className={classes.result}>
                    <strong>Copy and paste the following into one of the guild "Fast track" thread after posting your GB</strong>
                  </Typography>
                  <Typography className={classes.info2}>
                    I am opening the following places on my GB posted above:
                    <br></br>
                    {(this.state.msg1!=='') && <Typography>&nbsp;&nbsp;{this.state.msg1}<br></br></Typography>}
                    {(this.state.msg2!=='') && <Typography>&nbsp;&nbsp;{this.state.msg2}<br></br></Typography>}
                    {(this.state.msg3!=='') && <Typography>&nbsp;&nbsp;{this.state.msg3}<br></br></Typography>}
                    {(this.state.msg4!=='') && <Typography>&nbsp;&nbsp;{this.state.msg4}<br></br></Typography>}
                    <p><strong>NOTE:</strong> Please make sure you post in order 1st, 2nd, 3rd & 4th (un-ordered posting has caused some issues in the past).</p>

                  </Typography>
                </Fragment>
              }
            </Grid>

          </Grid> {/* container */}
          <Grid container spacing={0} direction='row' justify='flex-start'>
            <Grid item className={classes.info} xs={12} >
              <Typography color='secondary'>
                <Info className={classes.icon} />
                <span className={classes.icon}>
                  &nbsp;Contributions are all based on 1.8 rate (Arc 60+ required to make profit). Numbers will be correct only if no one else outside interfere with the deals.
                </span>
              </Typography>
            </Grid>
          </Grid> { /* container */ }
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Fasttrackng);