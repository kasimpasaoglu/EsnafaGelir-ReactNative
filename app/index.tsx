import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Device from 'expo-device';
import SplashScreen from './SplashScreen';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const navigation = useNavigation()
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  })
  const [showSplash, setShowSplash] = useState(true); // Splash ekranını kontrol ediyor

  const [deviceId, setDeviceId] = useState<string | null>(null);

  const baseUrl = "http://esnafagetirdemo.runasp.net"; // MVC sitenin adresi

  useEffect(() => {
    const id = Device.osBuildId || Device.deviceName || "default-id";
    setDeviceId(id);
  }, []);

  if (showSplash) {

    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!deviceId) {
    return null;
  }

  return (
    // WebView giriş sayfasını yükler
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <WebView
        source={{ uri: `${baseUrl}/Login/Index?deviceId=${deviceId}` }}
        style={styles.webview}
        sharedCookiesEnabled={true}
        scalesPageToFit={true}
        mixedContentMode="always"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6792C',
  },
  webview: {
    flex: 1,
  },
});
