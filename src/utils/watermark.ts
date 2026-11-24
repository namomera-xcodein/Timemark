import { WatermarkData } from '../types';

export const generateWatermarkText = (data: WatermarkData): string => {
  return `${data.title}\n\n${data.dateTime}\n\nLokasi: ${data.location}\nLat: ${data.lat.toFixed(6)}\nLong: ${data.lon.toFixed(6)}\nAltitude: ${data.altitude} m\n\nKegiatan: ${data.activity}`;
};

export const formatWIT = (date: Date): string => {
  const witOffset = 8 * 60 * 60 * 1000;
  const witDate = new Date(date.getTime() + witOffset);
  return witDate.toLocaleString('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};
