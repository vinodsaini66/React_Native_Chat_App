import React, { useRef } from 'react';
import { Animated, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import ListItem from '../../components/ListItem';
import { generateData } from '../../constant/data';



const { diffClamp } = Animated;
const headerHeight = 58 * 2;

const StickyHeader = () => {
    const data = generateData(50);

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
                renderItem={ListItem}
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
});



const getCloser = (value, checkOne, checkTwo) =>
    Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

export default StickyHeader;
