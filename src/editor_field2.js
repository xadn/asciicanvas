/** @jsx React.DOM */
var React = require('react');

function noop() {}

var EditorField = React.createClass({
  getDefaultProps: function() {
    return {value: '', onChange: noop};
  },

  handleChange: function(e) {
    console.log('change', e.target.value.length)
    this.props.onChange({target: {value: e.target.value}});
  },

  render: function() {
    console.log('value', this.props.value.length)
    return (

    );
  }
});

module.exports = EditorField;