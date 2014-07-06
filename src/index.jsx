/** @jsx React.DOM */
var React = require('react');
var Editor = require('./editor');
var EditorBackground = require('./editor_background');

var App = React.createClass({
  render: function() {
    var charWidth = 8;
    var charHeight = 17;
    var widthInChars = 38;
    var heightInChars = 18;

    return (
      <div>
        <div>Hello World</div>
        <EditorBackground charWidth={charWidth} charHeight={charHeight} widthInChars={widthInChars} heightInChars={heightInChars} />
        <Editor charWidth={charWidth} charHeight={charHeight} widthInChars={widthInChars} heightInChars={heightInChars} />
        <div>Hello World</div>
        <span ref='testEl' className="text-width-test">t</span>
      </div>
    );
  },

  componentDidMount: function() {
    var testEl = this.refs.testEl.getDOMNode();
    console.log('width:', testEl.offsetWidth);
    console.log('height:', testEl.offsetHeight);

    // var self = this;
    // setInterval(function() {
    //   self.forceUpdate();
    // }, 1000);
  },

  componentDidUpdate: function() {
    var testEl = this.refs.testEl.getDOMNode();
    console.log('width:', testEl.offsetWidth);
    console.log('height:', testEl.offsetHeight);
  }
});

setTimeout(function() {
  React.renderComponent(<App />, document.getElementById('main'));
}, 0);