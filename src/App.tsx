import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PrivateRoute from './components/private-route';
import { store } from './store';
import HomeScreen from './pages/home';
import AuthScreen from './pages/LoginScreen';
import MyTransactionsScreen from './pages/my-transactions';
import NotFoundScreen from './pages/not-founded';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthScreen />
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomeScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-transactions"
            element={
              <PrivateRoute>
                <MyTransactionsScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-transactions"
            element={
              <PrivateRoute>
                <MyTransactionsScreen />
              </PrivateRoute>
            }
          />
          <Route path="*" element={
            <NotFoundScreen />
          } />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
