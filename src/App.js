import './App.css'
import Map from './components/Map'
import { addDistance, getDistance } from './components/Map/map-util'

function App() {
	const center_point = { lat: -7.424453, lon: 109.230124 }
	const meter_radius = 58
	const rect_bonds = [
		[addDistance('lat', center_point, meter_radius), addDistance('lon', center_point, meter_radius)],
		[addDistance('lat', center_point, meter_radius * -1), addDistance('lon', center_point, meter_radius * -1)]
	]
	const coordinates = [
		{ lat: -7.423931393468567, lon: 109.230124 },
		{ lat: -7.423931393468567, lon: 109.23065001659991 }
	]

	const coordinates_with_distance = coordinates.map((coordinate, index) => {
		const distanceFromCenterOfRadius = getDistance({
			lat1: center_point.lat,
			lon1: center_point.lon,
			lat2: coordinate.lat,
			lon2: coordinate.lon
		})
		return { ...coordinate, distance: distanceFromCenterOfRadius }
	})
	return (
		<div className="App">
			<Map width="800" height="480" center={[center_point.lat, center_point.lon]} zoom={18}>
				{({ TileLayer, Marker, Popup, Circle, Rectangle, Tooltip }) => (
					<>
						<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
						<Marker position={[center_point.lat, center_point.lon]}>
							<Popup>center</Popup>
						</Marker>
						<Rectangle bounds={rect_bonds} color={'red'}>
							<Tooltip direction="left" offset={[-100, -100]} opacity={1} permanent>
								<div
									style={{
										backgroundColor: '#191970',
										padding: '1rem',
										borderRadius: '0.4rem',
										color: '#fff',
										display: 'flex',
										alignItems: 'flex-start',
										flexDirection: 'column'
									}}>
									<span>{`Location : ${center_point.lat}, ${center_point.lon}`}</span>
									<span>{`Radius : ${meter_radius} meter`}</span>
								</div>
							</Tooltip>
						</Rectangle>
						<Circle center={[center_point.lat, center_point.lon]} radius={meter_radius} pathOptions={{ color: 'blue' }} />
						{coordinates_with_distance.map((coordinate, index) => (
							<Marker position={[coordinate.lat, coordinate.lon]}>
								<Popup>
									<div
										style={{
											backgroundColor: '#191970',
											padding: '1rem',
											borderRadius: '0.4rem',
											color: '#fff',
											display: 'flex',
											alignItems: 'flex-start',
											flexDirection: 'column'
										}}>
										<span>{`marker ${index + 1}`}</span>
										<span>{`Location : ${coordinate.lat.toFixed(6)}, ${coordinate.lon.toFixed(6)}`}</span>
										<span>{`distance ${Math.round(coordinate.distance)} meter`}</span>
										<span>
											{`are the coordinates inside the blue zone?`}{' '}
											{Math.round(coordinate.distance) <= meter_radius ? 'yes' : 'no'}
										</span>
									</div>
								</Popup>
							</Marker>
						))}
					</>
				)}
			</Map>
		</div>
	)
}

export default App
