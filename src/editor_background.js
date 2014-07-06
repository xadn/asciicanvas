/** @jsx React.DOM */
var React = require('react');

var EditorBackground = React.createClass({

  width: function() {
    return this.props.charWidth * this.props.widthInChars;
  },

  height: function() {
    return this.props.charHeight * this.props.heightInChars;
  },

  renderWidth: function() {
    return 2 * this.width();
  },

  renderHeight: function() {
    return 2 * this.height();
  },

  render: function() {
    var style = {
      width: this.width(),
      height: this.height(),
      top:  'calc(40% - ' + (this.width() / 2) + 'px)',
      left: 'calc(50% - ' + (this.height() / 2) + 'px)'
    };

    return (
      <canvas style={style} width={this.renderWidth()} height={this.renderHeight()} className='editor-background'></canvas>
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
    var charWidth = this.props.charWidth;
    var charHeight = this.props.charHeight;
    var renderWidth = this.renderWidth();
    var renderHeight = this.renderHeight();

    context.beginPath();
    context.clearRect(0, 0, this.renderWidth(), this.renderHeight());

    var x = 0;
    while (x < renderWidth) {
      x += (2 * charWidth);
      context.beginPath();
      context.lineWidth="0.5";
      context.moveTo(x, 0);
      context.lineTo(x, renderHeight);
      context.stroke();
    }

    var y = 0;
    while (y < renderHeight) {
      y += (2 * charHeight);
      context.beginPath();
      context.lineWidth="0.5";
      context.moveTo(0, y);
      context.lineTo(renderWidth, y);
      context.stroke();
    }
  },

});

module.exports = EditorBackground;
