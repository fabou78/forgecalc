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


class Fasttrack extends Component {
  state = {
    bonus: 1.8,
    totfpreq: 0,
    reward1st: 0,
    reward2nd: 0,
    reward3rd: 0,
    teamcont1: 0,
    teamcont2: 0,
    teamcont3: 0,
    owncont1: 0,
    owncont2: 0,
    owncont3: 0,
    remain1st: 0,
    remain2nd: 0,
    remain3rd: 0,
    msg1: '',
    msg2: '',
    msg3: '',
    summessage: '',


    curdeposit: 0,
    levelcost: 0,
    overtake: 0,
    fpwin: 0,
    fielderror: false,
    remain: 0,
    msgcolor: '#000000',
    reward: 0,
    bidcost: 0,
    progressbar: 0
  }



  calculateResults = () => {
    let { bonus, totfpreq, reward1st, reward2nd, reward3rd } = this.state;
    var teamcont1, owncont1, remain1st;
    var teamcont2, owncont2, remain2nd;
    var teamcont3, owncont3, remain3rd;
    // Taking into account user blanking the field (backspace)
    if (isNaN(totfpreq)) totfpreq = 0;
    if (isNaN(reward1st)) reward1st = 0;
    if (isNaN(reward2nd)) reward2nd = 0;
    if (isNaN(reward3rd)) reward3rd = 0;
    // Resetting all messages
    this.setState({ msg1: '', msg2:'', msg3:'', summessage: '' })
    if (reward1st>0) {
      teamcont1 = Math.ceil(reward1st * bonus);
      owncont1 = Math.max(0, (totfpreq - (2 * teamcont1)));
      remain1st = totfpreq - (teamcont1 + owncont1);
      let message = '1st place:  Guildmate=' + teamcont1 + ',  Myself=' + owncont1 + ',  Remaining FP=' + remain1st;
      let summessage = 'With only 1st place open the total contribution by owner will be ' + owncont1 + ' FP. '
      summessage += 'There would still be ' + remain1st + ' FP remaining which could be filled using normal swap threads.'
      this.setState({ teamcont1: teamcont1, owncont1: owncont1, remain1st: remain1st, msg1: message, summessage: summessage });
    }
    if (reward2nd>0) {
      teamcont2 = Math.ceil(reward2nd * bonus);
      owncont2 = Math.max(0, (remain1st - (2 * teamcont2)));
      remain2nd = remain1st - (teamcont2 + owncont2);
      let totcont = owncont1 + owncont2;
      let message = '2nd place:  Guildmate=' + teamcont2 + ',  Myself=' + owncont2 + ',  Remaining FP=' + remain2nd;
      let summessage = 'With 1st and 2nd places open the total contribution by owner will be ' + totcont + ' FP. '
      summessage += 'There would still be ' + remain2nd + ' FP remaining which could be filled using normal swap threads.'
      this.setState({ teamcont2: teamcont2, owncont2: owncont2, remain2nd: remain2nd, msg2: message, summessage: summessage });
    }
    if (reward3rd>0) {
      teamcont3 = Math.ceil(reward3rd * bonus);
      owncont3 = Math.max(0, (remain2nd - (2 * teamcont3)));
      remain3rd = remain2nd - (teamcont3 + owncont3);
      let totcont = owncont1 + owncont2 + owncont3;
      let message = '3rd place:  Guildmate=' + teamcont3 + ',  Myself=' + owncont3 + ',  Remaining FP=' + remain3rd;
      let summessage = 'With 1st, 2nd and 3rd places open the total contribution by owner will be ' + totcont + ' FP. '
      summessage += 'There would still be ' + remain3rd + ' FP remaining which could be filled using normal swap threads.'
      this.setState({ teamcont3: teamcont3, owncont3: owncont3, remain3rd: remain3rd, msg3: message, summessage: summessage });
    }
  }


  handleChange = (event) => {
    /*   TODO:
       * nb for player to overtake can't be above level cost
       * nb for player to overtake can't be above current deposit
    */
    const { name, value } = event.target;
    let intValue = parseInt(value, 10);
    if (intValue < 0) intValue = 0;
    this.setState({
      [name]: intValue
    }, () => {
      if (this.state.reward1st >= this.state.totfpreq) {
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
              <Typography variant='h4' align='center' color='secondary'>
                GB FastTrack Calc (TESTING ONLY!!!)
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle1'>
                If you are not familiar with GB FastTrack process read explantion on the guild forum.
              </Typography>
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
            <Grid item xs={4}>
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
            <Grid item xs={4}>
              <TextField
                value={this.state.reward2nd}
                name='reward2nd'
                label='2nd place reward'
                type='number'
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={this.state.reward3rd}
                name='reward3rd'
                label='3rd place reward'
                type='number'
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>





            <Grid item xs={12}>
              <Table className={classes.table} size="small">
                <TableHead>
                  {(!isNaN(this.state.totfpreq) && this.state.totfpreq!==0 &&
                    !isNaN(this.state.reward1st) && this.state.reward1st!==0) &&
                    <Fragment>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="right">Rewards</TableCell>
                        <TableCell align="right">Guild contrib</TableCell>
                        <TableCell align="right">Owner contrib</TableCell>
                        <TableCell align="right">Remain FP to level</TableCell>
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
                        <TableCell align="right">{this.state.reward1st}</TableCell>
                        <TableCell align="right">{this.state.teamcont1}</TableCell>
                        <TableCell align="right">{this.state.owncont1}</TableCell>
                        <TableCell align="right">{this.state.remain1st}</TableCell>
                      </TableRow>
                    </Fragment>
                  }
                  {(!isNaN(this.state.totfpreq) && this.state.totfpreq!==0 &&
                    !isNaN(this.state.reward1st) && this.state.reward1st!==0 &&
                    !isNaN(this.state.reward2nd) && this.state.reward2nd!==0) &&
                    <Fragment>
                      <TableRow>
                        <TableCell component="th" scope="row">2nd place</TableCell>
                        <TableCell align="right">{this.state.reward2nd}</TableCell>
                        <TableCell align="right">{this.state.teamcont2}</TableCell>
                        <TableCell align="right">{this.state.owncont2}</TableCell>
                        <TableCell align="right">{this.state.remain2nd}</TableCell>
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
                        <TableCell align="right">{this.state.reward3rd}</TableCell>
                        <TableCell align="right">{this.state.teamcont3}</TableCell>
                        <TableCell align="right">{this.state.owncont3}</TableCell>
                        <TableCell align="right">{this.state.remain3rd}</TableCell>
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
                  <Typography variant='body1' align='left' >
                    <strong>Summary: </strong>
                  </Typography>
                  <Typography>{this.state.summessage}</Typography>
                  <Typography className={classes.result}>
                  Copy and paste the following into the guild 1.8 thread after posting your GB
                  </Typography>
                  <Typography className={classes.info2}>
                    I am opening the following places on my GB posted above:
                    <br></br>
                    &nbsp;&nbsp;{this.state.msg1}<br></br>
                    &nbsp;&nbsp;{this.state.msg2}<br></br>
                    &nbsp;&nbsp;{this.state.msg3}<br></br>
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
                  &nbsp;Contributions are all based on 1.8 rate (Arc 60+ required to make profit). Figures will be correct only for GBs that are clear of FPs when starting.
                </span>
              </Typography>
            </Grid>
          </Grid> { /* container */ }
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Fasttrack);