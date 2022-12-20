// https://docs.expo.dev/versions/latest/sdk/barometer/

import React, { useState } from 'react'
import { Platform, Text } from 'react-native'
import { Barometer, BarometerMeasurement } from 'expo-sensors'
import { Template } from './template'
import Socket from '../socket'

export default function BarometerScreen() {
  const socket = React.useRef<any>()
  const [data, setData] = useState<BarometerMeasurement>({
    pressure: 0,
    relativeAltitude: 0,
  })
  const { pressure, relativeAltitude } = data

  const _subscribe = () =>
    Barometer.addListener((barometerData) => {
      setData(barometerData)
    })

  const _setUpdateInterval = (interval: number) =>
    Barometer.setUpdateInterval(interval)

  // Send message
  socket.current?.send({ id: 'bro', ...data })

  return (
    <Template subscribe={_subscribe} setUpdateInterval={_setUpdateInterval}>
      <Socket ref={socket} />
      <Text>Barometer:</Text>
      <Text>Pressure: {pressure * 100} Pa</Text>
      <Text>
        Relative Altitude:{' '}
        {Platform.OS == 'ios'
          ? `${relativeAltitude} m`
          : `Only available on iOS`}
      </Text>
    </Template>
  )
}
