import React, { Component, } from 'react';

import { PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer, Sector,
  Label, LabelList } from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

import { Paper, Typography, Grid } from '@material-ui/core';
// import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Info from '@material-ui/icons/Info';
import ProgressBar from './Progressbar';


// For testing only
const data02 = [
  { name: 'No Arc', value: 2400 },
  { name: 'Lower than 60', value: 4567 },
  { name: 'Greater than 59', value: 1398 },
  { name: 'Greater than 79', value: 9800 },
];

const colors = scaleOrdinal(schemeCategory10).range();

const renderLabelContent = (props) => {
  const { value, percent, x, y, midAngle } = props;
  // console.log(props);
  return (
    <g transform={`translate(${x}, ${y})`} textAnchor={ (midAngle < -90 || midAngle >= 90) ? 'end' : 'start'}>
      <text x={0} y={0}>{` Count: ${value}`}</text>
      <text x={0} y={20}>{` (Percent: ${(percent * 100).toFixed(2)}%)`}</text>
    </g>
  );
};





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








export class ArcGraph extends Component {

  static displayName = 'Arc Donut';

  state = {
    data02: data02,
    activeIndex: 0,
    animation: true,
  };

  render () {
    const { data02 } = this.state;
    console.log(this.props);
    return (
      <div className="pie-charts">
        <div className="pie-chart-wrapper">
          <PieChart width={560} height={400}>
            <Legend />
            <Pie
              data={data02}
              dataKey="value"
              cx={250}
              cy={200}
              startAngle={180}
              endAngle={-180}
              innerRadius={60}
              outerRadius={90}
              label={renderLabelContent}
              paddingAngle={5}
              isAnimationActive={this.state.animation}
            >
              {
                this.state.data02.map((entry, index) => (
                  <Cell key={`slice-${index}`} fill={colors[index % 10]}/>
                ))
              }
              <Label width={50} position="center">
                Arc Status
              </Label>
            </Pie>
          </PieChart>
        </div>
      </div>
    );
  }
}









































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
          var arc_tot = result[2].stat;
          var arc_60 = result[3].stat;
          var arc_80 = result[4].stat;
          var arc_data =[];
          var nbactive = nbplay - nbinac
          var no_arc = nbactive - arc_tot
          var low_arc = arc_tot - arc_60 - arc_80
          arc_data.push({ name: 'No Arc', value: no_arc});
          arc_data.push({ name: 'Lower than 60', value: low_arc });
          arc_data.push({ name: 'Greater than 59', value: arc_60 });
          arc_data.push({ name: 'Greater than 79', value: arc_80 });
          console.log(arc_data);

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
              <p>Total number of players : <strong>{nb_player_tot}</strong>
              <ProgressBar percentage={pcnt_player_tot} /></p>
            </Grid>

            <Grid item xs={12}>
              <p>Number of incative players (last 48 hours) : <strong>{nb_player_inac}</strong>
              <ProgressBar percentage={pcnt_player_inac} /></p>
            </Grid>

            <Grid item xs={12}>
              <ArcGraph arc_data={this.arc_data} />
            </Grid>


          </Grid> {/* container */}

          <Grid container spacing={0} direction='row' justify='flex-start'>
            <Grid item className={classes.info} xs={12} >
              <Typography color='secondary'>
                <Info className={classes.icon} />
                <span className={classes.icon}>
                  &nbsp;Inactive players are ignored in Arc statistics.
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