import { StyleSheet, Text, View } from 'react-native';

export default function GlobalHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LM</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
});
