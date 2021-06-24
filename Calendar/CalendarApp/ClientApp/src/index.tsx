import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import Calendar from './Pages/calendar';
import store from './Store/configureStore';
import { Toaster } from 'react-hot-toast';

import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <Calendar />
    <Toaster />
  </Provider>,
  rootElement
);
