const CODES = {
    A: 65,
    Z: 90
};

const createCol = (col) => {
    return `
        <div class="column">${col}</div>
    `;
};

const createCell = () => {
    return `
        <div class="cell contenteditable"></div>
    `;
};

const createRow = (content) => {
    return `
        <div class="row">
            <div class="row-info"></div>
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
        rows.push(createRow(cells));
    }

    return rows.join('');
};
