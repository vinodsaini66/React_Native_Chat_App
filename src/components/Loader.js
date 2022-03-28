import { View, Text } from 'react-native'
import React from 'react'
import { Icon,Spinner } from '@ui-kitten/components';

const Loader = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Spinner size='giant' />
        </View>
    )
}

export default Loader;