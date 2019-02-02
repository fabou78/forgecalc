import React, { Component, Fragment } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors'

import Profit from './components/Profit';
import Navbar from './components/Navbar';
import Blockplace from './components/Blockplace';


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
    isblockplace: true
  }

  handleClick = (event) => {
    const { name } = event.target;
    if (name === 'secure') {
      this.setState({ isblockplace: true });
    };
    if (name === 'profit') {
      this.setState({ isblockplace: false });
    };

  }

  render() {
    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar handleClick={this.handleClick} />
          { (this.state.isblockplace) &&
            <Blockplace />
          }
          { (!this.state.isblockplace) &&
            <Profit />
          }
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default App;
