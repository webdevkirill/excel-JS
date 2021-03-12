import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE, CHANGE_TABLE_NAME} from './types';

export const tableResize = (data) => {
    return {
        type: TABLE_RESIZE,
        data
    };
};

export const changeText = (data) => {
    return {
        type: CHANGE_TEXT,
        data
    };
};

export const changeStyles = (data) => {
    return {
        type: CHANGE_STYLES,
        data
    };
};

export const applyStyle = (data) => {
    return {
        type: APPLY_STYLE,
        data
    };
};

export const changeTableName = (data) => {
    return {
        type: CHANGE_TABLE_NAME,
        data
    };
};
