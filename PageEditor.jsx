PageEditor = React.createClass({
  propTypes: {
    pageId: React.PropTypes.string.isRequired,
  },

  onClick(event) {
    const tool = event.target.getAttribute('name');
    const node = this.refs.textarea.getDOMNode();
    const cursor = node.selectionStart;
    // link: [example link](http://example.com/)
    // image: ![alt text](/path/to/img.jpg "Title")
    // video: raw iframe html
    const insert = {
      'headingtool': () => '\n# ',
      'bulletstool': () => '\n* ',
      'linktool': () => {
        const link = prompt('Enter link location.');
        const text = prompt('Enter link text.');
        return '[' + text + '](' + link + ')';
      },
      'imagetool': () => {
        const link = prompt('Enter image URL.');
        const text = prompt('Enter image alt text.');
        return '![' + text + '](' + link + ')';
      },
      'videotool': () => {
        const link = prompt('Paste in YouTube link');
        const match = link.match(/(?:v=(.*)?$)|(?:youtu\.be\/(.*)$)/);
        // without extra params
        // const match = link.match(/(?:v=(\w+)(?:&.*)?$)|(?:youtu\.be\/(\w+))/);
        if (! match) {
            alert('Unable to parse YouTube link');
            return '';
        }
        const code = match[1] || match[2];
        const url = 'http://www.youtube.com/embed/' + code;
        return '<iframe class="videoplayer" src="' + url + '"></iframe>';
      },
    }[tool]();

    let text = node.value;
    text = [
      text.slice(0, cursor),
      insert,
      text.slice(cursor),
    ].join('');
    node.value = text;
    node.focus();
    node.setSelectionRange(cursor + insert.length, cursor + insert.length);
  },

  onSave() {
    const text = this.refs.textarea.getDOMNode().value;
    Meteor.call('savePage', this.props.pageId, text, () => this.onBack());
  },

  onBack() {
    FlowRouter.go('/page/' + this.props.pageId);
  },

  render() {
    return (<div className="PageEditor_container">
        <ul className="PageEditor_ul_toolbar">
          <li className="PageEditor_ul_headingtool"
           name="headingtool"
           onClick={this.onClick}>Heading</li>
          <li className="PageEditor_ul_bulletstool"
           name="bulletstool"
           onClick={this.onClick}>Bullets</li>
          <li className="PageEditor_ul_linktool"
           name="linktool"
           onClick={this.onClick}>Link</li>
          <li className="PageEditor_ul_imagetool"
            name="imagetool"
            onClick={this.onClick}>Image</li>
          <li className="PageEditor_ul_videotool"
            name="videotool"
            onClick={this.onClick}>YouTube</li>
        </ul>
        <textarea
          ref="textarea"
          className="PageEditor_textarea"
          defaultValue={this.props.text}></textarea>
        <button onClick={this.onSave}>Save</button>
        <button onClick={this.onBack}>Back</button>
      </div>);
  },
});
