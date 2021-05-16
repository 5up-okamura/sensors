// https://docs.expo.io/versions/v41.0.0/sdk/accelerometer/

import React, { useState } from 'react'
import { Text } from 'react-native-ui-lib'
import { Accelerometer } from 'expo-sensors'
import { Template } from './template'
import Socket from '../socket'

export default function AccelerometerScreen() {
  const socket = React.useRef<any>()
  const [data, setData] = useState({ x: 0, y: 0, z: 0 })
  const { x, y, z } = data

  const _subscribe = () =>
    Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData)
    })

  const _setUpdateInterval = (interval: number) =>
    Accelerometer.setUpdateInterval(interval)

  // Send message
  socket.current?.send(JSON.stringify(data))

  return (
    <Template subscribe={_subscribe} setUpdateInterval={_setUpdateInterval}>
      <Socket ref={socket} />
      <Text>{'Accelerometer:\n(in Gs where 1 G = 9.81 m s^-2)'}</Text>
      <Text>{`x: ${round(x)}\n\ny: ${round(y)}\n\nz: ${round(z)}`}</Text>
    </Template>
  )
}

const round = (v: number) => Math.round(v * 1000) / 1000
