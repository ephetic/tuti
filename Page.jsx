Page = React.createClass({
  propTypes: {
    userCanEdit: React.PropTypes.bool.isRequired,
  },
  
  render() {
    const __html = parseMarkdown(this.props.text);
    return <div>
        <div dangerouslySetInnerHTML={{__html}}></div>
        {this.props.userCanEdit ?
          <a href={this.props.pageId + '/edit'}>Edit</a>
          : ''}
      </div>;
  },
});

function parseMarkdown(text) {
  return marked.parse(text);
  // return marked.parse(text
  //   .replace('<', '&lt;')
  //   .replace('>', '&gt;')
  //   .replace(/(javascript\s*):/, '$1&#58;')
  // );
}
