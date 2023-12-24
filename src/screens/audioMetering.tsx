// https://docs.expo.dev/versions/latest/sdk/audio/

import React, { useState } from 'react'
import { Text } from 'react-native'
import { Audio } from 'expo-av'
import { Template } from './template'
import Socket from '../socket'

let recording: Audio.Recording | undefined

export default function AccelerometerScreen() {
  const socket = React.useRef<any>()
  const [data, setData] = useState({ metering: 0 })
  const { metering } = data

  const _subscribe = () => {
    return {
      remove: () => {},
    }
  }

  React.useEffect(() => {
    ;(async () => {
      const setTimeoutAsync = (ms: number) =>
        new Promise((resolve) => setTimeout(() => resolve(true), ms))
      try {
        const res = await Audio.requestPermissionsAsync()
        if (!res.granted) alert('Audio permissions are not granted.')
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        })
        setTimeoutAsync(500)
        const { recording: rec } = await Audio.Recording.createAsync(
          {
            ...Audio.RecordingOptionsPresets.LOW_QUALITY,
            isMeteringEnabled: true,
          },
          (status) => {
            setData({ metering: status.metering || 0 })
          }
        )
        recording = rec
        await recording.startAsync()
      } catch (e) {
        console.log(e)
      }
    })()
    return () => {
      ;(async () => {
        await recording?.stopAndUnloadAsync()
        await Audio.setAudioModeAsync({ allowsRecordingIOS: false })
        recording = undefined
      })()
    }
  }, [])

  // Send message
  socket.current?.send({ id: 'aud', ...data })

  return (
    <Template subscribe={_subscribe}>
      <Socket ref={socket} />
      <Text>{`Audio Metering: ${round(metering)}`}</Text>
    </Template>
  )
}

const round = (v: number) => Math.round(v * 1000) / 1000
