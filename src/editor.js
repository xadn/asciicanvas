/** @jsx React.DOM */
var React = require('react');
var EditorBackground = require('./editor_background');
var DiffMatchPatch = require('diff-match-patch');
var dmp = new DiffMatchPatch();

var INVALID_CHARS = /\r|\n/g;

// 38 * 18 = 634
function defaultHtml(length) {
  var html = '';
  while (html.length < length) { html += ' '; }
  return html;
}

function replaceWithSpaces(text) {
  return defaultHtml(text.length);
}

function rest(text, skip) {
  return text.slice(skip, text.length);
}

function diffToText(diff, index, array) {
  var prevDiff = [].concat(array[index - 1]);
  var prevOp = prevDiff[0];
  var prevText = prevDiff[1] || '';
  var op = diff[0];
  var text = diff[1];

  if (op === DiffMatchPatch.DIFF_DELETE) {
    return replaceWithSpaces(text);
  }
  if (prevOp === DiffMatchPatch.DIFF_INSERT) {
    return rest(text, prevText.length);
  }
  return text;
}

function extract(diffs) {
  return diffs.map(diffToText).join('');
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
    var target = e.target,
        nextText = target.value,
        prevText = this.state.text;

    nextText = nextText.replace(INVALID_CHARS, '');

    var diffs = dmp.diff_main(prevText, nextText);

    this.setState({
      text: extract(diffs).slice(0, this.maxLength()),
      selectionStart: target.selectionStart
    });
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
        <textarea ref='ef' className='editor-content' value={this.state.text} onChange={this.handleChange} spellCheck={false} />
      </div>
    );
  },

  componentDidUpdate: function() {
    this.refs.ef.getDOMNode().selectionStart = this.state.selectionStart;
    this.refs.ef.getDOMNode().selectionEnd = this.state.selectionStart;
  }
});

module.exports = Editor;