import React, { useState, useEffect } from 'react'
import { View, Text, Button, Checkbox } from 'react-native-ui-lib'
import { Subscription } from '@unimodules/core'

export const INTERVAL_SLOW = 1000
export const INTERVAL_FAST = 33

type Props = {
  subscribe: () => Subscription
  setUpdateInterval?: (interval: number) => void
}

export const Template: React.FC<Props> = ({
  subscribe,
  setUpdateInterval,
  children,
}) => {
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
    <View flex useSafeArea>
      <View flex spread padding-30>
        {children}
        {/* Button container */}
        <View row spread centerV>
          {/* Subscribe button */}
          <Checkbox
            value={subscription != undefined}
            onValueChange={_onValueChange}
          />
          {/* Update interval button */}
          {setUpdateInterval && (
            <>
              <Button label="Slow" onPress={_slow} />
              <Button label="Fast" onPress={_fast} />
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
}

export const Template2: React.FC<Props2> = ({
  requestPermissions,
  render,
  subscribed,
  setSubscribed,
  setUpdateInterval,
  children,
}) => {
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
      <View flex center>
        <Text>Requesting for camera permission</Text>
      </View>
    )
  } else if (hasPermission == false) {
    return (
      <View flex center>
        <Text>No access to camera</Text>
      </View>
    )
  }

  return (
    <View flex useSafeArea>
      {children}
      <View flex spread padding-30>
        {render}
        {/* Button container */}
        <View row spread centerV paddingB-30>
          {/* Subscribe button */}
          <Checkbox value={subscribed} onValueChange={setSubscribed} />
          {/* Update interval button */}
          {setUpdateInterval && (
            <>
              <Button label="Slow" onPress={_slow} />
              <Button label="Fast" onPress={_fast} />
            </>
          )}
        </View>
      </View>
    </View>
  )
}
