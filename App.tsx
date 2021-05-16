import React from 'react'
import { StatusBar } from 'expo-status-bar'
import AppNavigator from './src/navigation'
import { Provider } from './src/context'

export default function App() {
  return (
    <Provider>
      <StatusBar />
      <AppNavigator />
    </Provider>
  )
}
