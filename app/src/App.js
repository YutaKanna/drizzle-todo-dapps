import React from "react";
import { DrizzleContext } from '@drizzle/react-plugin';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Home from "./Home";
import NewInfo from "./NewInfo";
import History from "./History";
import "./App.css";
const styles = {
  root: {
    flexGrow: 1,
  },
}
const App = ({ classes }) => (
  <DrizzleContext.Consumer>
    {
      drizzleContext => {
        const { drizzle, drizzleState, initialized } = drizzleContext;
        if (!initialized) {
          return "Loading Drizzle...";
        }
        return (
          <Router>
            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Toolbar>
                  <Typography variant="h6" color="inherit">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                  </Typography>
                  <p>&nbsp;</p>
                  <NavLink className="nav-link" to="/history/">History</NavLink>
                </Toolbar>
              </AppBar>
              <Route
                path="/" exact
                render={props => <NewInfo drizzle={drizzle} drizzleState={drizzleState} />}
              />
              <Route
                path="/" exact
                render={props => <Home drizzle={drizzle} drizzleState={drizzleState} />}
              />
              <Route
                path="/history/"
                render={props => <History drizzle={drizzle} drizzleState={drizzleState} />}
              />
            </div>
          </Router>
        );
      }
    }
  </DrizzleContext.Consumer>
)
export default withStyles(styles)(App);