/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Drawr from '../../Drawr/Drawr';

const styles = {
  canvas: {
    width: '100%',
    height: '100%'
  },
};

class DrawrComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleToggleSidenav = this.handleToggleSidenav.bind(this);
    this.handleCloseSidenav = this.handleCloseSidenav.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);

    this.state = {
      open: false,
      diaOpen: false
    };
  }

  handleToggleSidenav() {
    this.setState({
      open: !this.state.open,
    });
  }
  handleCloseSidenav() {
    this.setState({
      open: false,
    });
  }
  handleCloseDialog() {
    this.setState({
      diaOpen: false,
    });
  }
  handleOpenDialog() {
    this.setState({
      diaOpen: true,
    });
  }

  render() {
    return (
      <canvas style={styles.canvas} ref={(c) => this.elem = c}></canvas>
    );
  }

  componentDidMount(){
    console.log(this.elem);
  }
}

export default DrawrComponent;
