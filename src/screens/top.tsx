import React, { memo } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StackScreenProps } from '@react-navigation/stack'
import { Context } from '../context'

const TopScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { bottom: paddingBottom } = useSafeAreaInsets()
  const { state, dispatch } = React.useContext(Context)

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: 'Sensors (2022/12/19)' })
  }, [])

  const onPress = (title: string) => navigation.navigate(title)

  const setAddress = (address: string) => {
    dispatch({ type: 'SET_ADDRESS', payload: { address } })
  }

  return (
    <View style={{ flex: 1, paddingBottom }}>
      <Bar address={state.address} setAddress={setAddress} />
      <FlatList
        data={items}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <List title={item} onPress={onPress} />}
        keyboardDismissMode="on-drag"
      />
    </View>
  )
}

/**
 * Bar
 */
type BarProps = {
  address: string
  setAddress: (address: string) => void
}

const Bar: React.FC<BarProps> = memo(({ address, setAddress }) => (
  <View style={styles.separator}>
    <Text>IP Address</Text>
    <TextInput
      style={{ marginTop: 5 }}
      placeholder="( 192.168.1.1 )"
      value={address}
      onChangeText={setAddress}
    />
  </View>
))

/**
 * List
 */
type ListProps = {
  title: string
  onPress: (title: string) => void
}

const List: React.FC<ListProps> = memo(({ title, onPress }) => {
  const id = React.useMemo(() => {
    return title.split('/')[0].trim()
  }, [title])

  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <View style={[styles.separator, styles.list]}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  )
})

/**
 * Items
 */
const items: string[] = [
  'Accelerometer / 加速度',
  'AudioMetering / 音量',
  'BarCodeScanner / バーコード',
  'Barometer / 気圧',
  'DeviceMotion / モーション',
  'FaceDetector / 顔認識',
  'Gyroscope / 3軸ジャイロ',
  'Magnetometer / 磁力',
  'Pedometer / 歩数',
]

/**
 * Styles
 */
const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 15,
  },
  list: { backgroundColor: '#fff', justifyContent: 'center' },
})

export default TopScreen
