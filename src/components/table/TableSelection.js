
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
        this.group.push($el);
        $el.addClass(TableSelection.className);
        this.current = $el;
    }

    selectGroup($group = []) {
        this.clearGroup();
        this.group = $group;
        this.group.forEach($el => $el.addClass(TableSelection.className));
    }
}
