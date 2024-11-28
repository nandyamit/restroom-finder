import { useState, useEffect } from "react";

interface Restroom {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

interface RestroomSearchProps {
  lat: number;
  lon: number;
}

interface RestroomResponse {
  elements: {
    id: number;
    lat: number;
    lon: number;
    tags: {
      name?: string;
    };
  }[];
}

function RestroomQuery({ lat, lon }: RestroomSearchProps) {
  const [restrooms, setRestrooms] = useState<Restroom[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lat && lon) {
      const fetchRestrooms = async () => {
        setError(null);
        try {
          const bRoomQuery = `[out:json];
          node["amenity"="toilets"](around:2000, ${lat}, ${lon});
          out;`;
          const apiUrl = "https://overpass-api.de/api/interpreter";
          const url = `${apiUrl}?data=${encodeURIComponent(bRoomQuery)}`;

          const response = await fetch(url);

          if (!response.ok) {
            throw new Error("Fetch restrooms failed.");
          }

          const data: RestroomResponse = await response.json();

          const restrooms = data.elements.map((item) => ({
            id: item.id.toString(),
            name: item.tags.name || "Nameless Restroom",
            lat: item.lat,
            lon: item.lon,
          }));

          setRestrooms(restrooms);
        } catch (error) {
          setError((error as Error).message);
        }
      };
      fetchRestrooms();
    }
  }, [lat, lon]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {restrooms.length === 0 && !error && (
        <p>No restrooms found in this area.</p>
      )}
      <ul>
        {restrooms.map((restroom) => (
          <li key={restroom.id}>
            {restroom.name} - Coordinates: {restroom.lat}, {restroom.lon}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestroomQuery;
