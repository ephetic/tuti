Quiz = React.createClass({
  propTypes: {
    quizId: React.PropTypes.string.isRequired, 
    questions: React.PropTypes.array.isRequired,
    title: React.PropTypes.string.isRequired,
    privs: React.PropTypes.object.isRequired,
  },

  editTitle() {
    const title = prompt('Enter new quiz title');
    const update = {$set: {title}};
    Meteor.call('updateQuiz', this.props.quizId, update);
  },

  addQuestion() {
    const text = prompt('Enter the text of the question (this can be edited later)');
    Meteor.call('addQuestion', {text, choices:[]}, (err, questionId) =>{
      console.log(err, questionId);
      const update = {$push: {questions: questionId}};
      Meteor.call('updateQuiz', this.props.quizId, update);
    });
  },

  render() {
    console.log('quiz props', this.props);
    const questions = this.props.questions || [];
    const teacher = this.props.privs.teacher;
    return (<div>
        <h2>{this.props.title}</h2>
        {teacher ? 
          <span onClick={this.editTitle}>Edit Title</span> : ''
        }

        {questions.map(question => {
          return <Question {...question} />;
        })}

        {teacher ? 
          <span onClick={this.addQuestion}>Add Question</span> : ''
        }

      </div>)
  }
});
