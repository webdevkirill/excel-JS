import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE} from './types';

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
