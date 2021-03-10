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
            const cells = this.$root.findAll(`.cell[data-col="${$parent.data.col}"]`);

            document.onmousemove = (e) => {
                const width = coords.width + (e.pageX - coords.right);
                $parent.width(width);
                cells.forEach(el => el.style.width = width + 'px');
            };

            document.onmouseup = () => {
                document.onmousemove = null;
            };
        }
    }
}
