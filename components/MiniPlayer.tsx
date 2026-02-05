import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { usePlayer } from '../context/PlayerContext';

export default function MiniPlayer() {
  const { currentSong, isPlaying, togglePlayPause } = usePlayer();
  const router = useRouter();

  if (!currentSong) return null;

  return (
    <Pressable
      onPress={() => router.push('/player')}
      style={styles.container}
    >
      <Text numberOfLines={1} style={styles.title}>
        {currentSong.filename}
      </Text>

      <Pressable onPress={togglePlayPause}>
        <Text style={styles.control}>
          {isPlaying ? '⏸' : '▶'}
        </Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  title: {
    flex: 1,
    fontSize: 14,
    color: '#111',
    marginRight: 12,
  },
  control: {
    fontSize: 18,
    color: '#111',
  },
});
