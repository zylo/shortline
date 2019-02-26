import PropTypes from 'prop-types';
import React from 'react';
import Popover from './Popover';

class Tooltip extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    tooltipBody: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    children: PropTypes.element,
    style: PropTypes.shape({}),
    bodyStyle: PropTypes.shape({}),
    disableTooltip: PropTypes.bool,
    allowBodyHover: PropTypes.bool
  };

  static defaultProps = { disableTooltip: false, allowBodyHover: false };

  constructor() {
    super();

    this.tooltipRef = React.createRef();

    this.state = {
      iconHover: false,
      tooltipHover: false
    };
  }

  handleIconMouseEnter = () => {
    if (!this.props.disableTooltip) {
      this.setState({ iconHover: true });
    }
  };

  handleIconMouseLeave = () => {
    if (this.props.allowBodyHover) {
      // setTimeout allows time for mouse to leave icon and enter tooltip body
      setTimeout(() => {
        this.setState({ iconHover: false });
      }, 150);
    } else {
      this.setState({ iconHover: false });
    }
  };

  handleTooltipMouseEnter = () => {
    if (this.props.allowBodyHover) {
      this.setState({ tooltipHover: true });
    }
  };

  handleTooltipMouseLeave = () => {
    this.setState({ tooltipHover: false });
  };

  render() {
    const { children, tooltipBody, style, bodyStyle, className } = this.props;
    const { iconHover, tooltipHover } = this.state;

    return (
      <span ref={this.tooltipRef} className={className}>
        <span onMouseEnter={this.handleIconMouseEnter} onMouseLeave={this.handleIconMouseLeave}>
          {children}
        </span>
        <Popover
          visible={iconHover || tooltipHover}
          style={style}
          positionRef={this.tooltipRef.current}
          handleMouseEnter={this.handleTooltipMouseEnter}
          handleMouseLeave={this.handleTooltipMouseLeave}
        >
          <div className="tooltip-body" style={bodyStyle}>
            {tooltipBody}
          </div>
        </Popover>
      </span>
    );
  }
}

export default Tooltip;
