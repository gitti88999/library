import { useEffect, useRef } from "react";
import L from "leaflet";

interface Props {
  lat: number;
  lng: number;
}

const MiniMap: React.FC<Props> = ({ lat, lng }) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // יצירת מפה פעם אחת בלבד
    if (!mapRef.current) {
      mapRef.current = L.map(containerRef.current).setView([lat, lng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(mapRef.current);

      L.marker([lat, lng]).addTo(mapRef.current);
    } else {
      // עדכון מיקום
      mapRef.current.setView([lat, lng], 13);
    }
  }, [lat, lng]);

  return (
    <div
      ref={containerRef}
      style={{ height: 180, width: "100%", borderRadius: 10 }}
    />
  );
};

export default MiniMap;