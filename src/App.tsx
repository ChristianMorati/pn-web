import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store';
import RootNavigator from './router/RootNavigator';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ToastContainer />
    </Provider>
  );
};

export default App;
