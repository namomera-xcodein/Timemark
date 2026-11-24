import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatWIT, generateWatermarkText } from '../utils/watermark';

export const PhotoStudioScreen: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activity, setActivity] = useState('Monitoring Lapangan');

  const pickImage = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission denied', 'Galeri permission diperlukan');
      return;
    }

    const result = await MediaLibrary.requestAssetsAsync({
      mediaType: MediaLibrary.MediaType.photo,
      first: 20
    });
    
    if (!result.cancelled) {
      setPhoto(result.assets[0]?.uri || null);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Photo Studio</Text>

      <Text style={styles.label}>Kegiatan:</Text>
      <TextInput
        style={styles.input}
        value={activity}
        onChangeText={setActivity}
        placeholder="Masukkan kegiatan..."
      />

      <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.buttonText}>📅 {date.toLocaleDateString('id-ID')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.buttonText}>🕐 {date.toLocaleTimeString('id-ID')}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}

      {!photo ? (
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadText}>📷 Pilih Foto dari Galeri</Text>
        </TouchableOpacity>
      ) : (
        <Image source={{ uri: photo }} style={styles.preview} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { color: '#fff', fontSize: 16, marginBottom: 8 },
  input: { backgroundColor: '#1e293b', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 16 },
  button: { backgroundColor: '#1e40af', padding: 15, borderRadius: 8, alignItems: 'center', marginVertical: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  uploadButton: { backgroundColor: '#1e40af', padding: 20, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  uploadText: { color: '#fff', fontSize: 18 },
  preview: { width: '100%', height: 300, borderRadius: 12, marginTop: 20 },
});
