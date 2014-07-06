/** @jsx React.DOM */
var React = require('react');

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
      <div className='editor' contentEditable style={style} onInput={this.emitChange} onBlur={this.emitChange} dangerouslySetInnerHTML={{__html: this.props.html}} />
    );
  },

  shouldComponentUpdate: function(nextProps){
    return nextProps.html !== this.getDOMNode().innerHTML;
  },

  emitChange: function(){
    var html = this.getDOMNode().innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html
        }
      });
    }
    this.lastHtml = html;
  }
});

module.exports = Editor;