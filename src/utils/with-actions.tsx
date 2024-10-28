import React, { Dispatch, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

type WithActionProps<P = unknown> = P

let cachedActions: Actions | null = null

const loadActions = async () => {
  if (cachedActions) return cachedActions

  try {
    const actionsModule = await import('container/actions')
    cachedActions = actionsModule.default
    return actionsModule.default
  } catch (error) {
    console.error('Failed to load actions:', error)
    return {}
  }
}

export interface IWithActions {
  actions?: Actions
  dispatch?: Dispatch<unknown>
}

const withActions = <P extends object>(
  WrappedComponent: React.ComponentType<WithActionProps<P>>,
) => {
  const WithActions: React.FC<IWithActions & WithActionProps<P>> = (props) => {
    const [actions, setActions] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
      const fetchActions = async () => {
        const loadedActions = await loadActions()
        setActions(loadedActions)
      }
      fetchActions()
    }, [])

    if (Object.keys(actions).length === 0) return

    return (
      <WrappedComponent
        {...(props as P)}
        actions={actions}
        dispatch={dispatch}
      />
    )
  }

  return WithActions
}

export default withActions
