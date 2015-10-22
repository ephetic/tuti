Page = React.createClass({
  render() {
    const __html = parseMarkdown(this.props.text);
    return <div dangerouslySetInnerHTML={{__html}}></div>;
  },
});

function parseMarkdown(text) {
  return text;
  // return marked.parse(text
  //   .replace('<', '&lt;')
  //   .replace('>', '&gt;')
  //   .replace(/(javascript\s*):/, '$1&#58;')
  // );
}
