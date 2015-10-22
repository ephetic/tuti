Question = React.createClass({
  propTypes: {
    type: React.PropTypes.string.isRequired,
    choices: React.PropTypes.array,
    text: React.PropTypes.string.isRequired,
    questionId: React.PropTypes.string.isRequired,
  },
  renderAnswerArea() {
    let content;
    if (this.props.type === "MultipleChoice" && this.props.choices) {
      content = (
        <ol>
          {this.props.choices.map(choice => {
            <li>
              <label>
                <input type="checkbox" />
                {choice.text}
              </label>            
              {this.props.privs.teacher ? 
                <span>
                  <span onClick={this.editChoice}>Edit</span>
                  <span onClick={this.editChoice}>Set Correct</span>
                </span>
                : ''
              }
            </li>

          })}
        </ol>
      );
    }

    if (this.props.type === 'ShortAnswer') {
      content = <textarea></textarea>
    }
    return content;
  },
  render() {
    return (
      <div>
        <div className="Question_text_div">{this.props.text}</div>
        {this.renderAnswerArea()}
        {this.props.privs.teacher ? 
          <span onClick={this.addChoice}>Add Choice</span> : ''
        }

      </div>
    );
  }
});
