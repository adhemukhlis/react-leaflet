// earth radius
// MAX 6378 km
// MIN 6357 km
// AVG 6371 km
const earth_radius = 6371
const p = Math.PI / 180
export const getDistance = ({ lat1, lon1, lat2, lon2, unit = 'm' }) => {
	const a =
		0.5 -
		Math.cos((lat2 - lat1) * p) / 2 +
		(Math.cos(lat1 * p) * Math.cos(lat2 * p) * (1 - Math.cos((lon2 - lon1) * p))) / 2
	return (unit === 'km' ? 2 : 2000) * earth_radius * Math.asin(Math.sqrt(a))
}
export const addDistance = (prop, { lat, lon }, meter) => {
	const pi = Math.PI
	const cos = Math.cos
	const m = 1 / (((2 * pi) / 360) * earth_radius) / 1000
	const result = prop === 'lat' ? lat + meter * m : lon + (meter * m) / cos(lat * p)
	return result
}
