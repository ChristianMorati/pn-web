import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store';
import RootNavigator from './router/RootNavigator';
import 'react-toastify/dist/ReactToastify.css';
import { themeColors } from './theme/colors';

const App = () => {
  return (
    <div style={{ backgroundColor: themeColors.basePage }} className='h-[100vh]'>
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
    </div>
  );
};

export default App;
