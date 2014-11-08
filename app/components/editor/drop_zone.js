var _     = require('underscore');
var React = require('react/addons');
// var SlideActions = require('../actions/slide_actions');

// Addons
var classSet = React.addons.classSet;

function createSlide(file) {
  // SlideActions.create(file);
}

var DropZone = React.createClass({

  getInitialState: function() {
    return {
      isActive: false
    };
  },

  render: function() {
    var className = classSet({
      'dropzone' : true,
      'active'   : this.state.isActive
    });

    return (
      <section
        className={ className }
        onDrop={ this._onDrop }
        onDragEnter={ this._onDragEnter }
        onDragLeave={ this._onDragLeave }
        onDragOver={ this._onDragOver } >
        <span className="default">Drag and drop slides here.</span>
        <span className="active">Don&rsquo;t be afraid to let go!</span>
      </section>
    );
  },

  _onDrop: function(e) {
    e.preventDefault();
    _.each(e.dataTransfer.files, createSlide);

    this.setState({
      isActive: false
    });
  },

  _onDragOver: function(e) {
    e.preventDefault();
  },

  _onDragEnter: function(e) {
    e.preventDefault();

    this.setState({
      isActive: true
    });
  },

  _onDragLeave: function(e) {
    e.preventDefault();

    this.setState({
      isActive: false
    });
  }

});

module.exports = DropZone;
