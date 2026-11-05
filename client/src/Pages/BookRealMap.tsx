import { Fragment } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  Polyline,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Point = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

type Props = {
  user: { lat: number; lng: number };
  points: Point[];
  activeId: string | null;
  setActiveId: (id: string | null) => void;
};

const BookRealMap = ({ user, points, activeId, setActiveId }: Props) => (
  <MapContainer
    center={[user.lat, user.lng]}
    zoom={13}
    style={{ height: 380, width: "100%", borderRadius: 16 }}
  >
    <TileLayer
      attribution="&copy; OpenStreetMap"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    <Marker position={[user.lat, user.lng]}>
      <Popup>📍 אתה כאן</Popup>
    </Marker>

    {points.map((point) => (
      <Fragment key={point.id}>
        <Polyline
          positions={[
            [user.lat, user.lng],
            [point.lat, point.lng],
          ]}
          pathOptions={{
            weight: activeId === point.id ? 6 : 3,
            opacity: activeId === point.id ? 1 : 0.5,
          }}
        />
        <Marker
          position={[point.lat, point.lng]}
          eventHandlers={{
            mouseover: () => setActiveId(point.id),
            mouseout: () => setActiveId(null),
          }}
        >
          <Popup>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700 }}>{point.name}</div>
            </div>
          </Popup>
        </Marker>
      </Fragment>
    ))}
  </MapContainer>
);

export default BookRealMap;
