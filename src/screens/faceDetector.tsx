// https://docs.expo.io/versions/v41.0.0/sdk/facedetector/

import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Camera, FaceDetectionResult } from 'expo-camera'
import * as FaceDetector from 'expo-face-detector'
import { View, Text } from 'react-native-ui-lib'
import { Template2, INTERVAL_FAST } from './template'
import Socket from '../socket'
import _ from 'lodash'

export default function FaceDetectorScreen() {
  const socket = React.useRef<any>()
  const [subscribed, setSubscribed] = useState(true)
  const [updateInterval, setUpdateInterval] = useState(INTERVAL_FAST)
  const [result, setResult] = useState<FaceDetectionResult>()

  const _requestPermissions = async () =>
    new Promise<boolean>(async (resolve, _) => {
      const { status } = await Camera.requestPermissionsAsync()
      resolve(status == 'granted')
    })

  const _onDetected = (newResult: FaceDetectionResult) => {
    if (!_.isEqual(result, newResult)) {
      setResult(newResult)
    }
  }

  const facesInfo = (result?.faces || [])
    .map((v, i) => `face${i + 1}: ${JSON.stringify(v)}\n`)
    .join('\n')

  // Send message
  if (result?.faces.length) {
    socket.current?.send({ id: 'fac', faces: result.faces })
  }

  return (
    <Template2
      requestPermissions={_requestPermissions}
      subscribed={subscribed}
      setSubscribed={setSubscribed}
      setUpdateInterval={setUpdateInterval}
      render={<Text>{facesInfo}</Text>}
    >
      <Camera
        style={StyleSheet.absoluteFillObject}
        type="front"
        onFacesDetected={subscribed ? _onDetected : undefined}
        faceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.fast,
          detectLandmarks: FaceDetector.Constants.Landmarks.none,
          runClassifications: FaceDetector.Constants.Classifications.all,
          minDetectionInterval: updateInterval,
          tracking: false,
        }}
      />
      <View margin-8>
        <Socket ref={socket} />
      </View>
    </Template2>
  )
}
