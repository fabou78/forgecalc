import React, { Component } from 'react';

import { Paper, Typography, TextField, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({  
  root: {
    flexGrow: 1,
    margin: 40,
    overflow: 'hidden',
    padding: `0 ${theme.spacing.unit * 3}px`,
  },
  paper: {    
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
  },
  result: {
    marginTop: 30
  }
});


class Profit extends Component {

  state = {
    curdeposit: 0,
    levelcost: 0,
    overtake: 0,
    fpwin: 0,
    error: false,
    remain: 0
  }



  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value 
    }, () => {
      let curdep = parseInt(this.state.curdeposit, 10);
      let lvlcost = parseInt(this.state.levelcost,10);
      if( curdep >= lvlcost ) {
        this.setState({ error: true });
        console.log('Seting to true');
      } else{
        this.setState({ error: false });
        console.log('Seting to false');
        this.setState({ remain: (lvlcost - curdep) });
        
      }
    });
    
  }


  


  render() {

    const { classes } = this.props;
    
    


    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={4}>
        
          <Grid container spacing={24}>
            
            <Grid item xs={12}>
              <Typography variant='h4' align='center' color='primary'>
                FP Profit Calculator
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={this.state.error}
                name='curdeposit'
                label='Sum of current deposits'
                type='number'
                fullWidth
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={this.state.error}
                name='levelcost'
                label='Level Cost'
                type='number'
                fullWidth
                margin='normal'
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name='overtake'
                label='FP nb of the player to overtake'
                type='number'
                fullWidth
                margin='normal'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name='fpwin'
                label='FP of the targeted place'
                type='number'
                fullWidth
                margin='normal'
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.result} variant='body1' align='left' paragraph>
              Number of FPs remaining to complete the level: {this.state.remain}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <InputLabel color='secondary'>
                Test
              </InputLabel>
            </Grid>
          </Grid>
          
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Profit);