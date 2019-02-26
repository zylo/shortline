import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import checkForProvider from './utilities/checkForProvider';

const SelfDestructStateContext = createContext();
const SelfDestructUpdateContext = createContext();

function SelfDestructProvider({ children }) {
  const [selfDestructionCommenced, setSelfDestructionCommenced] = useState(false);

  return (
    <SelfDestructStateContext.Provider value={{ selfDestructionCommenced }}>
      <SelfDestructUpdateContext.Provider value={{ setSelfDestructionCommenced }}>
        {children}
      </SelfDestructUpdateContext.Provider>
    </SelfDestructStateContext.Provider>
  );
}

SelfDestructProvider.propTypes = {
  children: PropTypes.node
};

function useSelfDestructState() {
  const context = useContext(SelfDestructStateContext);

  checkForProvider(context, 'useSelfDestructState', 'SelfDestructProvider');

  return context;
}

function useSelfDestructUpdate() {
  const context = useContext(SelfDestructUpdateContext);

  checkForProvider(context, 'useSelfDestructUpdate', 'SelfDestructProvider');

  return context;
}

export { SelfDestructProvider, useSelfDestructState, useSelfDestructUpdate };
