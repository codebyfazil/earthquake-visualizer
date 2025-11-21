import React from "react";
import Navbar from "./components/Navbar.jsx";
import EarthquakeMap from "./components/EarthquakeMap.jsx";

// charts
import MagnitudeBarChart from "./components/charts/MagnitudeBarChart.jsx";
import DepthPieChart from "./components/charts/DepthPieChart.jsx";
import TimelineLineChart from "./components/charts/TimelineLineChart.jsx";

function App() {
  return (
    <>
      <Navbar />

      <div className="pt-5">
        {/* Home Section */}
        <section id="home" className="px-4 md:px-10 lg:px-20">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
            Global Earthquake Map
          </h1>
        </section>

        {/* Earthquake Map */}
        <section id="earthquakes" className="p-4 md:p-6 lg:p-10">
          <EarthquakeMap />
        </section>

        {/* Visualizations */}
        <section
          id="visualization"
          className="p-6 md:p-10 lg:p-16 bg-gray-100"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center md:text-left">
            Earthquake Visualizations
          </h1>

          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              lg:grid-cols-3 
              gap-6
            "
          >
            <MagnitudeBarChart />
            <DepthPieChart />
            <TimelineLineChart />
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
