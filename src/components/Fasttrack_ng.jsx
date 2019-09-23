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
    totfpreq: 5074,
    reward1st: 1310,
    reward2nd: 655,
    reward3rd: 220,
    reward4th: 55,

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
      //Need to take into account when loss is a gain
      lossp1 = paybyp1 - rewardarc1;
      payowner1 = Math.ceil(1.3 * lossp1);
      gainp1 = payowner1 - lossp1;
      this.setState({ rewardarc1: rewardarc1, paybyp1: paybyp1, lossp1: lossp1, payowner1: payowner1, gainp1: gainp1 });
    }


    if (reward2nd>0) {
      rewardarc2 = Math.ceil(reward2nd * bonus);
      paybyp2 = Math.ceil(paybyp1 / 2);
      lossp2 = paybyp2 - rewardarc2;
      payowner2 = Math.ceil(1.3 * lossp2);
      gainp2 = payowner2 - lossp2;
      this.setState({ rewardarc2: rewardarc2, paybyp2: paybyp2, lossp2: lossp2, payowner2: payowner2, gainp2: gainp2 });      
    }


    if (reward3rd>0) {
      rewardarc3 = Math.ceil(reward3rd * bonus);
      paybyp3 = Math.ceil(paybyp2 / 2);
      lossp3 = paybyp3 - rewardarc3;
      payowner3 = Math.ceil(1.1 * lossp3);
      gainp3 = payowner3 - lossp3;
      this.setState({ rewardarc3: rewardarc3, paybyp3: paybyp3, lossp3: lossp3, payowner3: payowner3, gainp3: gainp3 }); 
      
    }


    if (reward4th>0) {
      rewardarc4 = Math.ceil(reward4th * bonus);
      paybyp4 = Math.ceil(paybyp3 / 2);
      lossp4 = paybyp4 - rewardarc4;
      payowner4 = Math.ceil(1.1 * lossp4);
      gainp4 = payowner4 - lossp4;
      this.setState({ rewardarc4: rewardarc4, paybyp4: paybyp4, lossp4: lossp4, payowner4: payowner4, gainp4: gainp4 }); 
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
                GB FastTrack V2 (Testing only)
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2'>
                
                <p fontStyle="italic">This is the second version of the FastTrack process </p>
              </Typography>
              <Typography className={classes.info2} variant='subtitle2'>
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