import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'

const Alogo = ({scale}) => {
  return (
    <Animated.View style={{
        backgroundColor:'white',
        height:120,width:120,alignItems:'center',
        justifyContent:'center',
        transform:[{scale}]
    }}>
      <Text>Alogo</Text>
    </Animated.View>
  )
}

export default Alogo

const styles = StyleSheet.create({})