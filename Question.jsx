Question = React.createClass({
  propTypes: {
    type: React.PropTypes.string.isRequired,
    choices: React.PropTypes.array,
    text: React.PropTypes.string.isRequired,
  },
  renderAnswerArea() {
    if (this.props.type === "MultipleChoice" && this.props.choices) {
      return (
        <ol>
          {this.props.choices.map(choice => {
            <label>
              <input type="checkbox" />
              {choice.text}
            </label>            
          })}
        </ol>
      );
    }

    if (this.props.type === 'ShortAnswer') {
      return <textarea></textarea>
    }
  },
  render() {
    return (
      <div>
        <div className="Question_text_div">{this.props.text}</div>
        {this.renderAnswerArea()}
      </div>
    );
  }
});
