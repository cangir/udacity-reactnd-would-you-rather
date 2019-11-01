import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Page, Card, Text } from "tabler-react";
import ReactTimeAgo from "react-time-ago";

import QuestionAnswer from "./QuestionAnswer";
import QuestionResult from "./QuestionResult";
import NoMatch from "./NoMatch";
import SiteWrapper from "./SiteWrapper";

function humantime(myTimestamp) {
  return <ReactTimeAgo date={myTimestamp} />;
}

class Question extends Component {
  render() {
    const { authedUser, users, question } = this.props;

    if (!question) {
      return <NoMatch />;
    }

    const questionAnswered = Object.keys(users[authedUser].answers).includes(
      question.id
    );

    return (
      <SiteWrapper>
        <Page.Content>
          <Card className="card card-profile">
            <div className="card-header bg-dark text-center">
              <Text className="h3 text-white mx-auto mb-5">
                {users[question.author].name}
              </Text>
            </div>
            <Card.Body className="card-body text-center">
              <img
                alt={"Avatar of " + users[question.author].name}
                className="card-profile-img"
                src={users[question.author].avatarURL}
              />
              <h3 className="mb-3 text-left">Would you rather...</h3>
              {questionAnswered ? (
                <QuestionResult
                  question={question}
                  author={users[question.author]}
                  authedUser={authedUser}
                />
              ) : (
                <QuestionAnswer
                  question={question}
                  author={users[question.author]}
                />
              )}
              <div className="d-flex align-items-center pt-5 mt-auto">
                <div className="text-left">
                  <a href="./profile.html" className="text-default">
                    {users[question.author].name}
                  </a>{" "}
                  asked
                  <small className="d-block text-muted">
                    {humantime(question.timestamp)}
                  </small>
                </div>

                {questionAnswered && (
                  <div className="ml-auto text-muted">
                    <Link to={"/"}>
                      <Button
                        color="primary"
                        size="md"
                        icon="arrow-left-circle"
                        outline
                      >
                        Return to Homepage
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Page.Content>
      </SiteWrapper>
    );
  }
}

const mapStateToProps = ({ authedUser, users, questions }, props) => ({
  authedUser,
  users,
  question: questions[props.match.params.id]
});

export default connect(mapStateToProps)(Question);
