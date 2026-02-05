import GlassTabBar from '@/components/GlassTabBar';
import { Text, View } from 'react-native';

export default function Player() {
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'rgba(255,255,255,0.6)' }}>
          No song playing
        </Text>
      </View>

      <GlassTabBar />
    </View>
  );
}
