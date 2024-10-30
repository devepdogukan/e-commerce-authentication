import { act, render, RenderResult } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'
import { ContainerStore } from '~/types/store'
import { thunk } from 'redux-thunk'

const mockStore = configureStore<Partial<ContainerStore>, unknown>([
  thunk as never,
])

interface RenderWithReduxOptions {
  initialState?: Partial<ContainerStore>
  store?: MockStoreEnhanced<Partial<ContainerStore>, unknown>
}

type ReturnRedux = RenderResult & { store: RenderWithReduxOptions['store'] }

const renderWithRedux = async (
  ui: React.ReactElement,
  {
    initialState,
    store = mockStore(initialState),
  }: RenderWithReduxOptions = {},
): Promise<ReturnRedux> => {
  let rendered: RenderResult | object = {}

  await act(async () => {
    rendered = render(<Provider store={store}>{ui}</Provider>)
  })

  return {
    ...rendered,
    store,
  } as ReturnRedux
}

export default renderWithRedux
