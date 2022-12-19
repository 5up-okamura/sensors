import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Checkbox from 'expo-checkbox'
import { Subscription } from 'expo-modules-core'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '../components/button'

export const INTERVAL_SLOW = 1000
export const INTERVAL_FAST = 33

type Props = {
  subscribe: () => Subscription
  setUpdateInterval?: (interval: number) => void
  children: React.ReactNode
}

export const Template: React.FC<Props> = ({
  subscribe,
  setUpdateInterval,
  children,
}) => {
  const { bottom: paddingBottom } = useSafeAreaInsets()
  const [subscription, setSubscription] = useState<Subscription>()

  const _slow = () => {
    setUpdateInterval && setUpdateInterval(INTERVAL_SLOW)
  }

  const _fast = () => {
    setUpdateInterval && setUpdateInterval(INTERVAL_FAST)
  }

  const _subscribe = () => {
    setSubscription(subscribe())
  }

  const _unsubscribe = (unmounted?: boolean) => {
    subscription && subscription.remove()
    unmounted != true && setSubscription(undefined)
  }

  const _onValueChange = (value: boolean) => {
    value ? _subscribe() : _unsubscribe()
  }

  useEffect(() => {
    _subscribe()
    return () => _unsubscribe(true)
  }, [])

  return (
    <View style={[styles.flex, { paddingBottom }]}>
      <View style={[styles.flex, styles.spred, { padding: 30 }]}>
        {children}
        {/* Button container */}
        <View style={[styles.row, styles.spred, { alignItems: 'center' }]}>
          {/* Subscribe button */}
          <Checkbox
            value={subscription != undefined}
            onValueChange={_onValueChange}
          />
          {/* Update interval button */}
          {setUpdateInterval && (
            <>
              <Button title="Slow" onPress={_slow} />
              <Button title="Fast" onPress={_fast} />
            </>
          )}
        </View>
      </View>
    </View>
  )
}

type Props2 = {
  requestPermissions: () => Promise<boolean>
  render?: JSX.Element
  subscribed: boolean
  setSubscribed: (subscribed: boolean) => void
  setUpdateInterval?: (interval: number) => void
  children: React.ReactNode
}

export const Template2: React.FC<Props2> = ({
  requestPermissions,
  render,
  subscribed,
  setSubscribed,
  setUpdateInterval,
  children,
}) => {
  const { bottom: paddingBottom } = useSafeAreaInsets()
  const [hasPermission, setHasPermission] = useState<boolean>()

  useEffect(() => {
    ;(async () => {
      const granted = await requestPermissions()
      setHasPermission(granted)
    })()
  })

  const _slow = () => {
    setUpdateInterval && setUpdateInterval(INTERVAL_SLOW)
  }

  const _fast = () => {
    setUpdateInterval && setUpdateInterval(INTERVAL_FAST)
  }

  if (hasPermission == undefined) {
    return (
      <View style={[styles.flex, styles.center]}>
        <Text>Requesting for camera permission</Text>
      </View>
    )
  } else if (hasPermission == false) {
    return (
      <View style={[styles.flex, styles.center]}>
        <Text>No access to camera</Text>
      </View>
    )
  }

  return (
    <View style={[styles.flex, { paddingBottom }]}>
      {children}
      <View style={[styles.flex, styles.spred, { padding: 30 }]}>
        {render}
        {/* Button container */}
        <View
          style={[
            styles.row,
            styles.spred,
            { alignItems: 'center', paddingBottom: 30 },
          ]}
        >
          {/* Subscribe button */}
          <Checkbox value={subscribed} onValueChange={setSubscribed} />
          {/* Update interval button */}
          {setUpdateInterval && (
            <>
              <Button title="Slow" onPress={_slow} />
              <Button title="Fast" onPress={_fast} />
            </>
          )}
        </View>
      </View>
    </View>
  )
}

/**
 * styles
 */
const styles = StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: 'row' },
  center: { justifyContent: 'center', alignItems: 'center' },
  spred: { justifyContent: 'space-between' },
  button: {},
})
