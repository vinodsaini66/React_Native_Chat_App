import { View, Text } from 'react-native'
import React from 'react'
import { Icon,Spinner } from '@ui-kitten/components';

const Loader = ({status,size}) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Spinner size={size}  status={status} />
        </View>
    )
}

export default Loader;