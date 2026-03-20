import { useState } from "react";

export default function Home() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [result, setResult] = useState("");

  const generate = () => {
    if (!destination || !days) {
      alert("Please fill in destination and number of days.");
      return;
    }

    setResult(`✨ ${days}-Day Trip to ${destination}

Day 1: Arrival + Explore city
Day 2: Main attractions + food trip
Day 3: Free day / shopping
Day ${days}: Departure`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: 24,
            padding: 32,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "inline-block",
                background: "#e8f0ff",
                color: "#1f4ed8",
                padding: "8px 14px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              FREE TRAVEL PLANNER
            </div>

            <h1
              style={{
                fontSize: 42,
                margin: 0,
                color: "#111827",
                lineHeight: 1.1,
              }}
            >
              IRIS Travel Planner ✈️
            </h1>

            <p
              style={{
                color: "#4b5563",
                fontSize: 18,
                marginTop: 12,
                marginBottom: 0,
                maxWidth: 700,
              }}
            >
              Generate a quick travel itinerary, then send users to hotel and
              flight booking links.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr auto",
              gap: 12,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <input
              placeholder="Destination (e.g. Tokyo, Sydney, Taipei)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              style={{
                padding: 14,
                borderRadius: 12,
                border: "1px solid #d1d5db",
                fontSize: 16,
                outline: "none",
              }}
            />

            <input
              placeholder="Days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              style={{
                padding: 14,
                borderRadius: 12,
                border: "1px solid #d1d5db",
                fontSize: 16,
                outline: "none",
              }}
            />

            <button
              onClick={generate}
              style={{
                padding: "14px 20px",
                background: "#111827",
                color: "white",
                border: "none",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Generate
            </button>
          </div>

          {result && (
            <div
              style={{
                marginTop: 24,
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: 18,
                padding: 24,
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: 14,
                  fontSize: 22,
                  color: "#111827",
                }}
              >
                Suggested Itinerary
              </h2>

              <pre
                style={{
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  fontFamily: "Arial, sans-serif",
                  lineHeight: 1.7,
                  color: "#374151",
                  fontSize: 16,
                }}
              >
                {result}
              </pre>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginTop: 28,
            }}
          >
            <a
              href="https://www.agoda.com/"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 18,
                padding: 20,
                color: "#111827",
                boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>🏨</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Book Hotels</div>
              <div style={{ color: "#6b7280", marginTop: 6 }}>
                Send users to hotel booking options
              </div>
            </a>

            <a
              href="https://www.skyscanner.com/"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 18,
                padding: 20,
                color: "#111827",
                boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>✈️</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Search Flights</div>
              <div style={{ color: "#6b7280", marginTop: 6 }}>
                Send users to flight search options
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
