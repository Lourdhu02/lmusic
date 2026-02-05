import * as MediaLibrary from 'expo-media-library';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Song, usePlayer } from '../../context/PlayerContext';

export default function LibraryScreen() {
  const [songs, setSongs] = useState<Song[]>([]);
  const { playFromList } = usePlayer();
  const router = useRouter();

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) return;

    const media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: 1000,
    });

    const mapped = media.assets.map((a) => ({
      id: a.id,
      filename: a.filename.replace('.mp3', ''),
      uri: a.uri,
    }));

    setSongs(mapped);
  };

  const renderItem = ({ item, index }: { item: Song; index: number }) => (
    <Pressable
      android_ripple={{ color: '#EAEAEA' }}
      onPress={async () => {
        await playFromList(songs, index);
        router.push('/player');
      }}
      style={styles.row}
    >
      <Text numberOfLines={1} style={styles.title}>
        {item.filename}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* TOP DIVIDER */}
      <View style={styles.topDivider} />

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.list}
      />

      {/* BOTTOM DIVIDER */}
      <View style={styles.bottomDivider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  list: {
    paddingVertical: 8,
  },

  row: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },

  title: {
    fontSize: 16,
    color: '#111111',
  },

  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },

  topDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
  },

  bottomDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
  },
});
