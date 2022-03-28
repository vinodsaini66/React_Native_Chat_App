import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ApplicationProvider,Button, Card, Text, Layout, Modal } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
const ModelUI = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        console.log('Visible', visible);
    }, [visible])

    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <View>
                <Text>fff</Text>
            </View>
            <Layout style={{ backgroundColor: 'transparent', flex: 1, padding: 16 }}>
                <Text onPress={() => setVisible(!visible)}>Open</Text>

                <Modal
                    visible={visible}
                    backdropStyle={styles.backdrop}
                    allowBackdrop={true}
                   
                    >
                    <Layout
                        level='3'
                        style={styles.modalContainer}>
                        <Text>This is modal</Text>
                        <Button onPress={() => setVisible(!visible)}>Hide Modal</Button>
                    </Layout>
                </Modal>
            </Layout>
            </ApplicationProvider>

    );
};

export default ModelUI;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 800,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'gray'
    },
});