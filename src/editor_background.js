/** @jsx React.DOM */
var React = require('react');

var EditorBackground = React.createClass({

  renderWidth: function() {
    return 2 * this.props.charWidth * this.props.widthInChars;
  },

  renderHeight: function() {
    return 2 * this.props.charHeight * this.props.heightInChars;
  },

  render: function() {
    return (
      <canvas className={this.props.className} width={this.renderWidth()} height={this.renderHeight()} />
    );
  },

  componentDidMount: function() {
    this.drawGrid();
  },

  componentDidUpdate: function() {
    this.drawGrid();
  },

  drawGrid: function() {
    var context = this.getDOMNode().getContext('2d');
    var renderCharWidth = 2 * this.props.charWidth;
    var renderCharHeight = 2 * this.props.charHeight;
    var renderWidth = this.renderWidth();
    var renderHeight = this.renderHeight();

    context.beginPath();
    context.clearRect(0, 0, renderWidth, renderHeight);

    var x = 0;
    while (x <= renderWidth) {
      context.beginPath();
      context.lineWidth = '0.5';
      context.moveTo(x, 0);
      context.lineTo(x, renderHeight);
      context.stroke();
      x += renderCharWidth;
    }

    var y = 0;
    while (y <= renderHeight) {
      context.beginPath();
      context.lineWidth = '0.5';
      context.moveTo(0, y);
      context.lineTo(renderWidth, y);
      context.stroke();
      y += renderCharHeight;
    }
  }

});

module.exports = EditorBackground;
