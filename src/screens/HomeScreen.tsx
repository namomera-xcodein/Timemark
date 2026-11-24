import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  navigation: any;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timestamp Documentation Camera</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('PhotoMode')}
      >
        <Text style={styles.buttonText}>📸 PHOTO MODE</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('PhotoStudio')}
      >
        <Text style={styles.buttonText}>🖼️ PHOTO STUDIO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 60,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1e40af',
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
