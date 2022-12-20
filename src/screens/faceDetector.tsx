// https://docs.expo.dev/versions/latest/sdk/facedetector/

import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Camera, CameraType, FaceDetectionResult } from 'expo-camera'
import * as FaceDetector from 'expo-face-detector'
import { View, Text } from 'react-native'
import { Template2, INTERVAL_FAST } from './template'
import { Button } from '../components/button'
import Socket from '../socket'
import _ from 'lodash'

export default function FaceDetectorScreen() {
  const socket = React.useRef<any>()
  const [subscribed, setSubscribed] = useState(true)
  const [updateInterval, setUpdateInterval] = useState(INTERVAL_FAST)
  const [result, setResult] = useState<FaceDetectionResult>()
  const [type, setType] = useState<CameraType>(CameraType.front)

  const _requestPermissions = async () =>
    new Promise<boolean>(async (resolve, _) => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      resolve(status == 'granted')
    })

  const _onDetected = (newResult: FaceDetectionResult) => {
    if (!_.isEqual(result, newResult)) {
      setResult(newResult)
    }
  }

  const _onPressFront = () => {
    setType(CameraType.front)
  }

  const _onPressBack = () => {
    setType(CameraType.back)
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
        type={type}
        onFacesDetected={subscribed ? _onDetected : undefined}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: updateInterval,
          tracking: false,
        }}
      />
      <View style={{ margin: 8 }}>
        <Socket ref={socket} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button title="Front" onPress={_onPressFront} />
        <Button title="Back" onPress={_onPressBack} />
      </View>
    </Template2>
  )
}
