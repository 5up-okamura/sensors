import React, { forwardRef } from 'react'
import { View, Text } from 'react-native-ui-lib'
import { Context } from './context'

type Props = {
  host?: string
}

type State = {
  connected: boolean
}

class Socket_ extends React.PureComponent<Props, State> {
  socket: WebSocket | undefined
  state = { connected: false }

  componentDidMount() {
    const { host } = this.props
    if (host && host.split('.').length == 4) {
      try {
        const url = `ws://${host}:8080`
        console.log(`[socket] open ${url}`)
        this.socket = new WebSocket(url)
        this.socket.onopen = () => {
          this.setState({ connected: true })
        }
        this.socket.onclose = () => {
          this.setState({ connected: false })
        }
      } catch (err) {
        console.warn(err)
        alert(err)
      }
    }
  }

  send = (message: string) => {
    if (!this.state.connected) return
    this.socket?.send(message)
  }

  render() {
    const { connected } = this.state
    const backgroundColor = connected ? 'green' : 'red'
    return (
      <View row centerV>
        <View
          style={{ backgroundColor, width: 16, height: 16, borderRadius: 8 }}
        />
        <Text margin-8>{connected ? 'ON' : 'OFF'}</Text>
      </View>
    )
  }
}

const Socket = forwardRef((props, ref) => {
  const { state } = React.useContext(Context)
  // @ts-ignore
  return <Socket_ {...props} ref={ref} host={state.address} />
})

export default Socket
