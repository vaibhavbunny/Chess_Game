
import './App.css';
import Board from './components/board/Board';
import { AppContext } from './context/context';
import { useReducer } from 'react';
import { initGameState } from './constant';
import { reducer } from './reducer/reducer';

function App() {

  const [appState,dispatch]=useReducer(reducer,initGameState);

  const providerState={
    appState,
    dispatch
  }
  return (
    <AppContext.Provider value={providerState}>
    <div className="App">
      <Board/>
    </div>
    </AppContext.Provider>
  );
}

export default App;
