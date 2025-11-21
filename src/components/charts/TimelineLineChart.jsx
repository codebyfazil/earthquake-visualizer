import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function TimelineLineChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    )
      .then((res) => res.json())
      .then((json) => {
        const quakes = json.features;

        const hourlyData = {};

        quakes.forEach((q) => {
          const time = new Date(q.properties.time);
          const hour = time.getHours();
          hourlyData[hour] = (hourlyData[hour] || 0) + 1;
        });

        const graphData = Object.keys(hourlyData).map((h) => ({
          hour: `${h}:00`,
          count: hourlyData[h],
        }));

        setData(graphData);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">
        Earthquakes Over Time (Last 24 Hours)
      </h2>

      {/* FULL RESPONSIVE CONTAINER */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#ff4500" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
