import {storage} from '../core/utils';

const toHtml = (key) => {
    const {tableName, lastOpen} = storage(key);
    const id = +key.split(':')[1];
    return `
        <li class="db__record">
            <a href="#excel/${id}">${tableName}</a>
            <span>
                ${new Date(+lastOpen).toLocaleDateString()}
                ${new Date(+lastOpen).toLocaleTimeString()}
            </span>
        </li>
    `;
};

const getAllKeys = () => {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.includes('excel')) {
            continue;
        }
        keys.push(key);
    }
    return keys;
};

export const createRecordsTable = () => {
    const keys = getAllKeys();
    if (!keys.length) {
        return `<p>Вы пока не создали ни одной таблицы</p>`;
    }
    const tableList = keys
        .sort((a, b) => storage(b).lastOpen - storage(a).lastOpen)
        .map(toHtml)
        .join('');
    return `
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата просмотра</span>
        </div>
        <ul class="db__list">
            ${tableList}
        </ul>
    `;
};
