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

            if ($resizer.data.resize === 'col') {
                const cells = this.$root.findAll(`.cell[data-col="${$parent.data.col}"]`);

                document.onmousemove = (e) => {
                    const width = (coords.width + (e.pageX - coords.right)) + 'px';
                    $parent.css({width});
                    cells.forEach(el => el.style.width = width);
                };
            } else {
                document.onmousemove = (e) => {
                    const height = (coords.height + (e.pageY - coords.bottom)) + 'px';
                    $parent.css({height});
                };
            }

            document.onmouseup = () => {
                document.onmousemove = null;
            };
        }
    }
}
