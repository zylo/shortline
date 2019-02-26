import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

class Tile extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    isLoading: PropTypes.bool
  };

  render() {
    const { title, className, children, isLoading } = this.props;

    return (
      <div className={`flex-container vertical tile ${className || ''}`}>
        <h3 className="tile-title">{title}</h3>
        {isLoading ? <LoadingSpinner /> : children}
      </div>
    );
  }
}

export default Tile;
