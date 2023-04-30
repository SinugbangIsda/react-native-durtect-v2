import { Provider } from 'react-redux';
import { GlobalProvider } from './context/Global';
import Routes from './routes';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store = { store }>
      <GlobalProvider>
        <Routes />
      </GlobalProvider>
    </Provider>
  )
}

export default App;