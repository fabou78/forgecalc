import React, { Component, } from 'react';

import { Paper, Typography, Grid } from '@material-ui/core';
// import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import Info from '@material-ui/icons/Info';

import ProgressBar from './Progressbar';


const styles = theme => ({
  layout: {
    width: 'auto',
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2 * 2))]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3 * 2))]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
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


class Arcstasts extends Component {
  state = {
    isLoaded: false,
    players: [],
    stats: [],
    pcnt_player_tot: '',
    pcnt_player_inac: '',
    nb_player_tot: 0,
    nb_player_inac: 0    
  }

  componentDidMount() {    
    fetch('https://my-json-server.typicode.com/fabou78/forgecalc/players')
      .then(response => response.json())
      .then(
        (result) => {
          // console.log(result);
          this.setState({
            isLoaded: true,
            players: result
          })          
        });    
    fetch('https://my-json-server.typicode.com/fabou78/forgecalc/stats')
      .then(response => response.json())
      .then(
        (result) => {          
          var percent1 = (Math.round((result[0].stat / 80) * 100)).toString() + '%';                    
          var nbplay = result[0].stat;
          var percent2 = (Math.round((result[1].stat / nbplay) * 100)).toString() + '%';               
          var nbinac = result[1].stat;    
          this.setState({
            isLoaded: true,
            stats: result,
            pcnt_player_tot: percent1,
            pcnt_player_inac: percent2,
            nb_player_tot: nbplay,
            nb_player_inac: nbinac
          })          
        });    
  }

  render() {
    const { classes } = this.props;
    const { pcnt_player_tot, pcnt_player_inac, nb_player_inac, nb_player_tot } = this.state;
    return (
      <div className={classes.layout}>
        <Paper className={classes.paper} elevation={4}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography variant='h4' align='center' color='primary'>
                Guild Arc Statistics
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2'>                
                <p fontStyle="italic">A quick look at the Arc situation in the guild... </p>
              </Typography>
            </Grid>

           
            <Grid item xs={12}>
              <p>Total number of players {nb_player_tot}
              <ProgressBar percentage={pcnt_player_tot} /></p>
            </Grid>

            <Grid item xs={12}>
              <p>Number of incative players (last 48 hours) {nb_player_inac}
              <ProgressBar percentage={pcnt_player_inac} /></p>
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

export default withStyles(styles)(Arcstasts);