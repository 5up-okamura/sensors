import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import TopScreen from './screens/top'
import AccelerometerScreen from './screens/accelerometer'
import AudioMeteringScreen from './screens/audioMetering'
import BarCodeScannerScreen from './screens/barCodeScanner'
import BarometerScreen from './screens/barometer'
import DeviceMotionScreen from './screens/deviceMotion'
import FaceDetectorScreen from './screens/faceDetector'
import GyroscopeScreen from './screens/gyroscope'
import MagnetometerScreen from './screens/magnetometer'
import PedometerScreen from './screens/pedometer'

const App = createStackNavigator()
const AppNavigator = () => (
  <NavigationContainer>
    <App.Navigator>
      <App.Screen name="Sensors" component={TopScreen} />
      <App.Screen name="Accelerometer" component={AccelerometerScreen} />
      <App.Screen name="AudioMetering" component={AudioMeteringScreen} />
      <App.Screen name="BarCodeScanner" component={BarCodeScannerScreen} />
      <App.Screen name="Barometer" component={BarometerScreen} />
      <App.Screen name="DeviceMotion" component={DeviceMotionScreen} />
      <App.Screen name="FaceDetector" component={FaceDetectorScreen} />
      <App.Screen name="Gyroscope" component={GyroscopeScreen} />
      <App.Screen name="Magnetometer" component={MagnetometerScreen} />
      <App.Screen name="Pedometer" component={PedometerScreen} />
    </App.Navigator>
  </NavigationContainer>
)

export default AppNavigator
