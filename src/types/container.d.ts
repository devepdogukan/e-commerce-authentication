type Reducers = 'product' | 'basket' | 'auth' | 'order'

declare module 'container/store' {
  import { TypedUseSelectorHook } from 'react-redux'
  import { useAppDispatch, useAppSelector } from 'container/store'
  import type { RootState } from 'container/store'

  export const useAppDispatch: () => AppDispatch
  export const useAppSelector: TypedUseSelectorHook<RootState>
  export default store
}

type Actions = Record<Reducers, Record<string, (...prop: unknown) => void>>

declare module 'container/actions' {
  const actions: Actions
  export default actions
}

declare module 'container/selectors' {
  const selectors: Record<
    Reducers,
    Record<string, (state: RootState) => unknown>
  >
  export default selectors
}
