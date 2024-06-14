import './App.css';
import RootNavigator from './router/RootNavigator';
import { store } from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </div>
  );
}

export default App;
