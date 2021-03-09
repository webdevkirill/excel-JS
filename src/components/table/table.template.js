const CODES = {
    A: 65,
    Z: 90
};

const createCol = (col) => {
    return `
        <div class="column" data-type="resizable">
            ${col}
            <div class="column-resize" data-resize="col"></div>
        </div>
    `;
};

const createCell = () => {
    return `
        <div class="cell contenteditable"></div>
    `;
};

const createRow = (content, rowIndex = '') => {
    const resize = rowIndex ? '<div class="row-resize" data-resize="row"></div>' : '';
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${rowIndex}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
};

const createChar = (index) => String.fromCharCode(CODES.A + index);

export const createTable = (rowsCount = 15) => {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map((_, index) => createCol(createChar(index)))
        .join('');

    rows.push(createRow(cols));

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell)
            .join('');
        rows.push(createRow(cells, i + 1));
    }

    return rows.join('');
};
