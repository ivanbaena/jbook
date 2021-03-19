import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';
import CellList from './components/cell-list';
import CellListItem from './components/cell-listitem';
import { store } from './state';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
