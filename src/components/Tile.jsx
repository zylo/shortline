import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';
import { joinClassName } from '../utilities/helpers';

export default function Tile({ children, className, isLoading, title }) {
  return (
    <div className={joinClassName('flex-container vertical tile', className)}>
      <h3 className="tile-title">{title}</h3>
      {isLoading ? <LoadingSpinner /> : children}
    </div>
  );
}

Tile.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  title: PropTypes.string
};
