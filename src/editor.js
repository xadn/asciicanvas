/** @jsx React.DOM */
var React = require('react');
var EditorBackground = require('./editor_background');
var ContentEditable = require('./content_editable');

var Editor = React.createClass({
  width: function() {
    return this.props.charWidth * this.props.widthInChars;
  },

  height: function() {
    return this.props.charHeight * this.props.heightInChars;
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
        <ContentEditable className='editor-content' />
      </div>
    );
  }
});

module.exports = Editor;