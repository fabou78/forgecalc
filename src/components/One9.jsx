import React, { Component, Fragment } from 'react';

import { Paper, Typography, TextField, Grid } from '@material-ui/core';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import Info from '@material-ui/icons/Info';


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
    marginTop: 10
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


class One9 extends Component {
  state = {
    bonus: 1.9,
    totfpreq: 2667,
    owner_tot1: 0,
    owner_tot2: 0,
    owner_tot3: 0,
    owner_tot4: 0,
    owner_tot5: 0,
    arcbonus1: 0,
    arcbonus2: 0,
    arcbonus3: 0,
    arcbonus4: 0,
    arcbonus5: 0,
    reward1: 715,
    reward2: 360,
    reward3: 120,
    reward4: 30,
    reward5: 5,
    msg1: '',
    msg2: '',
    msg3: '',
    msg4: '',
    msg5: '',
    summessage: '',
    fielderror: false,
    msgcolor: '#000000',
  }


  calculateResults = () => {
    let { bonus, totfpreq, reward1, reward2, reward3, reward4, reward5 } = this.state;

    var secured;
    var arcbonus1, remain1, owner_tot1;
    var arcbonus2, remain2, owner_tot2;
    var arcbonus3, remain3, owner_tot3;
    var arcbonus4, remain4, owner_tot4;
    var arcbonus5, remain5, owner_tot5;



    // Taking into account user blanking the field (backspace)
    if (isNaN(totfpreq)) totfpreq = 0;
    if (isNaN(reward1)) reward1 = 0;
    if (isNaN(reward2)) reward2 = 0;
    if (isNaN(reward3)) reward3 = 0;
    if (isNaN(reward4)) reward4 = 0;
    if (isNaN(reward5)) reward5 = 0;
    // Resetting all messages
    this.setState({ msg1: '', msg2:'', msg3:'', summessage: '' })

    if (reward1>0) {
      arcbonus1 = Math.ceil(reward1 * bonus)
      secured = totfpreq - (2 * arcbonus1)
      if (secured >= 0) {
        remain1 = arcbonus1
        owner_tot1 = secured
      } else {
        remain1 = arcbonus1 + secured
        owner_tot1 = 0
      }
      let message = '1st place available for ' + arcbonus1 + ' FP';
      // let summessage = 'With only 1st place open, the total contribution by owner will be ' + payowner1 + ' FP (' + effi + '% of total required FP). The total FP remaining to level the GB will be ' + tolevel + '.';
      this.setState({ arcbonus1: arcbonus1, owner_tot1: owner_tot1, msg1: message });
    }

    if (reward2>0) {
      arcbonus2 = Math.ceil(reward2 * bonus)
      secured = remain1 - (2 * arcbonus2)
      if (secured >= 0) {
        remain2 = arcbonus2
        owner_tot2 = owner_tot1 + secured
      } else {
        remain2 = arcbonus2 + secured
        owner_tot2 = owner_tot1
      }
      let message = '2nd place available for ' + arcbonus2 + ' FP';
      // let summessage = 'With 1st and 2nd place open, the total contribution by owner will be ' + totpayowner + ' FP (' + effi + '% of total required FP). The total FP remaining to level the GB will be ' + tolevel + '.';
      this.setState({ arcbonus2: arcbonus2, owner_tot2:owner_tot2, msg2: message });
    }

    if (reward3>0) {
      arcbonus3 = Math.ceil(reward3 * bonus)
      secured = remain2 - (2 * arcbonus3)
      if (secured >= 0) {
        remain3 = arcbonus3
        owner_tot3 = owner_tot2 + secured
      } else {
        remain3 = arcbonus3 + secured
        owner_tot3 = owner_tot2
      }
      let message = '3rd place available for ' + arcbonus3 + ' FP';
      // let summessage = 'With 1st, 2nd and 3rd place open, the total contribution by owner will be ' + totpayowner + ' FP (' + effi + '% of total required FP). The total FP remaining to level the GB will be ' + tolevel + '.';
      this.setState({ arcbonus3: arcbonus3, owner_tot3:owner_tot3, msg3: message });
    }

    if (reward4>0) {
      arcbonus4 = Math.ceil(reward4 * bonus)
      secured = remain3 - (2 * arcbonus4)
      if (secured >= 0) {
        remain4 = arcbonus4
        owner_tot4 = owner_tot3 + secured
      } else {
        remain4 = arcbonus4 + secured
        owner_tot4 = owner_tot3
      }
      let message = '4th place available for ' + arcbonus4 + ' FP';
      this.setState({ arcbonus4: arcbonus4, owner_tot4:owner_tot4, msg4: message });
      // let summessage = 'With 1st, 2nd, 3rd and 4th place open, the total contribution by owner will be ' + totpayowner + ' FP (' + effi + '% of total required FP). The total FP remaining to level the GB will be ' + tolevel + '.';
    }

    if (reward5>0) {
      arcbonus5 = Math.ceil(reward5 * bonus)
      secured = remain4 - (2 * arcbonus5)
      if (secured >= 0) {
        remain5 = arcbonus5
        owner_tot5 = owner_tot4 + secured
      } else {
        remain5 = arcbonus5 + secured
        owner_tot5 = owner_tot4
      }
      let message = '5th place available for ' + arcbonus5 + ' FP';
      this.setState({ arcbonus5: arcbonus5, owner_tot5:owner_tot5, msg5: message });
    }
  }






  handleChange = (event) => {
    const { name, value } = event.target;
    let intValue = parseInt(value, 10);
    if (intValue < 0) intValue = 0;
    this.setState({
      [name]: intValue
    }, () => {
      if (this.state.reward1 >= this.state.totfpreq) {
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
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography variant='h4' align='center' color='primary'>
                1.9 Thread Calculator
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2'>
                <p fontStyle="italic">A simple and basic 1.9 calculator for the IntrepidOne</p>
              </Typography>
              <Typography className={classes.info2} variant='subtitle2'>
                If you are not familiar with 1.9 swap principle and how it compares to FastTrack read&nbsp;
                <strong><a href="https://github.com/fabou78/forgecalc/blob/master/README.md" target="_blank">this</a>.</strong>
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
            <Grid item xs={2}>
              <TextField
                value={this.state.reward1}
                error={this.state.fielderror}
                name='reward1'
                label='Reward 1st'
                type='number'
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item xs={2}>
              <TextField
                value={this.state.reward2}
                name='reward2'
                label='Reward 2nd'
                type='number'
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item xs={2}>
              <TextField
                value={this.state.reward3}
                name='reward3'
                label='Reward 3rd'
                type='number'
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item xs={2}>
              <TextField
                value={this.state.reward4}
                name='reward4'
                label='Reward 4th'
                type='number'
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item xs={2}>
              <TextField
                value={this.state.reward5}
                name='reward5'
                label='Reward 5th'
                type='number'
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <br></br><br></br>
              <Table className={classes.table} size="small">
                <TableHead>
                  {(!isNaN(this.state.totfpreq) && this.state.totfpreq!==0 &&
                    !isNaN(this.state.reward1) && this.state.reward1!==0) &&
                    <Fragment>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="center">Base Reward</TableCell>
                        <TableCell align="center">Total needed from Owner</TableCell>
                        <TableCell align="center">Investor puts</TableCell>
                      </TableRow>
                    </Fragment>
                  }
                </TableHead>
                <TableBody>
                  {(!isNaN(this.state.totfpreq) && this.state.totfpreq!==0 &&
                    !isNaN(this.state.reward1) && this.state.reward1!==0) &&
                    <Fragment>
                      <TableRow>
                        <TableCell component="th" scope="row">1st place</TableCell>
                        <TableCell align="center">{this.state.reward1}</TableCell>
                        <TableCell align="center">{this.state.owner_tot1}</TableCell>
                        <TableCell align="center">{this.state.arcbonus1}</TableCell>
                      </TableRow>
                    </Fragment>
                  }
                  {(!isNaN(this.state.totfpreq) && this.state.totfpreq!==0 &&
                    !isNaN(this.state.reward1) && this.state.reward1!==0 &&
                    !isNaN(this.state.reward2) && this.state.reward2!==0) &&
                    <Fragment>
                      <TableRow>
                        <TableCell component="th" scope="row">2nd place</TableCell>
                        <TableCell align="center">{this.state.reward2}</TableCell>
                        <TableCell align="center">{this.state.owner_tot2}</TableCell>
                        <TableCell align="center">{this.state.arcbonus2}</TableCell>
                      </TableRow>
                    </Fragment>
                  }
                  {(!isNaN(this.state.totfpreq) && this.state.totfpreq!==0 &&
                    !isNaN(this.state.reward1) && this.state.reward1!==0 &&
                    !isNaN(this.state.reward2) && this.state.reward2!==0 &&
                    !isNaN(this.state.reward3) && this.state.reward3!==0) &&
                    <Fragment>
                      <TableRow>
                        <TableCell component="th" scope="row">3rd place</TableCell>
                        <TableCell align="center">{this.state.reward3}</TableCell>
                        <TableCell align="center">{this.state.owner_tot3}</TableCell>
                        <TableCell align="center">{this.state.arcbonus3}</TableCell>
                      </TableRow>
                    </Fragment>
                  }
                  {(!isNaN(this.state.totfpreq) && this.state.totfpreq!==0 &&
                    !isNaN(this.state.reward1) && this.state.reward1!==0 &&
                    !isNaN(this.state.reward2) && this.state.reward2!==0 &&
                    !isNaN(this.state.reward3) && this.state.reward3!==0 &&
                    !isNaN(this.state.reward4) && this.state.reward4!==0) &&
                    <Fragment>
                      <TableRow>
                        <TableCell component="th" scope="row">4th place</TableCell>
                        <TableCell align="center">{this.state.reward4}</TableCell>
                        <TableCell align="center">{this.state.owner_tot4}</TableCell>
                        <TableCell align="center">{this.state.arcbonus4}</TableCell>
                      </TableRow>
                    </Fragment>
                  }

                  {(!isNaN(this.state.totfpreq) && this.state.totfpreq!==0 &&
                    !isNaN(this.state.reward1) && this.state.reward1!==0 &&
                    !isNaN(this.state.reward2) && this.state.reward2!==0 &&
                    !isNaN(this.state.reward3) && this.state.reward3!==0 &&
                    !isNaN(this.state.reward4) && this.state.reward4!==0 &&
                    !isNaN(this.state.reward5) && this.state.reward5!==0) &&
                    <Fragment>
                      <TableRow>
                        <TableCell component="th" scope="row">5th place</TableCell>
                        <TableCell align="center">{this.state.reward5}</TableCell>
                        <TableCell align="center">{this.state.owner_tot5}</TableCell>
                        <TableCell align="center">{this.state.arcbonus5}</TableCell>
                      </TableRow>
                    </Fragment>
                  }
                </TableBody>
              </Table>
            </Grid>

            <Grid item xs={12}>
              {(!isNaN(this.state.totfpreq) && this.state.totfpreq!==0 &&
                !isNaN(this.state.reward1) && this.state.reward1!==0 && this.state.fielderror===false) &&
                <Fragment>
                  <br></br><br></br>
                  <Typography variant='body1' align='left' >
                    <strong>Summary: </strong>
                  </Typography>
                  <Typography>{this.state.summessage}</Typography>
                  <Typography className={classes.result}>
                    <strong>Double check values entered above then copy and paste the following into the guild "1.9" thread after posting your GB.</strong>
                  </Typography>
                  <Typography className={classes.info2}>
                    I am opening the following places on my GB posted above:
                    <br></br>
                    {(this.state.msg1!=='') && <Typography>&nbsp;&nbsp;{this.state.msg1}<br></br></Typography>}
                    {(this.state.msg2!=='') && <Typography>&nbsp;&nbsp;{this.state.msg2}<br></br></Typography>}
                    {(this.state.msg3!=='') && <Typography>&nbsp;&nbsp;{this.state.msg3}<br></br></Typography>}
                    {(this.state.msg4!=='') && <Typography>&nbsp;&nbsp;{this.state.msg4}<br></br></Typography>}
                    {(this.state.msg5!=='') && <Typography>&nbsp;&nbsp;{this.state.msg5}<br></br></Typography>}
                    <br></br>
                    {/* <strong>NOTE:</strong> Please make sure you post in order 1st, 2nd, 3rd & 4th (un-ordered posting has caused some issues in the past). */}
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
                  &nbsp; As of now the calc only works for GB at 0 FP. If your GB already has FP please DO NOT use this calc and try another one.
                </span>
              </Typography>
            </Grid>
          </Grid> { /* container */ }
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(One9);