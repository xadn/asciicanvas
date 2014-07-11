/** @jsx React.DOM */
var React = require('react');
var ContentEditable = require('./content_editable');

var ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  ' ': '&nbsp;'
};

function charEscape(c) {
  return ESCAPES[c] ? ESCAPES[c] : c;
}

function htmlEscape(html) {
  return [].map.call(html, charEscape).join('');
}

function noop() {}

var EditorField = React.createClass({
  getDefaultProps: function() {
    return {value: '', onChange: noop};
  },

  handleChange: function(e) {
    var node = this.getDOMNode();
    this.props.onChange({target: {value: node.textContent}});
  },

  render: function() {
    return (
      <ContentEditable className={this.props.className} html={htmlEscape(this.props.value)} onChange={this.handleChange} />
    );
  }
});

module.exports = EditorField;