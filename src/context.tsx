import React from 'react'

type State = {
  address: string
}

type Action = {
  type: ActionType
  payload: State
}

type ActionType = 'SET_ADDRESS'

type ContextType = {
  state: State
  dispatch: React.Dispatch<Action>
}

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'SET_ADDRESS':
      const { address } = action.payload
      return { ...state, address }
    default:
      throw new Error()
  }
}

const initialState: State = { address: '' }

export const Context = React.createContext({} as ContextType)
const { Provider: Provider_ } = Context

type Props = {
  children: React.ReactNode
}

export const Provider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return <Provider_ value={{ state, dispatch }}>{children}</Provider_>
}
