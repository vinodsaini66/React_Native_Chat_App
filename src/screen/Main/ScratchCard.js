import {
    StyleSheet, Text,
    View, TouchableOpacity,
    Image, Alert,
    Pressable,
    Dimensions
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScratchCard } from 'rn-scratch-card'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import useDelayedRender from '../../helper/useDelayedRender';
import { ApplicationProvider, Modal } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

const { height, width } = Dimensions.get('window');

const ScratchCardTest = ({ navigation }) => {

    const cardData = [
        { cardImage: require('../../../assets/images/hide.jpg'), isScratched: false },
        { cardImage: require('../../../assets/images/hide1.jpg'), isScratched: true },
        { cardImage: require('../../../assets/images/hide2.jpg'), isScratched: false },
    ];

    useEffect(() => {
        console.log('Scratch Card Mount : ')
        return () => {
            console.log('Scratch Card  UnMount : ')
        }
    }, [])

    useEffect(() => {
        console.log('Scratch Card Mount 5 : ')
       
    })

    const Scratch = (props) => {
        const { hide, Scratched } = props;
        const [modalVisible, setModalVisible] = useState(false);
        const [isScratched, setIsScratched] = useState(Scratched);
        return (
            <>
                <View style={{
                    marginHorizontal: 15,
                }}>
                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 150,
                            borderRadius: 5,
                            backgroundColor: 'red',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: '600'
                        }}> Card</Text>
    
                    </TouchableOpacity>
    
                    {
                        modalVisible &&
                        <Card
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                            isScratched={isScratched}
                            setIsScratched={setIsScratched}
                            hide={hide}
                        />
                    }
    
                </View>
    
    
    
            </>
        )
    
    }
    
    const DelayedRender = ({ delay, children }) =>
        useDelayedRender(delay)(() => children);
    
    const Card = (props) => {
        const { modalVisible, setModalVisible, isScratched, setIsScratched, hide } = props;
        return (
            <>
                <View style={styles.container}>
                    <Modal
                        visible={modalVisible}
                        backdropStyle={styles.backdrop}
                        allowBackdrop={true}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Pressable
                                    style={{
                                        justifyContent: 'flex-end'
                                        , alignItems: 'flex-end'
                                    }}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <MaterialCommunityIcons
                                        name="close"
                                        color='black'
                                        size={25}
                                    />
                                </Pressable>
                                {
                                    isScratched ?
                                        <Image
                                            source={require('../../../assets/images/coupon.jpg')}
                                            style={styles.background_view}
                                        />
                                        :
                                        <>
                                            <DelayedRender delay={600}>
                                                <Image
                                                    source={require('../../../assets/images/coupon.jpg')}
                                                    style={styles.background_view}
                                                />
                                            </DelayedRender>
                                            <ScratchCard
                                                source={hide}
                                                brushWidth={30}
                                                onScratch={(data) => { if (data > 45) { setIsScratched(true) } }}
                                                style={styles.scratch_card}
                                            />
                                        </>
                                }
    
    
                            </View>
                        </View>
                    </Modal>
    
                </View>
    
    
            </>
    
        )
    };

    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <View style={[{ flex: 1 }]}>
                <View style={{
                    marginVertical: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    {
                        cardData.map((card, index) =>
                            <Scratch
                                hide={card.cardImage}
                                Scratched={card.isScratched}
                                key={index} />
                        )
                    }

                </View>
            </View>
        </ApplicationProvider>
    );


}



export default ScratchCardTest

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    background_view: {
        position: 'absolute',
        width: 200,
        height: 250,
        backgroundColor: 'transparent',
        alignSelf: 'center',
        marginTop: 40,
        borderRadius: 16,
    },
    scratch_card: {
        width: 200,
        height: 250,
        backgroundColor: 'transparent',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 250,
        height: 300,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
})