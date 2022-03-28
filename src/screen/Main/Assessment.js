import { StyleSheet, Text, View, StatusBar, TouchableOpacity, BackHandler, Animated } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { setSelectedLog } from 'react-native/Libraries/LogBox/Data/LogBoxData'

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeText } from 'react-native/Libraries/Text/TextNativeComponent';

const Assessment = ({ navigation }) => {

    const [current, setCurrent] = useState(0);
    const [selectedAns, setSelectedAns] = useState([]);
    const [currentAns, setCurrentAns] = useState();
    const [correct, setCorrect] = useState(0);
    const progressAnim = useRef(new Animated.Value(0)).current
    /** {que:1,ans:4} */

    const backAction = () => {
        if (current > 0) {
            const result = selectedAns[current - 1]//.find((item) => item.que == );
            console.log('back ', result, result.ans)
            if (result) {
                setCurrentAns(result.ans);
            }
            setCurrent(current - 1)
            Animated.timing(progressAnim, {
                toValue: (160 / question.length) * (current),
                duration: 1500,
                useNativeDriver: false
            }).start();
            return true;
        } else {
            //navigation.goBack();
            return false;
        }
    }
    useEffect(() => {
        console.log('current : ', current)     
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => {
            console.log('UnMount',current);
            backHandler.remove();
        };   
    }, [current]);

    useEffect(() => {
        console.log('selectedAns :', selectedAns.length);
        if (selectedAns.length == question.length) {
            let res = 0;
            selectedAns.forEach((element, index) => {
                if (question[index].ans == element.ans) {
                    res = res + 1;
                }
            });
            const result = Math.round((res / question.length) * 100)
            navigation.navigate('Result', { result: result });
        }

    }, [selectedAns]);

    useEffect(()=>{
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => {
            console.log('UnMount',current);
            backHandler.remove();
        };  
    },[]);


    const question = [
        {
            id: 0,
            que: 'The concat() method joins two or more strings.',
            options: ['H', 'E', 'L', 'O'],
            ans: 1,
        },
        {
            id: 1,
            que: 'MaterialIcon',
            options: ['M', 'E', 'L', 'O'],
            ans: 1,
        },
        {
            id: 2,
            que: 'VideoPlayer',
            options: ['M', 'E', 'L', 'O'],
            ans: 1,
        },
        {
            id: 3,
            que: 'Orientation',
            options: ['M', 'E', 'L', 'O'],
            ans: 1,
        },
        {
            id: 4,
            que: 'Truworth',
            options: ['M', 'E', 'L', 'O'],
            ans: 1,
        },
        {
            id: 5,
            que: 'Wellness',
            options: ['M', 'E', 'L', 'O'],
            ans: 1,
        },
        {
            id: 6,
            que: 'Wellness',
            options: ['M', 'E', 'L', 'O'],
            ans: 1,
        },
        {
            id: 7,
            que: 'Wellness',
            options: ['M', 'E', 'L', 'O'],
            ans: 1,
        },
        {
            id: 8,
            que: 'Wellness',
            options: ['M', 'E', 'L', 'O'],
            ans: 1,
        },
        {
            id: 9,
            que: 'Wellness',
            options: ['M', 'E', 'L', 'O'],
            ans: 1,
        },
    ];
    const next = async () => {
        handleSelected({ que: current, ans: currentAns })
        if (current < question.length - 1) {
            const index = selectedAns.find((item) => item.que == current + 1);
            if (index) {
                setCurrentAns(index.ans);
            } else {
                setCurrentAns(null);
            }
            setCurrent(current + 1);
            Animated.timing(progressAnim, {
                toValue: (160 / question.length) * (current + 1),
                duration: 1500,
                useNativeDriver: false
            }).start()

        } else {
            console.log('Result', correct);
        }


    }

    const handleSelected = ({ que, ans }) => {
        const index = selectedAns.findIndex((item) => item.que == que);
        const select = [...selectedAns];
        if (index >= 0) {

            select[index] = { ...selectedAns[index], ans: ans };
        } else {
            select.push({ que, ans });
        }
        setSelectedAns(select);
    }


    return (
        <>
            <StatusBar animated={true} backgroundColor="#800000" />
            <View style={{ flex: 1 }}>
                <View style={{
                    backgroundColor: '#800000',
                    width: '100%',
                    height: 90,
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity onPress={() => !backAction() && navigation.goBack() }>
                        <MaterialIcon name={'arrow-left'} size={30} color="white" style={{
                            marginLeft: 12,
                            marginBottom: 5
                        }} />
                    </TouchableOpacity>

                    <Text style={{
                        fontSize: 15, color: 'white',
                        marginHorizontal: 12, marginTop: 5
                    }}> Question</Text>
                </View>
                <View style={{ flex: 1, marginHorizontal: 20 }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 15
                    }}
                    >
                        <Text>Question {current + 1} out of {question.length}</Text>
                        <View style={{
                            width: 160,
                            height: 10,
                            backgroundColor: '#BBBBBB',
                            marginLeft: 15,
                            borderRadius: 5,
                        }}>
                            <Animated.View style={{
                                width: progressAnim,//(Math.floor((current / question.length) * 100)).toString().concat('%'),
                                height: 10,
                                backgroundColor: 'red',
                                borderRadius: 5,
                            }}>
                            </Animated.View>
                        </View>
                    </View>

                    <Show
                        id={current}
                        que={question[current].que}
                        options={question[current].options}
                        selectedAns={selectedAns}
                        handleSelected={handleSelected}
                        setCurrentAns={setCurrentAns}
                        currentAns={currentAns}
                    />
                </View>
                <TouchableOpacity style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: currentAns == null ? '#02475E' : '#800000',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                    onPress={() => next()}
                    disabled={currentAns == null}
                >
                    <Text style={{ color: 'white' }}>
                        {current == question.length - 1 ? 'SUBMIT' : 'NEXT QUESTION'}
                    </Text>
                </TouchableOpacity>
            </View>
        </>


    )
}

export default Assessment

const Show = (props) => {
    const { id, que,
        options,
        selectedAns,
        setCurrentAns,
        currentAns } = props;
    // useEffect(() => {
    //     console.log(selectedAns);
    //     return () => {

    //     }
    // });

    return (
        <View style={{
            marginVertical: 25,
        }}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 15,
                color: 'black',
            }}>{que}</Text>
            {
                options.map((item, index) => (
                    <TouchableOpacity style={{
                        backgroundColor: currentAns == index ? '#800000' : '#9D9D9D',
                        width: '100%',
                        height: 40,
                        borderRadius: 5,
                        padding: 5, marginBottom: 10,
                        justifyContent: 'center'
                    }}
                        onPress={() => { setCurrentAns(index); }}
                        key={index}>
                        <Text style={{
                            fontSize: 17,
                            color: currentAns == index ? 'white' : 'black',
                            fontWeight: currentAns == index ? 'bold' : '400',
                            marginLeft: 10,
                        }}>{item} </Text>
                    </TouchableOpacity>
                ))
            }
        </View>


    );
}

const styles = StyleSheet.create({})



