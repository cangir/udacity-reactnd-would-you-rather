import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Card, Form, Grid, Text } from "tabler-react";

import { handleAddQuestion } from "../actions/shared";

// Components
import SiteWrapper from "./SiteWrapper";

class QuestionNew extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    redirect: false
  };

  handleSubmit = e => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { addQuestion } = this.props;

    addQuestion(optionOneText, optionTwoText);

    this.setState({ redirect: true });
  };

  render() {
    const { avatarURL, authedUserName } = this.props;
    const { optionOneText, optionTwoText, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <SiteWrapper>
        <Grid.Row>
          <Grid.Col lg={12}>
            <Card className="card card-profile">
              <div className="card-header bg-dark text-center">
                <Text className="h3 text-white mx-auto mb-5">
                  {authedUserName}
                </Text>
              </div>
              <Card.Body className="text-center">
                <img
                  alt={"Avatar of " + authedUserName}
                  className="card-profile-img"
                  src={avatarURL}
                />
                <h3 className="mb-3 text-left">Would you rather...</h3>
                <form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Input
                      name="example-text-input"
                      placeholder="Option one..."
                      onChange={e =>
                        this.setState({ optionOneText: e.target.value })
                      }
                    />
                    <Text className="bg-blue-lightest font-weight-bold text-center p-2 mt-5">
                      or
                    </Text>
                    <Form.Input
                      className="mt-4"
                      name="example-text-input"
                      placeholder="Option two..."
                      onChange={e =>
                        this.setState({ optionTwoText: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Button
                    className="btn-block"
                    color="primary"
                    size="md"
                    type="submit"
                    disabled={optionOneText === "" || optionTwoText === ""}
                  >
                    Ask Question
                  </Button>
                </form>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </SiteWrapper>
    );
  }
}

const mapStateToProps = ({ authedUser, users }) => ({
  authedUserName: users[authedUser].name,
  avatarURL: users[authedUser].avatarURL
});
const mapDispatchToProps = dispatch => ({
  addQuestion: (one, two) => dispatch(handleAddQuestion(one, two))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionNew);
