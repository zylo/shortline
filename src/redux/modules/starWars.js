import { createAction, handleActions } from 'redux-actions';
import ThirdPartyAPI from '../ThirdPartyAPI';

export const IS_LOADING_STAR_WARS_DATA = 'IS_LOADING_STAR_WARS_DATA';
export const LOAD_STAR_WARS_DATA_SUCCESS = 'LOAD_STAR_WARS_DATA_SUCCESS';

export const isLoadingStarWarsData = createAction(IS_LOADING_STAR_WARS_DATA);
export const loadStarWarsDataSuccess = createAction(LOAD_STAR_WARS_DATA_SUCCESS);

function loadStarWarsData({ endpoint, page }) {
  return async (dispatch) => {
    dispatch(isLoadingStarWarsData({ [endpoint]: true }));
    let result;

    try {
      result = await ThirdPartyAPI.getStarWarsData({ endpoint, page });
    } catch (e) {
      dispatch(isLoadingStarWarsData({ [endpoint]: false }));
      return;
    }

    dispatch(loadStarWarsDataSuccess({ endpoint, data: result.results }));
    dispatch(isLoadingStarWarsData({ [endpoint]: false }));
  };
}

export const actions = {
  loadStarWarsData
};

export default handleActions(
  {
    [IS_LOADING_STAR_WARS_DATA]: (state, { payload }) => {
      return {
        ...state,
        isLoadingStarWarsData: { ...state.isLoadingStarWarsData, ...payload }
      };
    },
    [LOAD_STAR_WARS_DATA_SUCCESS]: (state, { payload }) => {
      const { endpoint, data } = payload;

      return {
        ...state,
        starWarsData: {
          ...state.starWarsData,
          [endpoint]: [...(state.starWarsData[endpoint] || []), ...data]
        }
      };
    }
  },
  {
    isLoadingStarWarsData: {},
    starWarsData: {}
  }
);
