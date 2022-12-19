import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

type Props = {
  title: string
  onPress?: () => void
}

export const Button: React.FC<Props> = React.memo(({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
})

/**
 * style
 */
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3478F6',
    minWidth: '30%',
    borderRadius: 30,
    padding: 15,
  },
  text: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
})
