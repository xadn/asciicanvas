/** @jsx React.DOM */
var React = require('react');
var Editor = require('./editor');

var App = React.createClass({
  getInitialState: function() {
    return {firstRender: true, fontLoaded: false, charWidth: 1, charHeight: 1};
  },

  render: function() {
    return (
      <div>
        {this.renderEditor()}
        <span ref='testEl' className="text-width-test">t</span>
      </div>
    );
  },

  renderEditor: function() {
    var charWidth = this.state.charWidth;
    var charHeight = this.state.charHeight;
    var widthInChars = 38;
    var heightInChars = 18;

    if (this.state.fontLoaded) {
      return <Editor charWidth={charWidth} charHeight={charHeight} widthInChars={widthInChars} heightInChars={heightInChars} />;
    }
  },

  componentDidMount: function() {
    this.updateCharDimensions();
  },

  componentDidUpdate: function() {
    this.updateCharDimensions();
  },

  updateCharDimensions: function() {
    var testEl = this.refs.testEl.getDOMNode();
    var attrs = {
      charWidth: testEl.offsetWidth,
      charHeight: testEl.offsetHeight,
      firstRender: false
    };

    if (attrs.charWidth !== this.state.charWidth || attrs.charHeight !== this.state.charHeight) {
      if (!this.state.firstRender) {
        attrs.fontLoaded = true;
      }
      this.setState(attrs);
    }

    if (!this.state.fontLoaded) {
      console.count('waiting for webfont to load')
      requestAnimationFrame(this.updateCharDimensions);
    }
  }
});

React.renderComponent(<App />, document.getElementById('main'));
