QuizEditor = React.createClass({
  propTypes: {
    questions: React.PropTypes.array.isRequired,
    title: React.PropTypes.string.isRequired,
  },

  // list questions
  // add questions
  // edit delete questions

  render() {
    const questions = this.props.questions;
    return (
      <div>
        <div>Quiz: {this.props.title}</div>
        {questions && questions.map(question => {
          return <Question {...question} />;
        })}
      </div>
    );
  }
});
