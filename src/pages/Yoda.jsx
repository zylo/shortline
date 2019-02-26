import React from 'react';
import PropTypes from 'prop-types';
import { useSelfDestructState } from '../contexts/selfDestructContext';
import { joinClassName } from '../utilities/helpers';
import '../styles/pages/yoda.scss';

export default function Yoda() {
  return <Yoda_DisplayLayer {...useDataLayer()} />;
}

export function Yoda_DisplayLayer({ selfDestructionCommenced }) {
  return (
    <div
      className={joinClassName(
        'flex-container vertical justify-center align-center yoda',
        selfDestructionCommenced && 'self-destruct-commenced'
      )}
    >
      <img src={require('../assets/images/yoda.png')} alt="Yoda" />
      <p>A good job, you have done...</p>
    </div>
  );
}

Yoda_DisplayLayer.propTypes = {
  selfDestructionCommenced: PropTypes.bool
};

function useDataLayer() {
  const { selfDestructionCommenced } = useSelfDestructState();

  return { selfDestructionCommenced };
}
