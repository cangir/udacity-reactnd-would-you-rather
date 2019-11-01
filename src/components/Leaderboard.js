import React from "react";
import { connect } from "react-redux";
import { Badge, Table, Avatar, Card, Text } from "tabler-react";

// Components
import SiteWrapper from "./SiteWrapper";

const LeaderBoard = props => {
  let { users } = props;

  return (
    <SiteWrapper>
      <Card>
        <Card.Header>
          <Card.Title>Leaderboard</Card.Title>
        </Card.Header>
        <Table
          cards={true}
          striped={true}
          responsive={true}
          className="table-vcenter"
        >
          <Table.Header>
            <Table.Row>
              <Table.ColHeader alignContent="center">Score</Table.ColHeader>
              <Table.ColHeader colSpan={2}>User</Table.ColHeader>
              <Table.ColHeader alignContent="center">
                Answered Questions
              </Table.ColHeader>
              <Table.ColHeader alignContent="center">
                Created Questions
              </Table.ColHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map(user => (
              <Table.Row key={user.id}>
                <Table.Col alignContent="center">
                  <Badge color="warning">
                    <Text className="h4 my-0 mx-1">{user.score}</Text>
                  </Badge>
                </Table.Col>
                <Table.Col className="w-1">
                  <Avatar imageURL={user.avatarURL} />
                </Table.Col>
                <Table.Col>{user.name}</Table.Col>
                <Table.Col alignContent="center">
                  {Object.keys(user.answers).length}
                </Table.Col>
                <Table.Col alignContent="center">
                  {user.questions.length}
                </Table.Col>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </SiteWrapper>
  );
};

function mapStateToProps({ users, authedUser }) {
  // Make a new user object so that users doesn't get overwritten.
  let userObj = Object.assign({}, users);
  Object.values(users).map(
    user =>
      (userObj[user.id]["score"] =
        Object.keys(user.answers).length + user.questions.length)
  );
  return {
    // Create an array of users, sorted by score
    users: Object.values(userObj).sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      } else if (a.score > b.score) {
        return -1;
      } else {
        return 0;
      }
    }),
    authedUser
  };
}

export default connect(mapStateToProps)(LeaderBoard);
