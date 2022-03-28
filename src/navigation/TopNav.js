import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const TopNav = (props) => {


    const {title, leftIcon, leftAction,rigtIcon,rightAction,navigation} = props;

    const BackIcon = (props) => (
        <Icon {...props} name='arrow-back' fill='red' />
    );

    const RightIcon = (props) => (
        <></>
    );
    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (

        <TopNavigationAction icon={leftIcon ? leftIcon : BackIcon} onPress={leftAction ? leftAction :navigateBack} />
    );

    const navigateRight = () => {
        alert('hello Info')
    };
    const RightAction = () => (
        <TopNavigationAction icon={rigtIcon ? rigtIcon : RightIcon} onPress={rightAction ? rightAction :navigateRight} />
    );
    return (
        <>
            <TopNavigation  
            title={evaProps => <Text {...evaProps} style={{ fontSize: 15 }}>{title}</Text>}
            alignment='center'
            accessoryLeft={BackAction}
            accessoryRight={RightAction}
           />
            <Divider />
        </>

    );
}

export default TopNav;