import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';

const { height, width } = Dimensions.get('window');
const Fullscreen = ({ navigation, route }) => {
  const { url, currentTime } = route.params;
  const initial = Orientation.getInitialOrientation();
  console.log(url, currentTime, initial);
  const player = useRef(0);
  console.log(player);
  useEffect(() => {

    Orientation.lockToLandscape();
    return () => {
      Orientation.lockToPortrait();
    }
  }, [])
  return (
    <>
      {/* <StatusBar animated={true} backgroundColor="#DA0845" /> */}
      <View style={{
        backgroundColor: 'gray',
        flex: 1,

      }}
      >
        <VideoPlayer
          ref={player}
          source={url}
          style={styles.video}
          fullscreen={true}
          repeat={true}
          paused={false}
          disableFullscreen={false}

          navigator={navigation}

          bufferConfig={{
            minBufferMs: 15000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000
          }}

        // onLoad={() =>player.current.seek(currentTime)}
        />
      </View >
    </>
  )
}

export default Fullscreen

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  }
});
