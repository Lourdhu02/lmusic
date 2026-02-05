import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

const TABS = [
  { route: '/player', icon: 'play-circle', size: 38 },
  { route: '/library', icon: 'musical-notes', size: 30 },
  { route: '/favorites', icon: 'heart', size: 30 },
  { route: '/settings', icon: 'settings', size: 28 },
];

export default function GlassTabBar() {
  const router = useRouter();
  const path = usePathname();

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={80} tint="dark" style={styles.glass}>
        {TABS.map(tab => {
          const active = path === tab.route;
          return (
            <Pressable
              key={tab.route}
              onPress={() => router.replace(tab.route)}
              style={styles.item}
            >
              <Ionicons
                name={tab.icon as any}
                size={tab.size}
                color={active ? '#FF2D2D' : 'rgba(255,255,255,0.6)'}
              />
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 26,
    width: '92%',
    height: 86,
    alignSelf: 'center',
    borderRadius: 44,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 50,
    shadowOffset: { width: 0, height: 22 },
    elevation: 50,
  },

  glass: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 44,
  },

  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
