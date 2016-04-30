/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconMenu from 'material-ui/IconMenu';

const styles = {
  appbar: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    //accent1Color: deepOrange500,
  },
});

class Toolbars extends React.Component {
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
    const standardActions = (
      <FlatButton
        label="im so proud of you"
        secondary={true}
        onTouchTap={this.handleCloseDialog}
      />
    );

    // <div style={styles.container}>

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="KittyPaint"
            styles={styles.appbar}
            iconElementLeft={
              <IconButton onTouchTap={this.handleToggleSidenav}>
                <NavigationMenu />
              </IconButton>
            }
          />

          <Dialog
            open={this.state.diaOpen}
            title="Super Secret Dialog"
            actions={standardActions}
            onRequestClose={this.handleCloseDialog}
          >
            you did it fam
          </Dialog>

          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
          >
            <MenuItem onTouchTap={this.handleCloseSidenav}>Close Leftnav</MenuItem>
            <MenuItem onTouchTap={this.handleOpenDialog}>Open Fancy Dialog</MenuItem>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Toolbars;
