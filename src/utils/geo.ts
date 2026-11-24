export const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`);
    const data = await response.json();
    return data.display_name || `${lat}, ${lon}`;
  } catch {
    return `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
  }
};

export const getElevation = async (lat: number, lon: number): Promise<number> => {
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lon}`);
    const data = await response.json();
    return data.elevation || 0;
  } catch {
    return 0;
  }
};
