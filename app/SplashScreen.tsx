import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AVPlaybackStatusSuccess, ResizeMode, Video } from 'expo-av';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
    return (
        <View style={styles.container}>
            <Video
                source={require('../assets/splash.mp4')}
                style={styles.video}
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping={false}
                onPlaybackStatusUpdate={(status) => {
                    if (status && status.isLoaded && (status as AVPlaybackStatusSuccess).didJustFinish) {
                        onFinish();
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000', // Arka plan rengi
    },
    video: {
        width: '100%',
        height: '100%',
    },
});
