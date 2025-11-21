import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function MagnitudeBarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
      .then((res) => res.json())
      .then((json) => {
        const quakes = json.features;

        const bins = {
          "0-2.5": 0,
          "2.5-4.5": 0,
          "4.5-6.0": 0,
          "6+": 0,
        };

        quakes.forEach((q) => {
          const mag = q.properties.mag;

          if (mag <= 2.5) bins["0-2.5"]++;
          else if (mag <= 4.5) bins["2.5-4.5"]++;
          else if (mag <= 6.0) bins["4.5-6.0"]++;
          else bins["6+"]++;
        });

        const graphData = Object.keys(bins).map((k) => ({
          range: k,
          count: bins[k],
        }));

        setData(graphData);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Earthquakes by Magnitude</h2>

      {/* Responsive Wrapper */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
