import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import logo from "../assets/logo.svg";

import { Site, Nav, Grid, List, Button } from "tabler-react";

class SiteWrapper extends Component {
  logout = () => {
    this.props.dispatch(setAuthedUser(null));
    // When user is logged out, return to the signin page
    this.props.history.push("/");
  };

  login = () => {
    this.props.history.push("/login");
  };

  render() {
    const { authedUser, users } = this.props;

    const navBarItems = authedUser
      ? [
          {
            value: "Home",
            to: "/",
            icon: "home",
            LinkComponent: NavLink,
            useExact: true
          },
          {
            value: "Leaderboard",
            to: "/leaderboard",
            icon: "award",
            LinkComponent: NavLink,
            useExact: true
          },
          {
            value: "Add Question",
            to: "/add",
            icon: "plus-circle",
            LinkComponent: NavLink,
            useExact: true
          }
        ]
      : [];

    const accountDropdownOptions = authedUser
      ? {
          avatarURL: users[authedUser].avatarURL,
          name: users[authedUser].name,
          description: users[authedUser].id,
          options: [
            {
              icon: "help-circle",
              value: "Need help?",
              to:
                "https://github.com/cangir/udacity-reactnd-would-you-rather#introduction"
            },
            { icon: "log-out", value: "Sign Out", onClick: () => this.logout() }
          ]
        }
      : false;

    let loginLink;

    if (!authedUser) {
      loginLink = (
        <NavLink to="login" className="nav-item font-weight-bold text-dark">
          SIGN IN
        </NavLink>
      );
    } else {
      loginLink = false;
    }

    return (
      <Site.Wrapper
        headerProps={{
          alt: "Would You Rather?",
          imageURL: logo,
          navItems: (
            <Nav.Item type="div" className="d-none d-md-flex">
              <Button
                href="https://github.com/cangir/udacity-reactnd-would-you-rather"
                target="_blank"
                outline
                size="sm"
                RootComponent="a"
                color="dark"
              >
                Source code
              </Button>
              {loginLink}
            </Nav.Item>
          ),
          accountDropdown: accountDropdownOptions
        }}
        navProps={{ itemsObjects: navBarItems }}
        footerProps={{
          copyright: (
            <React.Fragment>
              Copyright © 2019. All rights reserved.
            </React.Fragment>
          ),
          nav: (
            <React.Fragment>
              <Grid.Col auto={true}>
                <List className="list-inline list-inline-dots mb-0">
                  <List.Item className="list-inline-item">
                    <a href="https://github.com/cangir/udacity-reactnd-would-you-rather#introduction">
                      Documentation
                    </a>
                  </List.Item>
                  <List.Item className="list-inline-item">
                    <a href="https://github.com/cangir/udacity-reactnd-would-you-rather/issues">
                      Issues
                    </a>
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col auto={true}>
                <Button
                  href="https://github.com/cangir/udacity-reactnd-would-you-rather"
                  size="sm"
                  outline
                  color="primary"
                  RootComponent="a"
                >
                  Source code
                </Button>
              </Grid.Col>
            </React.Fragment>
          )
        }}
      >
        <div className="my-3 my-md-5">
          <div className="container">
            <Grid.Row>
              <Grid.Col sm={12} md={10} offsetMd={1} lg={8} offsetLg={2}>
                {this.props.children}
              </Grid.Col>
            </Grid.Row>
          </div>
        </div>
      </Site.Wrapper>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser: authedUser,
    users: users
  };
}

export default withRouter(connect(mapStateToProps)(SiteWrapper));
