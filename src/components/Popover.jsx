import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import Measure from 'react-measure';

class Popover extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    positionRef: PropTypes.shape({
      getBoundingClientRect: PropTypes.func
    }),
    style: PropTypes.shape({}),
    displayCenter: PropTypes.bool,
    children: PropTypes.node,
    clickToOpen: PropTypes.bool,
    className: PropTypes.string,
    handleMouseEnter: PropTypes.func,
    handleMouseLeave: PropTypes.func,
    closeAction: PropTypes.func
  };

  static defaultProps = {
    clickToOpen: false,
    handleMouseEnter: () => {},
    handleMouseLeave: () => {}
  };

  constructor() {
    super();

    this.state = {
      visible: false,
      positionRef: null,
      contentWidth: 0,
      xCoordinate: null,
      yCoordinate: null,
      displayLeft: false,
      displayCenter: false,
      displayTop: false
    };
  }

  componentDidMount() {
    if (!this.props.closeAction) {
      window.addEventListener('scroll', this.scrollListener, true);
    }
  }

  componentWillReceiveProps({ visible, positionRef }) {
    this.setState({ visible, positionRef }, () => {
      this.calculateBodyPosition();
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener, true);
  }

  scrollListener = () => {
    this.setState({ visible: false });
  };

  handleBodyWidthChange = ({ bounds }) => {
    this.setState({ contentWidth: bounds.width }, () => {
      this.calculateBodyPosition();
    });
  };

  calculateBodyPosition = () => {
    const { positionRef, contentWidth } = this.state;

    if (positionRef) {
      const { innerWidth, innerHeight } = window;
      const { top, left, bottom, right, height, width } = positionRef.getBoundingClientRect();
      const iconCenter = left + width / 2;
      const displayTop = top - height / 2 > innerHeight / 2;
      const yCoordinate = displayTop ? top - 4 : bottom + 4;
      let displayLeft = false;
      let displayCenter = false;
      let xCoordinate = null;

      if (this.props.displayCenter) {
        if (iconCenter > innerWidth - contentWidth) {
          displayLeft = true;
          xCoordinate = right;
        } else if (iconCenter < contentWidth) {
          xCoordinate = left;
        } else {
          displayCenter = true;
          xCoordinate = iconCenter;
        }
      } else {
        displayLeft = left > innerWidth - contentWidth;
        xCoordinate = displayLeft ? right : left;
      }

      this.setState({ xCoordinate, yCoordinate, displayLeft, displayCenter, displayTop });
    }
  };

  handleClickOutside = () => {
    const { clickToOpen, closeAction } = this.props;

    if (this.state.visible && clickToOpen && closeAction) {
      closeAction();
    }
  };

  render() {
    const { style, children, handleMouseEnter, handleMouseLeave, className } = this.props;
    const {
      visible,
      xCoordinate,
      yCoordinate,
      displayLeft,
      displayCenter,
      displayTop
    } = this.state;

    return ReactDOM.createPortal(
      <Measure bounds onResize={this.handleBodyWidthChange}>
        {({ measureRef }) => (
          <div
            ref={measureRef}
            className={`popover-body${xCoordinate && visible ? ' visible' : ''}${
              displayLeft ? ' display-left' : ''
            }${displayCenter ? ' display-center' : ''}${
              displayTop ? ' display-top' : ''
            } ${className || ''}`}
            style={{ ...style, top: yCoordinate, left: xCoordinate }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {children}
          </div>
        )}
      </Measure>,
      document.getElementById('root')
    );
  }
}

export default Popover;
