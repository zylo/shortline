import { combineReducers } from 'redux';
import starWars from './modules/starWars';

const appReducer = combineReducers({
  starWars
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
