import { createStore, Store } from 'redux';
import reducer from './reducers/reducer';

const store: Store = createStore(reducer);

export default store;
