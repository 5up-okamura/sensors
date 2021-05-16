// https://docs.expo.io/versions/v41.0.0/sdk/pedometer/

import React, { useState } from 'react'
import { Text } from 'react-native-ui-lib'
import { Pedometer } from 'expo-sensors'
import { Template } from './template'
import Socket from '../socket'

export default function PedometerScreen() {
  const socket = React.useRef<any>()
  const [available, setAvailable] = useState('checking')
  const [pastStepCount, setPastStepCount] = useState<number | string>(0)
  const [stepCount, setStepCount] = useState(0)

  const _subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      setStepCount(result.steps)
    })

    Pedometer.isAvailableAsync().then(
      (result) => {
        setAvailable(`${result}`)
      },
      (error) => {
        setAvailable(`Could not get isPedometerAvailable: ${error}`)
      }
    )

    const end = new Date()
    const start = new Date()
    start.setDate(end.getDate() - 1)
    Pedometer.getStepCountAsync(start, end).then(
      (result) => {
        setPastStepCount(result.steps)
      },
      (error) => {
        setPastStepCount(`Could not get stepCount: ${error}`)
      }
    )

    return subscription
  }

  // Send message
  socket.current?.send(JSON.stringify({ pastStepCount }))

  return (
    <Template subscribe={_subscribe}>
      <Socket ref={socket} />
      <Text>Pedometer.isAvailableAsync(): {available}</Text>
      <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
      <Text>Walk! And watch this go up: {stepCount}</Text>
    </Template>
  )
}
