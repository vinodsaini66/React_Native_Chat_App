import { StyleSheet, Text, View, BackHandler, TouchableOpacity,Animated } from 'react-native'
import React, { useEffect,useState,useRef } from 'react'
import * as Progress from 'react-native-progress';
import { StackActions } from '@react-navigation/native';
import { Icon } from '@ui-kitten/components';
import LottieView from 'lottie-react-native';

const Result = ({ navigation, route }) => {
    const { result } = route.params;
    const total = 10;
    console.log(result);
    const [isLoading,setLoading]=useState(true);
    const [progress,setProgress]=useState(0);

    const BackIcon = (props) => (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Group');
        }}>
            <Icon style={{ height: 25, width: 25 }} name='arrow-back' fill='red' />
        </TouchableOpacity>
    );

    useEffect(() => {
        console.log('Mount Result');
        setTimeout(()=>{
            setProgress((result) / 100);
        },2000);
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                navigation.navigate('Group');
                return true;
            }
        );
        return () => {
            console.log('Un-Mount Result');
            backHandler.remove();
        }
    }, []);

    return (
        <View style={{
            flex: 1
        }}>
            <View style={{ marginTop: 15, marginLeft: 12 }}>
                <BackIcon />
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <LottieView
                    source={require('../../../assets/animation/rocket.json')}
                    autoPlay loop
                />
                <Progress.Circle
                    size={130}
                    indeterminate={false}
                    showsText={true}
                    formatText={() => <Text>{progress*100}%</Text>}
                    progress={progress}
                    thickness={5}
                    indeterminateAnimationDuration={5000}
                />
                <View style={{ marginTop: 15 }}>
                    <Text style={{
                        fontSize: 21,
                        color: 'black'
                    }}>  Result : {result / total} / {total}</Text>
                </View>
            </View>

            {/* <Button title='Restart Assessment' onPress={()=>navigation.push('Assessment')}/> */}

        </View>
    )
}

export default Result

