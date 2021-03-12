
export class TableSelection {
    static className = 'selected';

    constructor() {
        this.group = [];
        this.current = null;
    }

    clearGroup() {
        if (this.group.length > 0) {
            this.group.forEach(($cell) => $cell.removeClass(TableSelection.className));
            this.group = [];
        }
    }

    select($el) {
        this.clearGroup();
        $el
            .addClass(TableSelection.className)
            .focus();
        this.group.push($el);
        this.current = $el;
    }

    selectGroup($group = []) {
        this.clearGroup();
        this.group = $group;
        this.group.forEach($el => $el.addClass(TableSelection.className));
    }

    applyStyle(style) {
        this.group.forEach($el => $el.css(style));
    }

    get selectedIds() {
        return this.group.map($el => $el.id());
    }
}
