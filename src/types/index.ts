export interface PhotoMetadata {
  timestamp: string;
  location: string;
  latitude: number;
  longitude: number;
  altitude?: number;
  activity: string;
  weekday: string;
}

export interface WatermarkData {
  title: string;
  dateTime: string;
  location: string;
  lat: number;
  lon: number;
  altitude: number;
  activity: string;
}
