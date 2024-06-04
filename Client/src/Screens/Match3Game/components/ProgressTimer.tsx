import React, {useRef, useState, useEffect} from 'react'
import {Text, View, StyleSheet, Animated} from 'react-native'

const TIME_OUT = 10
// setInterval custom hook by Dan Abramov
function useInterval(callback, delay) {
  const savedCallback = useRef<any>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const ProgressTimer = ({setMoveCount, moveCount, score}) => {
  let animation = useRef(new Animated.Value(0))
  const [progress, setProgress] = useState(0)

  useInterval(() => {
    // update progress until 100
    if (progress < TIME_OUT + 1) {
      setProgress(progress + 1)
    }
  }, 1000)

  useEffect(() => {
    setProgress(0)
  }, [score])

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: TIME_OUT,
      useNativeDriver: false,
    }).start()
    if (progress === TIME_OUT) {
      setMoveCount(moveCount + 1)
      setProgress(0)
    }
  }, [progress])

  const width = animation.current.interpolate({
    inputRange: [0, TIME_OUT],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  })

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor: '#8BED4F', width}]} />
      </View>
      <Text>{`${10 - progress}`}</Text>
    </View>
  )
}

export default ProgressTimer

const styles = StyleSheet.create({
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
  },
  progressBar: {
    height: 16,
    width: 120,
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
  },
})
