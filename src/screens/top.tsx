import React, { memo } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { View, Text, TextField, ListItem } from 'react-native-ui-lib'
import { StackScreenProps } from '@react-navigation/stack'
import { Context } from '../context'

const TopScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { state, dispatch } = React.useContext(Context)

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: 'Sensors (2021/12/21)' })
  }, [])

  const onPress = (title: string) => navigation.navigate(title)

  const setAddress = (address: string) => {
    dispatch({ type: 'SET_ADDRESS', payload: { address } })
  }

  return (
    <View flex useSafeArea>
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
  <View paddingH-15 paddingT-15 backgroundColor="#fff" style={styles.separator}>
    <TextField
      title="IP Address"
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

const List: React.FC<ListProps> = memo(({ title, onPress }) => (
  <ListItem onPress={() => onPress(title)}>
    <View flex centerV paddingH-15 style={styles.separator}>
      <Text>{title}</Text>
    </View>
  </ListItem>
))

/**
 * Items
 */
const items: string[] = [
  'Accelerometer',
  'BarCodeScanner',
  'Barometer',
  'DeviceMotion',
  'FaceDetector',
  'Gyroscope',
  'Magnetometer',
  'Pedometer',
]

/**
 * Styles
 */
const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
})

export default TopScreen
