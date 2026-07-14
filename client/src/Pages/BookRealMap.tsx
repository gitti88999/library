// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import { Fragment } from "react";
// import "leaflet/dist/leaflet.css";

// type Point = {
//   id: string;
//   name: string;
//   lat: number;
//   lng: number;
// };

// type Props = {
//   user: { lat: number; lng: number };
//   points: Point[];
// };

// const BookRealMap = ({ user, points }: Props) => {
//   return (
//     <MapContainer
//       center={[user.lat, user.lng]}
//       zoom={13}
//       style={{ height: 350, width: "100%", borderRadius: 12 }}
//     >
//       <TileLayer
//         attribution="&copy; OpenStreetMap"
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       {/* USER */}
//       <Marker position={[user.lat, user.lng]}>
//         <Popup>אתה כאן</Popup>
//       </Marker>

//       {/* POINTS */}
//       {points?.map((p) => (
//         <Fragment key={p.id}>
//           <Marker position={[p.lat, p.lng]}>
//             <Popup>{p.name}</Popup>
//           </Marker>

//           <Polyline
//             positions={[
//               [user.lat, user.lng],
//               [p.lat, p.lng],
//             ]}
//           />
//         </Fragment>
//       ))}
//     </MapContainer>
//   );
// };

// export default BookRealMap;
// import { useEffect, useState, Fragment } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// type Point = {
//   id: string;
//   name: string;
//   lat: number;
//   lng: number;
// };

// type Props = {
//   user: { lat: number; lng: number };
//   points: Point[];
// };

// const BookRealMap = ({ user, points }: Props) => {
//   const [addresses, setAddresses] = useState<Record<string, string>>({});

//   useEffect(() => {
//     const load = async () => {
//       const result: Record<string, string> = {};

//       for (const p of points) {
//         try {
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${p.lat}&lon=${p.lng}`
//           );
//           const data = await res.json();
//           result[p.id] = data.display_name || "כתובת לא זמינה";
//         } catch {
//           result[p.id] = "כתובת לא זמינה";
//         }
//       }

//       setAddresses(result);
//     };

//     if (points.length) load();
//   }, [points]);

//   return (
//     <MapContainer
//       center={[user.lat, user.lng]}
//       zoom={13}
//       style={{ height: 380, width: "100%", borderRadius: 16 }}
//     >
//       <TileLayer
//         attribution="&copy; OpenStreetMap"
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       {/* USER */}
//       <Marker position={[user.lat, user.lng]}>
//         <Popup>📍 אתה כאן</Popup>
//       </Marker>

//       {/* POINTS */}
//       {points.map((p) => (
//         <Fragment key={p.id}>
//           <Polyline
//             positions={[
//               [user.lat, user.lng],
//               [p.lat, p.lng],
//             ]}
//           />

//           <Marker position={[p.lat, p.lng]}>
//             <Popup>
//               <div style={{ textAlign: "right", minWidth: 180 }}>
//                 <div style={{ fontWeight: 700 }}>👤 {p.name}</div>
//                 <div style={{ fontSize: 12, marginTop: 4 }}>
//                   {addresses[p.id] ?? "טוען כתובת..."}
//                 </div>
//               </div>
//             </Popup>
//           </Marker>
//         </Fragment>
//       ))}
//     </MapContainer>
//   );
// };

// export default BookRealMap;
import { Fragment } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
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

const BookRealMap = ({
  user,
  points,
  activeId,
  setActiveId,
}: Props) => {
  return (
    <MapContainer
      center={[user.lat, user.lng]}
      zoom={13}
      style={{ height: 380, width: "100%", borderRadius: 16 }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* USER */}
      <Marker position={[user.lat, user.lng]}>
        <Popup>📍 אתה כאן</Popup>
      </Marker>

      {/* POINTS */}
      {points.map((p) => (
        <Fragment key={p.id}>
          <Polyline
            positions={[
              [user.lat, user.lng],
              [p.lat, p.lng],
            ]}
            pathOptions={{
              weight: activeId === p.id ? 6 : 3,
              opacity: activeId === p.id ? 1 : 0.5,
            }}
          />

          <Marker
            position={[p.lat, p.lng]}
            eventHandlers={{
              mouseover: () => setActiveId(p.id),
              mouseout: () => setActiveId(null),
            }}
          >
            <Popup>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700 }}>{p.name}</div>
              </div>
            </Popup>
          </Marker>
        </Fragment>
      ))}
    </MapContainer>
  );
};

export default BookRealMap;