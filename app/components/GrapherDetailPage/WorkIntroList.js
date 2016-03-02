import React from 'react';

var WorkIntroRow = require('./WorkIntroRow');

var WorkIntroList = React.createClass({
  getDefaultProps: function() {
    return {
      data: []
    };
  },
  render: function() {
    var workIntroNodes = this.props.data.map(function(work,i){
      return (<WorkIntroRow data={work} key={i}/>);
    });
    return (
      <div className="workIntroList">
        {workIntroNodes}
      </div>
    );
  }
});

module.exports = WorkIntroList;
