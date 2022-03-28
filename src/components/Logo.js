import { View, Text } from 'react-native'
import React from 'react'

const Logo = () => {
    return (
        <View style={{      
            alignItems:'center',
            justifyContent:'center'
        }} >
            <Text style={{
                color: 'white',
                fontSize: 60,
                fontWeight: 'bold'
            }}>HeyU</Text>
            <Text style={{
                color: 'white',
                fontSize: 15,
                fontWeight:'500'
            }}>Free Chat app template</Text>
        </View>
    )
}

export default Logo;