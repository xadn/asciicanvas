/** @jsx React.DOM */
var React = require('react');
var Editor = require('./editor');

var App = React.createClass({
  getInitialState: function() {
    return {fontLoaded: false, charWidth: 1, charHeight: 1};
  },

  render: function() {
    console.count('render')
    return (
      <div>
        {this.renderEditor()}
        <span ref='fontTestDefault' className="font-test-default">t</span>
        <span ref='fontTestEditor' className="font-test-editor">t</span>
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
    if (this.state.fontLoaded) { return; }

    var defaultFont = this.refs.fontTestDefault.getDOMNode();
    var editorFont = this.refs.fontTestEditor.getDOMNode();

    if (editorFont.offsetWidth !== defaultFont.offsetWidth && editorFont.offsetHeight !== defaultFont.offsetHeight) {
      this.setState({
        charWidth: editorFont.offsetWidth - 1,
        charHeight: editorFont.offsetHeight,
        fontLoaded: true
      });
    }

    if (!this.state.fontLoaded) {
      console.count('waiting for webfont to load')
      requestAnimationFrame(this.updateCharDimensions);
    }
  }
});

React.renderComponent(<App />, document.getElementById('main'));
