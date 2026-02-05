import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalHeader from '../components/GlobalHeader';
import MiniPlayer from '../components/MiniPlayer';
import { PlayerProvider } from '../context/PlayerContext';

export default function RootLayout() {
  return (
    <PlayerProvider>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <GlobalHeader />

        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>

        <MiniPlayer />
      </SafeAreaView>
    </PlayerProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
});
