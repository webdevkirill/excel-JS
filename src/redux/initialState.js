import {defaultStyles, defaultTableName} from '../constants';
import {clone} from '../core/utils';

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles,
    tableName: defaultTableName
};

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
});

export const normalizeInitialState = state => {
    return state ? normalize(state) : clone(defaultState);
};
