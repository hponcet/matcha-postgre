import GoogleMaps from '@google/maps'

export const GoogleMapsClient = GoogleMaps.createClient({ key: process.env.GOOGLE_MAPS_API_KEY })
