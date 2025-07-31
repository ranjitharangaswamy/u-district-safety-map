// Map Configuration
export const MAP_CONFIG = {
  DEFAULT_CENTER: { lat: 47.6584, lng: -122.3088 },
  DEFAULT_ZOOM: 15,
  TILE_LAYER_URL: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  TILE_LAYER_ATTRIBUTION: '© OpenStreetMap contributors, © CartoDB',
  TILE_LAYER_SUBDOMAINS: 'abcd',
  MAX_ZOOM: 19
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  INCIDENTS: 'u-district-safety-incidents'
} as const;

// UI Configuration
export const UI_CONFIG = {
  MODAL_Z_INDEX: 9999,
  MAP_Z_INDEX: 1,
  TEMP_MARKER_ANIMATION_DURATION: 1500,
  CLEAR_MARKER_DELAY: 100
} as const;

// Default Location for Random Reports
export const DEFAULT_LOCATION = {
  BASE_LAT: 47.6584,
  BASE_LNG: -122.3088,
  RANDOM_OFFSET: 0.01
} as const; 