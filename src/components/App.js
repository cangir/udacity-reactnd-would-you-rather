import React, { Component, Fragment } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { handleInitialData } from "../actions/shared";

import Home from "./Home";
import Leaderboard from "./Leaderboard";
import Question from "./Question";
import QuestionNew from "./QuestionNew";
import Login from "./Login";
import NoMatch from "./NoMatch";

let loggedIn = false;
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (loggedIn === true ? <Component {...props} /> : <Login />)}
  />
);

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    loggedIn = this.props.loggedIn;
    return (
      <Router>
        <Fragment>
          {!this.props.loading && (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/add" component={QuestionNew} />
              <PrivateRoute exact path="/leaderboard" component={Leaderboard} />
              <PrivateRoute exact path="/question/:id" component={Question} />
              <Route render={() => <NoMatch />} />
            </Switch>
          )}
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = ({ questions, authedUser }) => ({
  loading: questions === null,
  loggedIn: authedUser !== null
});

export default connect(mapStateToProps)(App);
