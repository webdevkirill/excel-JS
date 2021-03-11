import './sass/index.sass';
import {createStore} from './core/createStore';
import {storage} from './core/utils';
import {rootReducer} from './redux/rootReducer';
import {initialState} from './redux/initialState';
import {Excel} from './components/excel/Excel';
import {Header} from './components/header/Header';
import {Toolbar} from './components/toolbar/Toolbar';
import {Formula} from './components/formula/Formula';
import {Table} from './components/table/Table';

const store = createStore(rootReducer, initialState);

store.subscribe(state => {
    console.log('upState', state);
    storage('excel-state', state);
});

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
});

excel.render();
