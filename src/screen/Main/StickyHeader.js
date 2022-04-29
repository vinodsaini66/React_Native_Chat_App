import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Animated, SafeAreaView, StatusBar, StyleSheet, View, Text } from 'react-native';
import Header from '../../components/Header';
import ListItem from '../../components/ListItem';
import { generateData } from '../../constant/data';
import axios from 'axios';


const { diffClamp } = Animated;
const headerHeight = 58 * 2;

const StickyHeader = () => {

    const [data, setData] = useState(generateData(50));
    const ref = useRef(null);

    const scrollY = useRef(new Animated.Value(0));
    const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);

    const translateY = scrollYClamped.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -(headerHeight / 2)],
    });

    const translateYNumber = useRef();

    translateY.addListener(({ value }) => {
        translateYNumber.current = value;
    });

    useEffect(() => {
        axios.get('https://gorest.co.in/public/v2/users').then((response) => {
            console.log(response.data);
            setData(response.data);
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })

    }, [])

    const renderItem = useCallback(({ item }) => (

        <View style={{
            // height: 150,
            justifyContent: 'center',
            marginHorizontal: 15,
            marginBottom: 5,
            marginVertical: 15,
            backgroundColor: 'white',
            elevation: 10,
            padding: 15,
            borderRadius: 15,
        }}>

            <Text style={styles.text}>EID :  <Text style={styles.insideText}>{item.id} </Text></Text>
            <Text style={styles.text}>Name : <Text style={styles.insideText}>{item.name} </Text></Text>
            <Text style={styles.text}>Email : <Text style={styles.insideText}>{item.email} </Text></Text>
            <Text style={styles.text}>Gender : <Text style={styles.insideText}>{item.gender} </Text></Text>
            <Text style={styles.text}>Status : <Text style={styles.insideText}>{item.status} </Text></Text>

        </View>

    ));

    const handleScroll = Animated.event(
        [
            {
                nativeEvent: {
                    contentOffset: { y: scrollY.current },
                },
            },
        ],
        {
            useNativeDriver: true,
        },
    );

    const handleSnap = ({ nativeEvent }) => {
        const offsetY = nativeEvent.contentOffset.y;
        if (
            !(
                translateYNumber.current === 0 ||
                translateYNumber.current === -headerHeight / 2
            )
        ) {
            if (ref.current) {
                ref.current.scrollToOffset({
                    offset:
                        getCloser(translateYNumber.current, -headerHeight / 2, 0) ===
                            -headerHeight / 2
                            ? offsetY + headerHeight / 2
                            : offsetY - headerHeight / 2,
                });
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
                <Header {...{ headerHeight }} />
            </Animated.View>
            <Animated.FlatList
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingTop: headerHeight }}
                onScroll={handleScroll}
                ref={ref}
                // onMomentumScrollEnd={handleSnap}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => `list-item-${index}-${item.color}`}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1,
    },
    subHeader: {
        height: headerHeight / 2,
        width: '100%',
        paddingHorizontal: 10,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        color: 'black',
        fontSize: 15,

        marginBottom: 2
    },
    insideText: {
        color: 'gray',
        fontSize: 13
    }
});



const getCloser = (value, checkOne, checkTwo) =>
    Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

export default StickyHeader;
