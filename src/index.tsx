import ReactDOM from 'react-dom/client'
import App from '~/App'
import { Provider } from 'react-redux'

const loadStore = async () => {
  const storeModule = await import('container/store')
  return storeModule.default
}

const store = loadStore()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

store.then((actualStore) =>
  root.render(
    <Provider store={actualStore}>
      <App />
    </Provider>,
  ),
)
