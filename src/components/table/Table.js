import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
// import {$} from '../../core/dom';
import {resizeHandler} from './table.resize';
import {shouldResize} from './table.functions';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            name: 'table',
            listeners: ['mousedown']
        });
    }
    
    toHTML() {
        return createTable(20);
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event);
        }
    }
}
