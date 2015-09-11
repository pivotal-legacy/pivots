var React = require('react');

var Face = React.createClass({
  render: function() {
    var pivot = this.props.pivot;

    return (
      <div className='col-md-3'>
        <a>
          <div className='thumbnail'>
            <img src={pivot.imageUrl} />
            <div>
              <div>{pivot.firstName} {pivot.lastName}</div>
              <div><em>{pivot.title}</em></div>
              <div>
                Manager: <span>{pivot.manager}</span>
              </div>
              <div>{pivot.email}</div>
              <div>
                <span>{pivot.location}</span>
                <span className='pull-right'>{pivot.startDate}</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }
});

module.exports = Face;