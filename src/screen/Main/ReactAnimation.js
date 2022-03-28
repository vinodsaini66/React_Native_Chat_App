import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'

const SIZE = 100;
const ReactAnimation = () => {
    const progress = useRef(new Animated.Value(0.5)).current;
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        console.log(`${Math.PI}deg`,`${2*Math.PI}deg`);
        Animated.loop(
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(progress, { toValue: 1, useNativeDriver: true }),
                    Animated.timing(progress, { toValue: 0.5, useNativeDriver: true })
                ]), 
                Animated.sequence([
                    Animated.timing(scale, { toValue: 2, useNativeDriver: true }),
                    Animated.timing(scale, { toValue: 1, useNativeDriver: true })
                ])
            ])
        ).start();
      
       
       // Animated.timing(scale, { toValue: 2, useNativeDriver: true }).start();
    }, []);

    return (
        <View style={{
            flex: 1, justifyContent: 'center', alignItems: 'center'
        }}>
            <Animated.View style={[{
                backgroundColor: 'blue',
                width: SIZE,
                height: SIZE

            }, {
                borderRadius: progress.interpolate({
                    inputRange: [0.5, 1],
                    outputRange: [SIZE/4, SIZE / 2],
                }),
                opacity: progress,
                transform: [
                    { scale },
                    {
                        rotate: progress.interpolate({
                            inputRange: [0.5, 1],
                            outputRange: [`${Math.PI}deg`,`${2*Math.PI}deg`]
                        }),
                    },
                ]
            }
            ]}>
                <Text>Hello</Text>
            </Animated.View>
        </View>
    )
}

export default ReactAnimation

const styles = StyleSheet.create({})