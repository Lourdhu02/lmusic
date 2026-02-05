import { Audio } from 'expo-av';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Song = {
  id: string;
  filename: string;
  uri: string;
};

type PlayerContextType = {
  playlist: Song[];
  currentIndex: number;
  currentSong: Song | null;
  isPlaying: boolean;
  loop: boolean;
  shuffle: boolean;
  favorites: string[];

  playFromList: (songs: Song[], index: number) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  next: () => Promise<void>;
  prev: () => Promise<void>;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  toggleFavorite: (id: string) => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const currentSong = playlist[currentIndex] ?? null;

  // 🔊 AUDIO MODE — THIS FIXES NO SOUND
  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  const loadAndPlay = async (song: Song) => {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: song.uri },
      { shouldPlay: true }
    );

    setSound(newSound);
    setIsPlaying(true);
  };

  const playFromList = async (songs: Song[], index: number) => {
    setPlaylist(songs);
    setCurrentIndex(index);
    await loadAndPlay(songs[index]);
  };

  const togglePlayPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const next = async () => {
    let nextIndex = shuffle
      ? Math.floor(Math.random() * playlist.length)
      : (currentIndex + 1) % playlist.length;

    setCurrentIndex(nextIndex);
    await loadAndPlay(playlist[nextIndex]);
  };

  const prev = async () => {
    const prevIndex =
      currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;

    setCurrentIndex(prevIndex);
    await loadAndPlay(playlist[prevIndex]);
  };

  const toggleLoop = () => setLoop(!loop);
  const toggleShuffle = () => setShuffle(!shuffle);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <PlayerContext.Provider
      value={{
        playlist,
        currentIndex,
        currentSong,
        isPlaying,
        loop,
        shuffle,
        favorites,
        playFromList,
        togglePlayPause,
        next,
        prev,
        toggleLoop,
        toggleShuffle,
        toggleFavorite,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider');
  return ctx;
};
