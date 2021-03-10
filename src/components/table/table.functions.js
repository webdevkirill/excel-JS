import {range} from '../../core/utils';

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
