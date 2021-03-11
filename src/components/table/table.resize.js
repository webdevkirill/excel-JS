import {$} from '../../core/dom';

export const resizeHandler = ($root, event) => {
    return new Promise((resolve) => {
        const $resizer = $(event.target);
        const $parent = $resizer.closest('[data-type="resizable"]');
        const coords = $parent.getCoords();
        let value = 0;
        const resizeType = $resizer.data.resize;

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
                $root
                    .findAll(`.cell[data-col="${$parent.data.col}"]`)
                    .forEach(el => el.style.width = value);
            } else {
                $parent.css({height: value});
            }

            resolve({
                value,
                id: resizeType === 'col' ? $parent.data.col : null
            });

            $resizer.css({opacity: '', bottom: '0', right: '0'});
        };
    });
};
