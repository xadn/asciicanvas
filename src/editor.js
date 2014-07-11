/** @jsx React.DOM */
var React = require('react');
var EditorBackground = require('./editor_background');
var EditorField = require('./editor_field');

// 38 * 18 = 634
function defaultHtml(length) {
  var html = '';
  while (html.length < length) { html += ' '; }
  return html;
}

var Editor = React.createClass({
  getInitialState: function() {
    return {text: defaultHtml(this.maxLength())};
  },

  width: function() {
    return this.props.charWidth * this.props.widthInChars;
  },

  height: function() {
    return this.props.charHeight * this.props.heightInChars;
  },

  maxLength: function() {
    return this.props.widthInChars * this.props.heightInChars;
  },

  handleChange: function(e) {
    this.setState({text: e.target.value});
  },

  render: function() {
    var style = {
      width: this.width(),
      height: this.height(),
      top:  'calc(40% - ' + (this.width() / 2) + 'px)',
      left: 'calc(50% - ' + (this.height() / 2) + 'px)'
    };

    return (
      <div className='editor' style={style}>
        <EditorBackground className='editor-content' charWidth={this.props.charWidth} charHeight={this.props.charHeight} widthInChars={this.props.widthInChars} heightInChars={this.props.heightInChars} />
        <EditorField className='editor-content' value={this.state.text} onChange={this.handleChange} />
      </div>
    );
  }
});

module.exports = Editor;