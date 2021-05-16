// https://docs.expo.io/versions/v41.0.0/sdk/devicemotion/

import React, { useState } from 'react'
import { DeviceMotion, DeviceMotionMeasurement } from 'expo-sensors'
import { Text } from 'react-native-ui-lib'
import { Template } from './template'
import Socket from '../socket'

export default function DeviceMotionScreen() {
  const socket = React.useRef<any>()
  const [measurement, setMeasurement] = useState<DeviceMotionMeasurement>()

  const _subscribe = () =>
    DeviceMotion.addListener((result) => {
      setMeasurement(result)
    })

  const _setUpdateInterval = (interval: number) =>
    DeviceMotion.setUpdateInterval(interval)

  const acceleration = measurement?.acceleration
  const accelerationIncludingGravity = measurement?.accelerationIncludingGravity
  const orientation = measurement?.orientation
  const rotation = measurement?.rotation

  // Send message
  socket.current?.send(JSON.stringify(measurement))

  return (
    <Template subscribe={_subscribe} setUpdateInterval={_setUpdateInterval}>
      <Socket ref={socket} />
      <Text>DeviceMotion</Text>
      <Text>{`acceleration:\n\nx: ${round(acceleration?.x)}\n\ny: ${round(
        acceleration?.y
      )}\n\nz: ${round(acceleration?.z)}`}</Text>
      <Text>{`accelerationIncludingGravity:\n\nx: ${round(
        accelerationIncludingGravity?.x
      )}\n\ny: ${round(accelerationIncludingGravity?.y)}\n\nz: ${round(
        accelerationIncludingGravity?.z
      )}`}</Text>
      <Text>{`orientation: ${orientation}`}</Text>
      <Text>{`rotation:\n\ngamma: ${round(rotation?.gamma)}\n\nbeta: ${round(
        rotation?.beta
      )}\n\nalpha: ${round(rotation?.alpha)}`}</Text>
    </Template>
  )
}

const round = (v?: number) => (v ? Math.round(v * 1000) / 1000 : 0)
