import {range} from '../../core/utils';
import {Table} from './Table';

export const shouldResize = (event) => event.target.dataset.resize;

export const isCell = (event) => event.target.dataset.type === 'cell';

export const idMatrix = ($target, $current) => {
    const target = $target.id(true);
    const current = $current.id(true);
    const cols = range(current.col, target.col);
    const rows = range(current.row, target.row);

    return rows.reduce((acc, row) => {
        cols.forEach(col => acc.push(`${row}:${col}`));
        return acc;
    }, []);
};

const checkBounds = (row, col) => {
    const rowNumber = Table.rowNumber;
    const colNumber = Table.colNumber;
    if (row < 0) {
        row = 0;
    } else if (row > rowNumber - 1) {
        row = rowNumber - 1;
    }

    if (col < 0) {
        col = 0;
    } else if (col > colNumber - 1) {
        col = colNumber - 1;
    }

    return {
        row, col
    };
};

export const keyNavigationHandlers = (selection) => {
    const {row, col} = selection.id(true);
    
    return {
        'ArrowUp': checkBounds(row - 1, col),
        'ArrowLeft': checkBounds(row, col - 1),
        'ArrowDown': checkBounds(row + 1, col),
        'ArrowRight': checkBounds(row, col + 1),
        'Tab': checkBounds(row, col + 1),
        'Enter': checkBounds(row + 1, col)
    };
};
