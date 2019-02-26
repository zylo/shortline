import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Popover from './Popover';
import { joinClassName } from '../utilities/helpers';

export default function Tooltip({
  actionContent,
  allowBodyHover,
  bodyStyle,
  children,
  className,
  disabled,
  horizontalDisplay,
  popoverClassName,
  text,
  title,
  verticalDisplay
}) {
  const tooltipRef = useRef(null);
  const [targetHover, setTargetHover] = useState(false);
  const [tooltipHover, setTooltipHover] = useState(false);
  const isVisible = targetHover || tooltipHover;

  useEffect(() => {
    const tooltip = tooltipRef.current;

    function showTooltip() {
      setTargetHover(true);
    }

    function hideTooltip() {
      setTargetHover(false);
    }

    tooltip.addEventListener('focus', showTooltip);
    tooltip.addEventListener('blur', hideTooltip);

    return () => {
      tooltip.removeEventListener('focus', showTooltip);
      tooltip.removeEventListener('blur', hideTooltip);
    };
  }, [setTargetHover]);

  function handleTargetMouseEnter(e) {
    e.stopPropagation();
    setTargetHover(true);
  }

  function handleTargetMouseLeave() {
    if (allowBodyHover) {
      // setTimeout allows time for mouse to leave icon and enter tooltip body
      setTimeout(() => {
        setTargetHover(false);
      }, 150);
    } else {
      setTargetHover(false);
    }
  }

  function handleTooltipMouseEnter() {
    if (allowBodyHover) {
      setTooltipHover(true);
    }
  }

  function handleTooltipMouseLeave() {
    setTooltipHover(false);
  }

  return (
    <span
      ref={tooltipRef}
      className={joinClassName('flex-container zylo-tooltip', className)}
      role="tooltip"
    >
      <span onMouseEnter={handleTargetMouseEnter} onMouseLeave={handleTargetMouseLeave}>
        {children}
      </span>
      {isVisible && !disabled && (
        <Popover
          visible={isVisible}
          positionRef={tooltipRef.current}
          horizontalDisplay={horizontalDisplay}
          verticalDisplay={verticalDisplay}
          handleMouseEnter={handleTooltipMouseEnter}
          handleMouseLeave={handleTooltipMouseLeave}
        >
          <div className={joinClassName('tooltip-body', popoverClassName)} style={bodyStyle}>
            {title && <div className="tooltip-title">{title}</div>}
            {text && <div className="tooltip-text">{text}</div>}
            {actionContent && <div className="tooltip-actions">{actionContent}</div>}
          </div>
        </Popover>
      )}
    </span>
  );
}

Tooltip.propTypes = {
  actionContent: PropTypes.element,
  allowBodyHover: PropTypes.bool,
  bodyStyle: PropTypes.shape({}),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.string]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  horizontalDisplay: PropTypes.oneOf(['center', 'left', 'right']),
  popoverClassName: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]).isRequired,
  title: PropTypes.string,
  verticalDisplay: PropTypes.oneOf(['bottom', 'top'])
};
