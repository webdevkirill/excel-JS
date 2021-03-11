import {$} from '../../core/dom';
import {ExcelComponent} from '../../core/ExcelComponent';
import {changeTableName} from '../../redux/actions';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        });
    }
    
    toHTML() {
        const tableName = this.store.getState().tableName;
        return `
            <input type="text" class="input" value="${tableName}" >
            <div>
                <div class="button">
                    <i class="material-icons">delete</i>
                </div>
                <div class="button">
                    <i class="material-icons">exit_to_app</i>
                </div>
            </div>
        `;
    }

    onInput(event) {
        const $target = $(event.target);
        this.$dispatch(changeTableName($target.inputValue()));
    }
}
