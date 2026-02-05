import GlassTabBar from '@/components/GlassTabBar';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      {/* ROUTES ONLY */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, 
        }}
      >
        <Tabs.Screen name="player" />
        <Tabs.Screen name="library" />
        <Tabs.Screen name="favorites" />
        <Tabs.Screen name="settings" />
      </Tabs>

  
      <GlassTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
