import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Botton = (props) => {
    return (
        <TouchableOpacity style={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: 150,
            height: 50,
            width: 340,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 1,
            marginLeft:5,
        }} 
        onPress={()=>props.handler()}>
            <Text style={{ color: '#E7717A', fontSize: 20,fontWeight:'400' }}>{props.name}</Text>
        </TouchableOpacity>
    )
}

export default Botton;