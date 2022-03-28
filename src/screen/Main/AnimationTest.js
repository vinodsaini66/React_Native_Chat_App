import { StyleSheet, Text, View } from 'react-native'
import React ,{ useRef }from 'react'

import {withTimingTransition} from 'react-native-redash'
import Animated ,{useCode,eq,cond,set}from 'react-native-reanimated'
import Alogo from '../../components/Alogo'

const AnimationTest = () => {

    const scale=useRef(new Animated.Value(0));
    const AnimationScale = withTimingTransition(scale.current);

    useCode (()=>cond(eq(scale.current,0),set(scale.current,1)),[]);
  return (
    <View style={styles.container}>
     <View style={styles.logoConrainer}>
         <Alogo  scale={AnimationScale}/>
     </View>
    </View>
  )
}

export default AnimationTest

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'blue',
        alignItems:'center',
        justifyContent:'center'
    },
    logoContainer:{
        flex:1,alignItems:'center',
        justifyContent:'center'
    }
})