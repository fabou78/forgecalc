import React, { Component } from 'react';

import Profit from './components/Profit';
import Navbar from './components/Navbar';


class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Profit />
      </div>
    );
  }
}

export default App;
