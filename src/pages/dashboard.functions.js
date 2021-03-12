const toHtml = () => {
    return `
        <li class="db__record">
            <a href="#">Название таблицы</a>
            <span>Дата</span>
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
    console.log(keys);
    if (!keys.length) {
        return `<p>Вы пока не создали ни одной таблицы</p>`;
    }
    return `
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>
        <ul class="db__list">
            ${keys.map(toHtml).join('')}
        </ul>
    `;
};
