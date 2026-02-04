import { View, Text, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useState } from 'react';

export default function HomeScreen() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/music/sample.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎵 Simple Music Player</Text>

      <Button title="Play Music" onPress={playSound} />
      <View style={{ height: 10 }} />
      <Button title="Stop Music" onPress={stopSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});
