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
        const resizeType = event.target.dataset.resize;
        if (resizeType) {
            const $resizer = $(event.target);
            const $parent = $resizer.closest('[data-type="resizable"]');
            const coords = $parent.getCoords();
            let value = 0;

            const siseProp = resizeType === 'col' ? 'bottom' : 'right';
            $resizer.css({opacity: 1, [siseProp]: '-5000px'});

            document.onmousemove = (e) => {
                if (resizeType === 'col') {
                    const delta = e.pageX - coords.right;
                    value = (coords.width + delta) + 'px';
                    $resizer.css({right: -delta + 'px'});
                } else {
                    const delta = e.pageY - coords.bottom;
                    value = (coords.height + delta) + 'px';
                    $resizer.css({bottom: -delta + 'px'});
                }
            };

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;

                if (resizeType === 'col') {
                    $parent.css({width: value});
                    this.$root
                        .findAll(`.cell[data-col="${$parent.data.col}"]`)
                        .forEach(el => el.style.width = value);
                } else {
                    $parent.css({height: value});
                }

                $resizer.css({opacity: '', bottom: '0', right: '0'});
            };
        }
    }
}
