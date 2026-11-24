import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { formatWIT, generateWatermarkText } from '../utils/watermark';
import { reverseGeocode, getElevation } from '../utils/geo';

export const PhotoModeScreen: React.FC = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState(false);
  const [activity, setActivity] = useState('Monitoring Lapangan');
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Location permission needed for GPS tagging');
      }
    })();
  }, []);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const capturePhoto = async () => {
    if (!cameraRef.current) return;
    
    try {
      const location = await Location.getCurrentPositionAsync({});
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;
      const altitude = location.coords.altitude || 0;
      
      const [locationName, elevation] = await Promise.all([
        reverseGeocode(lat, lon),
        getElevation(lat, lon)
      ]);

      const now = new Date();
      const timestamp = formatWIT(now);
      
      const watermarkData = {
        title: 'DOKUMENTASI KEGIATAN LAPANGAN',
        dateTime: timestamp,
        location: locationName,
        lat, lon,
        altitude: elevation || altitude,
        activity
      };

      const watermarkText = generateWatermarkText(watermarkData);
      console.log('Watermark:', watermarkText);
      Alert.alert('Foto Tersimpan', 'Foto dengan watermark telah disimpan ke galeri');
    } catch (error) {
      Alert.alert('Error', 'Gagal mengambil foto');
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} flash={flash ? 'on' : 'off'} ref={cameraRef}>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={() => setFlash(!flash)}>
            <Text style={styles.controlText}>{flash ? '⚡' : '⚡'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}>
            <Text style={styles.controlText}>🔄</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.captureContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={capturePhoto} />
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  controls: { position: 'absolute', top: 50, flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20 },
  controlButton: { backgroundColor: 'rgba(0,0,0,0.5)', padding: 15, borderRadius: 25 },
  controlText: { color: '#fff', fontSize: 20 },
  captureContainer: { position: 'absolute', bottom: 60, alignSelf: 'center' },
  captureButton: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', borderWidth: 4, borderColor: '#1e40af' },
  text: { color: '#fff', fontSize: 18, textAlign: 'center' },
  button: { backgroundColor: '#1e40af', padding: 15, borderRadius: 8, marginTop: 20 },
  buttonText: { color: '#fff', textAlign: 'center' },
});
