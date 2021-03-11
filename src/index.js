import './sass/index.sass';
import {createStore} from './core/createStore';
import {rootReducer} from './redux/rootReducer';
import {Excel} from './components/excel/Excel';
import {Header} from './components/header/Header';
import {Toolbar} from './components/toolbar/Toolbar';
import {Formula} from './components/formula/Formula';
import {Table} from './components/table/Table';

const store = createStore(rootReducer, {
    colState: {}
});

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
});

excel.render();
