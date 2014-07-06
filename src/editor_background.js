/** @jsx React.DOM */
var React = require('react');

var EditorBackground = React.createClass({

  retinaWidth: function() {
    return 2 * this.props.charWidth * this.props.widthInChars;
  },

  retinaHeight: function() {
    return 2 * this.props.charHeight * this.props.heightInChars;
  },

  render: function() {
    return (
      <canvas className={this.props.className} width={this.retinaWidth()} height={this.retinaHeight()} />
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
    var retinaWidth = this.retinaWidth();
    var retinaHeight = this.retinaHeight();

    context.beginPath();
    context.clearRect(0, 0, retinaWidth, retinaHeight);

    var x = 0;
    while (x <= retinaWidth) {
      context.beginPath();
      context.lineWidth = '0.5';
      context.moveTo(x, 0);
      context.lineTo(x, retinaHeight);
      context.stroke();
      x += renderCharWidth;
    }

    var y = 0;
    while (y <= retinaHeight) {
      context.beginPath();
      context.lineWidth = '0.5';
      context.moveTo(0, y);
      context.lineTo(retinaWidth, y);
      context.stroke();
      y += renderCharHeight;
    }
  }

});

module.exports = EditorBackground;
