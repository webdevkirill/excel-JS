import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shouldResize, isCell, idMatrix, keyNavigationHandlers} from './table.functions';
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent {
    static className = 'excel__table';
    static rowNumber = 20;
    static colNumber = 26;

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        
        this.selectSell(this.$root.find('[data-id="0:0"]'));

        this.$on('formula:input', (text) => {
            this.selection.current.text(text);
        });

        this.$on('formula:unfocus', () => {
            this.selection.current.focus();
        });

        this.$subscribe(state => {
            console.log('tablestate', state);
        });
    }
    
    toHTML() {
        return createTable(Table.rowNumber);
    }

    selectSell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
        this.$dispatch({type: 'TEST'});
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event);
            this.$dispatch({type: 'TABLE_RESIZE', data});
        } catch (e) {
            console.error('Resize error:' + e.message);
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event);
        } else if (isCell(event)) {
            const $target = $(event.target);

            if (event.shiftKey) {
                const $cells = idMatrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`));

                this.selection.selectGroup($cells);
            } else {
                this.selectSell($target);
            }
        }
    }

    onKeydown(event) {
        const {key} = event;
        const keyNavigation = keyNavigationHandlers(this.selection.current);
        if (Object.keys(keyNavigation).includes(key) && !event.shiftKey) {
            event.preventDefault();
            const {row, col} = keyNavigation[key];

            const $cell = this.$root.find(`[data-id="${row}:${col}"]`);
            this.selectSell($cell);
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target));
    }
}
