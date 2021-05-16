// https://docs.expo.io/versions/v41.0.0/sdk/bar-code-scanner/

import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from 'react-native-ui-lib'
import { BarCodeScanner, BarCodeEvent } from 'expo-barcode-scanner'
import { Template2 } from './template'
import Socket from '../socket'
import _ from 'lodash'

export default function BarCodeScannerScreen() {
  const socket = React.useRef<any>()
  const [subscribed, setSubscribed] = useState(true)
  const [result, setResult] = useState<string>()

  const _requestPermissions = async () =>
    new Promise<boolean>(async (resolve, _) => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      resolve(status == 'granted')
    })

  const _onDetected = (event: BarCodeEvent) => {
    if (!_.isEqual(result, event.data)) {
      setResult(event.data)
    }
  }

  // Send message
  socket.current?.send(result)

  return (
    <Template2
      requestPermissions={_requestPermissions}
      subscribed={subscribed}
      setSubscribed={setSubscribed}
      render={<Text>{result}</Text>}
    >
      <BarCodeScanner
        onBarCodeScanned={subscribed ? _onDetected : undefined}
        style={StyleSheet.absoluteFillObject}
      />
      <View padding-8>
        <Socket ref={socket} />
      </View>
    </Template2>
  )
}
