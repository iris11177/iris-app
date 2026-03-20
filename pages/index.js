import { useState } from "react";

export default function Home() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [result, setResult] = useState("");

  const generate = () => {
    if (!destination || !days) return alert("Fill all fields");

    setResult(`✨ ${days}-Day Trip to ${destination}

Day 1: Arrival + Explore city
Day 2: Main attractions + food trip
Day 3: Free day / shopping
Day ${days}: Departure`);
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>IRIS Travel Planner ✈️</h1>

      <div style={{ marginTop: 20 }}>
        <input
          placeholder="Destination (e.g. Japan)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ padding: 10, marginRight: 10 }}
        />

        <input
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          style={{ padding: 10, width: 80 }}
        />
      </div>

      <button
        onClick={generate}
        style={{
          marginTop: 20,
          padding: 10,
          background: "black",
          color: "white",
          borderRadius: 5,
        }}
      >
        Generate Itinerary
      </button>

      {result && (
        <pre style={{ marginTop: 30, background: "#f5f5f5", padding: 20 }}>
          {result}
        </pre>
      )}

      <div style={{ marginTop: 40 }}>
        <a
          href="https://www.agoda.com/"
          target="_blank"
          style={{ marginRight: 20 }}
        >
          🏨 Book Hotels
        </a>

        <a href="https://www.skyscanner.com/" target="_blank">
          ✈️ Search Flights
        </a>
      </div>
    </div>
  );
}
