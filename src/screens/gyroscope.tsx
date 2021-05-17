// https://docs.expo.io/versions/v41.0.0/sdk/gyroscope/

import React, { useState } from 'react'
import { Text } from 'react-native-ui-lib'
import { Gyroscope } from 'expo-sensors'
import { Template } from './template'
import Socket from '../socket'

export default function GyroscopeScreen() {
  const socket = React.useRef<any>()
  const [data, setData] = useState({ x: 0, y: 0, z: 0 })
  const { x, y, z } = data

  const _subscribe = () =>
    Gyroscope.addListener((gyroscopeData) => {
      setData(gyroscopeData)
    })

  const _setUpdateInterval = (interval: number) =>
    Gyroscope.setUpdateInterval(interval)

  // Send message
  socket.current?.send({ gyr: { ...data } })

  return (
    <Template subscribe={_subscribe} setUpdateInterval={_setUpdateInterval}>
      <Socket ref={socket} />
      <Text>Gyroscope:</Text>
      <Text>{`x: ${round(x)}\n\ny: ${round(y)}\n\nz: ${round(z)}`}</Text>
    </Template>
  )
}

const round = (v: number) => Math.round(v * 1000) / 1000
