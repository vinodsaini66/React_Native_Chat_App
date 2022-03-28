import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import TopNav from '../../navigation/TopNav'

const isAndroid = Platform.OS === 'android';

const RESEND_OTP_TIME_LIMIT = 30; // 30 secs
const AUTO_SUBMIT_OTP_TIME_LIMIT = 4; // 4 secs

let resendOtpTimerInterval;
let autoSubmitOtpTimerInterval;

const Otp = ({ navigation }) => {

    const firstTextInputRef = useRef(null);
    const secondTextInputRef = useRef(null);
    const thirdTextInputRef = useRef(null);
    const fourthTextInputRef = useRef(null);
    const fifthTextInputRef = useRef(null);
    const sixthTextInputRef = useRef(null);
    const inputRefs = [firstTextInputRef, secondTextInputRef,
        thirdTextInputRef, fourthTextInputRef, fifthTextInputRef, sixthTextInputRef
    ];

    const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
    const [submittingOtp, setSubmittingOtp] = useState(false);
    const [sendButtonDisabledTime, setSendButtonDisabledTime] = useState(
        RESEND_OTP_TIME_LIMIT,
    );

    useEffect(() => {
        startResendOtpTimer();
        return () => {
            if (resendOtpTimerInterval) {
                clearInterval(resendOtpTimerInterval);
            }
        };
    }, [sendButtonDisabledTime]);

    const refCallback = textInputRef => node => {
        textInputRef.current = node;
    };

    const onSubmitButtonPress = () => {
        // API call
        // todo
        console.log('todo: Submit OTP');
        console.log(otpArray);
    }

    const startResendOtpTimer = () => {
        if (resendOtpTimerInterval) {
            clearInterval(resendOtpTimerInterval);
        }
        resendOtpTimerInterval = setInterval(() => {
            if (sendButtonDisabledTime <= 0) {
                clearInterval(resendOtpTimerInterval);
            } else {
                setSendButtonDisabledTime(sendButtonDisabledTime - 1);
            }
        }, 1000);
    };
    const onResendOtpButtonPress = () => {
        // clear last OTP
        // if (firstTextInputRef) {
        //   setOtpArray(['', '', '', '']);
        //   firstTextInputRef.current.focus();
        // }

        // setSendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
        // startResendOtpTimer();

        // resend OTP Api call
        // todo
        console.log('todo: Resend OTP');

    }

    const onOtpChange = index => {
        return value => {
            if (isNaN(Number(value))) {
                // do nothing when a non digit is pressed
                return;
            }
            const otpArrayCopy = otpArray.concat();
            otpArrayCopy[index] = value;
            setOtpArray(otpArrayCopy);
            console.log(otpArray);
            // auto focus to next InputText if value is not blank
            if (value !== '') {
                if (index === 0) {
                    secondTextInputRef.current.focus();
                } else if (index === 1) {
                    thirdTextInputRef.current.focus();
                } else if (index === 2) {
                    fourthTextInputRef.current.focus();
                }
                else if (index === 3) {
                    fifthTextInputRef.current.focus();
                } else if (index === 4) {
                    sixthTextInputRef.current.focus();
                }
               
            }
        };
    };

    const onOtpKeyPress = index => {

        return ({ nativeEvent: { key: value } }) => {
            // auto focus to previous InputText if value is blank and existing value is also blank
            console.log(value)
            if (value === 'Backspace' && otpArray[index] === '') {
                if (index === 1) {
                    firstTextInputRef.current.focus();
                } else if (index === 2) {
                    secondTextInputRef.current.focus();
                } else if (index === 3) {
                    thirdTextInputRef.current.focus();
                }
                else if (index === 4) {
                    fourthTextInputRef.current.focus();
                } else if (index === 5) {
                    fifthTextInputRef.current.focus();
                }
                /**
                 * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
                 * doing this thing for us
                 * todo check this behaviour on ios
                 */
                if (isAndroid && index > 0) {
                    const otpArrayCopy = otpArray.concat();
                    otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
                    setOtpArray(otpArrayCopy);
                }
            }
        };
    };

    return (
        <>
            <TopNav
                title={''}
                navigation={navigation}
            />
            <View style={{
                marginHorizontal: 25,
                marginVertical: 25,
                flex: 1,
            }}>
                <View style={{ marginBottom: 15 }}>
                    <Text style={styles.text}>OTP sent to</Text>
                    <Text style={styles.text}>XXXXXX2096</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 20,
                }}>
                    {inputRefs.map((textInputRef, index) => (
                        <TextInput
                            value={otpArray[index]}
                            ref={refCallback(textInputRef)}
                            // placeholder={index.toString()}
                            keyboardType="numeric"
                            maxLength={1}
                            style={styles.textInput}
                            key={index}
                            onKeyPress={onOtpKeyPress(index)}
                            onChangeText={onOtpChange(index)}
                            autoFocus={index === 0 ? true : undefined}
                        />
                    ))}
                </View>

            </View>
            <TouchableOpacity style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 70,
                backgroundColor: '#890F0D',
                opacity: sendButtonDisabledTime > 0 && otpArray.includes('') ? 0.5 :1
            }}
                onPress={() => {
                    onSubmitButtonPress();
                }}
                disabled={(sendButtonDisabledTime > 0 && otpArray.includes(''))}
            >
                {sendButtonDisabledTime > 0 && otpArray.includes('') ? (
                    <Text style={{
                        color: 'white',
                        fontSize: 15,
                    }}>{sendButtonDisabledTime} Seconds</Text>

                ) : (
                    <Text style={{
                        color: 'white',
                        fontSize: 15,
                    }}>Submit</Text>
                )}
            </TouchableOpacity>
        </>

    )
}

export default Otp

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        width: '100%',
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        textAlign: 'center',
        fontSize: 18,
    },
})