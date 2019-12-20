import React, { Component, Fragment } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors'

import Profit from './components/Profit';
import Navbar from './components/Navbar';
import Blockplace from './components/Blockplace';
import Fasttrackng from './components/Fasttrack_ng';
import Arcstasts from './components/Arcstats';


const theme = createMuiTheme({
  palette: {
    secondary: { main: pink[400] },
    primary: { main: blue[600] },
  },
  typography: {
    useNextVariants: true,
 }
});


class App extends Component {
  state = {
    loadpage: 'secure'
  }

  handleClick = (event) => {
    const { name } = event.currentTarget;
    if (name === 'secure') {
      this.setState({ loadpage: 'secure' });
    };
    if (name === 'profit') {
      this.setState({ loadpage: 'profit' });
    };
    if (name === 'fastng') {
      this.setState({ loadpage: 'fastng' });
    };
    if (name === 'arcstats') {
      this.setState({ loadpage: 'arcstats' });
    };
  }

  render() {
    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar handleClick={this.handleClick} />
          { (this.state.loadpage === 'secure') &&
            <Blockplace />
          }
          { (this.state.loadpage === 'profit') &&
            <Profit />
          }
          { (this.state.loadpage === 'fastng') &&
            <Fasttrackng />
          }
          { (this.state.loadpage === 'arcstats') &&
            <Arcstasts />
          }
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default App;
