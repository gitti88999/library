import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

type Props = {
  lat: number;
  lng: number;
  onClick?: (lat: number, lng: number) => void;
};

const ClickHandler = ({
  onClick,
}: {
  onClick?: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(e) {
      onClick?.(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
};

const RecenterMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);

  return null;
};

const MiniMap = ({ lat, lng, onClick }: Props) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <ClickHandler onClick={onClick} />
      <RecenterMap lat={lat} lng={lng} />
    </MapContainer>
  );
};

export default MiniMap;