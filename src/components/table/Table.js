import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '../../core/dom';

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
        if (event.target.dataset.resize) {
            const $resizer = $(event.target);
            const $parent = $resizer.closest('[data-type="resizable"]');
            const coords = $parent.getCoords();

            document.onmousemove = (e) => {
                const width = coords.width + (e.pageX - coords.right);
                $parent.width(width);
            };

            document.onmouseup = () => {
                document.onmousemove = null;
            };
        }
    }
}
