Quiz = React.createClass({
  propTypes: {
    questions: React.PropTypes.array.isRequired,
    title: React.PropTypes.string.isRequired,
  },

  render() {
    return (<div>
        <div>Quiz: {this.props.title}</div>
        {questions && questions.map(question => {
          return <Question {...question} />;
        })}
      </div>)
  }
});
