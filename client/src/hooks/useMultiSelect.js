import { useCallback, useState, useReducer } from 'react';

import { MULTI_SELECT_CATEGORIES } from 'utils/constants';

const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  POPULATE_PRESELECTED_ITEMS: 'POPULATE_PRESELECTED_ITEMS',
  REMOVE_PRESELECTED_ITEMS: 'REMOVE_PRESELECTED_ITEMS',
  CLEAR_STATE: 'CLEAR_STATE',
};

function valuesReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      if (
        state.preselected.includes(action.payload) ||
        state.selected.includes(action.payload)
      ) {
        return state;
      }

      return {
        ...state,
        [action.category]: [...state[action.category], action.payload],
      };
    case ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        [action.category]: state[action.category].filter(
          (item) => item !== action.payload,
        ),
      };
    case ACTIONS.POPULATE_PRESELECTED_ITEMS:
      return {
        ...state,
        preselected: action.payload,
      };
    case ACTIONS.REMOVE_PRESELECTED_ITEMS:
      return {
        ...state,
        preselected: [],
      };
    case ACTIONS.CLEAR_STATE:
      return {
        selected: [],
        preselected: [],
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const useMultiSelect = (initiallySelectedValues = []) => {
  const [inputValue, setInputValue] = useState('');
  const [items, dispatch] = useReducer(valuesReducer, {
    selected: [],
    preselected: initiallySelectedValues,
  });

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleItemSelect = (
    item,
    category = MULTI_SELECT_CATEGORIES.SELECTED,
  ) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: item, category });
    setInputValue('');
  };

  const handleItemRemove = (
    item,
    category = MULTI_SELECT_CATEGORIES.SELECTED,
  ) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: item, category });
  };

  const populatePreselectedValues = useCallback((items) => {
    dispatch({ type: ACTIONS.POPULATE_PRESELECTED_ITEMS, payload: items });
  }, []);

  const removePreselectedItems = useCallback(() => {
    dispatch({ type: ACTIONS.REMOVE_PRESELECTED_ITEMS });
  }, []);

  return {
    inputValue,
    items,
    populatePreselectedValues,
    removePreselectedItems,
    handleItemSelect,
    handleItemRemove,
    onInputChange,
  };
};
