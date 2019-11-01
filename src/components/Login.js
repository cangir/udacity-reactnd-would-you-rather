import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Grid, Form, Button, Text, Page } from "tabler-react";
import logo from "../assets/logo.svg";

class Login extends Component {
  state = {
    authedUser: ""
  };

  changeUser = event => {
    this.setState({ authedUser: event.target.value });
  };

  authorizeUser = () => {
    this.props.dispatch(setAuthedUser(this.state.authedUser));

    let prevRouterPath =
      this.props.location.state !== undefined
        ? this.props.location.state.previous.pathname
        : null;
    prevRouterPath
      ? this.props.history.push(prevRouterPath)
      : this.props.history.push("/");
  };

  render() {
    const { users } = this.props;
    return (
      <Page className="page-single">
        <div className="container">
          <div className="row">
            <Grid.Col className="col-login mx-auto">
              <div className="text-center mb-6">
                <img alt="Would You Rather" src={logo} className="h-6" />
              </div>
              <Form className="card" autoComplete="off">
                <div className="card-body p-6">
                  <div className="card-title h6 text-center">
                    Login to your account
                  </div>
                  <Form.Group label="Select User">
                    <Form.Select
                      value={this.state.authedUser}
                      onChange={this.changeUser}
                    >
                      <option default disabled defaultValue value="">
                        Select User
                      </option>
                      {users.map(user => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Button
                    block
                    type="button"
                    color="primary"
                    onClick={this.authorizeUser}
                  >
                    Login
                  </Button>
                </div>
              </Form>
              <Text center="true" muted="true">
                Select a user from above and click the login button.
              </Text>
            </Grid.Col>
          </div>
        </div>
      </Page>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    users: Object.values(users),
    authedUser: authedUser
  };
}

export default withRouter(connect(mapStateToProps)(Login));
