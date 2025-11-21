import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

export default function DepthPieChart() {
  const [data, setData] = useState([]);

  const COLORS = ["#34d399", "#60a5fa", "#f87171"];

  useEffect(() => {
    fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    )
      .then((res) => res.json())
      .then((json) => {
        const quakes = json.features;

        let shallow = 0,
          intermediate = 0,
          deep = 0;

        quakes.forEach((q) => {
          const depth = q.geometry.coordinates[2];

          if (depth <= 70) shallow++;
          else if (depth <= 300) intermediate++;
          else deep++;
        });

        setData([
          { name: "Shallow (0–70km)", value: shallow },
          { name: "Intermediate (70–300km)", value: intermediate },
          { name: "Deep (300+ km)", value: deep },
        ]);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Earthquake Depth Categories</h2>

      <PieChart width={400} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, idx) => (
            <Cell key={idx} fill={COLORS[idx]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
