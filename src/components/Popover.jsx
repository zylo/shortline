import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { getObjVal, joinClassName } from '../utilities/helpers';

export default function Popover({
  children,
  className,
  enableVerticalRepositioning = true,
  handleMouseEnter = () => {},
  handleMouseLeave = () => {},
  horizontalDisplay = 'right',
  positionRef,
  style = {},
  verticalDisplay = 'top',
  visible = false
}) {
  const clickOutsideRef = useRef({});
  const popoverBodyRef = useRef({});
  const popoverPositionRef = useRef(null);
  const [popoverCoordinates, setPopoverCoordinates] = useState({ x: undefined, y: undefined });
  const portalTarget = document.getElementById('root');

  const calculateTooltipPosition = useCallback(() => {
    let contentWidth = 0;
    let contentHeight = 0;

    if (getObjVal(popoverBodyRef, 'current.getBoundingClientRect')) {
      const { width, height } = popoverBodyRef.current.getBoundingClientRect();

      contentWidth = width;
      contentHeight = enableVerticalRepositioning ? height : 0;
    }

    if (getObjVal(positionRef, 'getBoundingClientRect')) {
      const { innerWidth, innerHeight } = window;
      const { top, left, bottom, right, width } = positionRef.getBoundingClientRect();
      const targetCenter = left + width / 2;
      const outerAppPadding = 35;
      const targetBuffer = 4;
      const leftPosition = left > outerAppPadding ? left : outerAppPadding;
      const rightPosition = right < innerWidth ? right : innerWidth - outerAppPadding;
      let position;
      let x;
      let y;

      if (horizontalDisplay === 'right') {
        const rightSpace = innerWidth - contentWidth - left;

        if (rightSpace > 0) {
          position = 'display-right';
          x = leftPosition;
        } else {
          position = 'display-left';
          x = rightPosition;
        }
      } else if (horizontalDisplay === 'center') {
        if (targetCenter > innerWidth - contentWidth) {
          position = 'display-left';
          x = rightPosition;
        } else if (targetCenter < contentWidth) {
          position = 'display-right';
          x = leftPosition;
        } else {
          position = 'display-center';
          x = targetCenter;
        }
      } else if (horizontalDisplay === 'left') {
        const leftSpace = left - contentWidth;

        if (leftSpace > 0) {
          position = 'display-left';
          x = rightPosition;
        } else {
          position = 'display-right';
          x = leftPosition;
        }
      }

      if (verticalDisplay === 'bottom') {
        y =
          innerHeight > bottom + targetBuffer + contentHeight
            ? bottom + targetBuffer
            : top - contentHeight - targetBuffer;
      } else if (verticalDisplay === 'top') {
        y =
          top - targetBuffer - contentHeight > 0
            ? top - contentHeight - targetBuffer
            : bottom + targetBuffer;
      }

      popoverPositionRef.current = position;
      setPopoverCoordinates({ x, y });
    }
  }, [enableVerticalRepositioning, horizontalDisplay, positionRef, verticalDisplay]);

  const scrollListener = useCallback(
    (e) => {
      if (
        visible &&
        getObjVal(e, 'target.getAttribute') &&
        !e.target.getAttribute('data-disable-scroll-listener')
      ) {
        calculateTooltipPosition();
      }
    },
    [calculateTooltipPosition, visible]
  );

  useEffect(() => {
    if (visible) {
      calculateTooltipPosition();
    }
  }, [calculateTooltipPosition, children, visible]);

  useEffect(() => {
    window.addEventListener('scroll', scrollListener, true);

    return () => {
      window.removeEventListener('scroll', scrollListener, true);
    };
  }, [scrollListener]);

  return portalTarget
    ? ReactDOM.createPortal(
        <div
          ref={popoverBodyRef}
          className={joinClassName(
            'popover-body',
            popoverPositionRef.current,
            className,
            visible && 'visible'
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ ...style, left: popoverCoordinates.x, top: popoverCoordinates.y }}
        >
          <div style={{ width: '100%', height: '100%' }} ref={clickOutsideRef}>
            {children}
          </div>
        </div>,
        portalTarget
      )
    : null;
}

Popover.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  enableVerticalRepositioning: PropTypes.bool,
  handleMouseEnter: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  horizontalDisplay: PropTypes.oneOf(['center', 'left', 'right']),
  positionRef: PropTypes.shape({
    getBoundingClientRect: PropTypes.func
  }),
  style: PropTypes.shape({}),
  verticalDisplay: PropTypes.oneOf(['bottom', 'top']),
  visible: PropTypes.bool
};
