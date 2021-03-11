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
            listeners: ['mousedown', 'keydown'],
            ...options
        });
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        
        const $cell = this.$root.find('[data-id="0:0"]');
        this.selection.select($cell);

        this.$on('formula:input', (text) => {
            this.selection.current.text(text);
        });

        this.$on('formula:unfocus', () => {
            this.selection.current.focus();
        });
    }
    
    toHTML() {
        return createTable(Table.rowNumber);
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event);
        } else if (isCell(event)) {
            const $target = $(event.target);

            if (event.shiftKey) {
                const $cells = idMatrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`));

                this.selection.selectGroup($cells);
            } else {
                this.selection.select($target);
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
            this.selection.select($cell);
        }
    }
}
