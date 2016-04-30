/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Toolbars from '../../components/Toolbars/Toolbars';
import ApiService from '../../services/ApiService/ApiService';
import DrawrComponent from '../../components/Drawr/Drawr';

const styles = {
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'column'
  },
};

const muiTheme = getMuiTheme({
  palette: {
    //accent1Color: deepOrange500,
  },
});

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);


    this.state = {
      open: false,
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <Toolbars/>
          <DrawrComponent/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
