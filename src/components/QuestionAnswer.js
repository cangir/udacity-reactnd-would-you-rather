import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form } from "tabler-react";
import { handleSaveQuestionAnswer } from "../actions/shared";

class QuestionAnswer extends Component {
  state = {
    option: "none",
    showAlert: false
  };

  handleChange(e) {
    this.setState({
      option: e.target.value,
      showAlert: false
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { option } = this.state;
    const { dispatch, question } = this.props;

    this.state.option === "none"
      ? this.setState({ showAlert: true })
      : dispatch(handleSaveQuestionAnswer(question.id, option));
  }

  render() {
    const { question } = this.props;

    return (
      <form
        onChange={e => this.handleChange(e)}
        onSubmit={e => this.handleSubmit(e)}
      >
        <Form.Group label="Choose one option">
          {this.state.showAlert && (
            <small className="text-danger p-4">
              * Please select one option
            </small>
          )}
          <Form.SwitchStack>
            <Form.Switch
              label={question.optionOne.text}
              name="choice"
              type="radio"
              value="optionOne"
            />
            <Form.Switch
              label={question.optionTwo.text}
              name="choice"
              type="radio"
              value="optionOne"
            />
          </Form.SwitchStack>
        </Form.Group>
        <Button
          className="btn-primary btn-block"
          type="submit"
          value="Submit Answer"
        >
          Submit Answer
        </Button>
      </form>
    );
  }
}

export default connect()(QuestionAnswer);
