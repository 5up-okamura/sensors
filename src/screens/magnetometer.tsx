// https://docs.expo.io/versions/v41.0.0/sdk/magnetometer/

import React, { useState } from 'react'
import { Text } from 'react-native'
import { Magnetometer } from 'expo-sensors'
import { Template } from './template'
import Socket from '../socket'

export default function MagnetometerScreen() {
  const socket = React.useRef<any>()
  const [data, setData] = useState({ x: 0, y: 0, z: 0 })
  const { x, y, z } = data

  const _subscribe = () =>
    Magnetometer.addListener((result) => {
      setData(result)
    })

  const _setUpdateInterval = (interval: number) =>
    Magnetometer.setUpdateInterval(interval)

  // Send message
  socket.current?.send({ id: 'mag', ...data })

  return (
    <Template subscribe={_subscribe} setUpdateInterval={_setUpdateInterval}>
      <Socket ref={socket} />
      <Text>Magnetometer:</Text>
      <Text>{`x: ${round(x)}\n\ny: ${round(y)}\n\nz: ${round(z)}`}</Text>
    </Template>
  )
}

const round = (v: number) => Math.round(v * 1000) / 1000
