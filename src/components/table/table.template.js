import {defaultStyles} from '../../constans';
import {camelCaseToDashCase} from '../../core/utils';

const CODES = {
    A: 65,
    Z: 90
};

const createCol = (col, index, width) => {
    return `
        <div 
            class="column" 
            data-type="resizable" 
            data-col="${index}" 
            style="width: ${width}"
        >
            ${col}
            <div class="column-resize" data-resize="col"></div>
        </div>
    `;
};

const getMeasure = (state = {}, index) => state[index] || '';

const createCell = (state, row) => {
    return (_, col) => {
        const storeCellText = state.dataState[`${row}:${col}`] || '';
        const styles = 
            Object.keys(defaultStyles)
                .map(key => `${camelCaseToDashCase(key)}: ${defaultStyles[key]}`)
                .join(';');
        return `
            <div class="cell" 
                contenteditable
                data-col="${col}" 
                data-id="${row}:${col}"
                data-type="cell"
                style="${styles};width: ${getMeasure(state.colState, col)}"
            >
                ${storeCellText}
            </div>
        `;
    };
};

const createRow = (content, rowIndex = '', height) => {
    const resize = rowIndex ? '<div class="row-resize" data-resize="row"></div>' : '';
    return `
        <div 
            class="row" 
            data-type="resizable" 
            data-row="${rowIndex}"
            style="height: ${height}"
        >
            <div class="row-info">
                ${rowIndex}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
};

const createChar = (index) => String.fromCharCode(CODES.A + index);

export const createTable = (rowsCount = 15, state = {}) => {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map((_, index) => createCol(createChar(index), index, getMeasure(state.colState, index)))
        .join('');

    rows.push(createRow(cols, '', ''));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell(state, row))
            .join('');
        rows.push(createRow(cells, row + 1, getMeasure(state.rowState, row + 1)));
    }

    return rows.join('');
};
