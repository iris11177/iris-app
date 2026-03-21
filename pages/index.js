import { useState } from "react";

const DESTINATIONS = {
  tokyo: {
    label: "Tokyo, Japan",
    country: "Japan",
    airport: "NRT / HND",
    dailyBudget: { budget: 4500, mid: 7000, premium: 12000 },
    hotelAreas: [
      { name: "Ueno", reason: "great value, easy train access" },
      { name: "Asakusa", reason: "traditional vibe, budget-friendly" },
      { name: "Shinjuku", reason: "nightlife, shopping, major transport hub" },
    ],
    highlights: [
      "Asakusa & Senso-ji",
      "Ueno Park",
      "Shibuya Crossing",
      "Meiji Shrine",
      "Shinjuku",
      "Tokyo Skytree",
      "Akihabara",
      "Tsukiji area",
      "Harajuku",
      "Odaiba",
    ],
    food: ["ramen", "sushi", "gyudon", "convenience store snacks"],
    transportTips: [
      "Use IC card for trains and convenience stores",
      "Stay near a JR or subway station",
      "Group nearby attractions on the same day",
    ],
  },
  taipei: {
    label: "Taipei, Taiwan",
    country: "Taiwan",
    airport: "TPE",
    dailyBudget: { budget: 3500, mid: 5500, premium: 9000 },
    hotelAreas: [
      { name: "Ximending", reason: "shopping, food, lively atmosphere" },
      { name: "Taipei Main Station", reason: "best transport access" },
      { name: "Zhongshan", reason: "cafes, shopping, stylish stay" },
    ],
    highlights: [
      "Taipei 101",
      "Ximending",
      "Chiang Kai-shek Memorial Hall",
      "Jiufen",
      "Shifen",
      "Yehliu",
      "Raohe Night Market",
      "Beitou",
      "Longshan Temple",
      "Elephant Mountain",
    ],
    food: ["beef noodles", "xiao long bao", "fried chicken", "night market snacks"],
    transportTips: [
      "Use EasyCard for MRT and buses",
      "Do Jiufen + Shifen together",
      "Stay near MRT for easier transfers",
    ],
  },
  sydney: {
    label: "Sydney, Australia",
    country: "Australia",
    airport: "SYD",
    dailyBudget: { budget: 6500, mid: 10000, premium: 15000 },
    hotelAreas: [
      { name: "CBD", reason: "central, walkable, transport access" },
      { name: "Haymarket", reason: "good value, near food and Central" },
      { name: "Surry Hills", reason: "cafes, local vibe, still accessible" },
    ],
    highlights: [
      "Circular Quay",
      "Sydney Opera House",
      "The Rocks",
      "Darling Harbour",
      "Bondi Beach",
      "Taronga Zoo",
      "Blue Mountains",
      "Queen Victoria Building",
      "Hyde Park",
      "Manly",
    ],
    food: ["fish and chips", "brunch", "meat pie", "Asian food in Haymarket"],
    transportTips: [
      "Use Opal for trains, ferries, and buses",
      "Group CBD attractions together",
      "Bondi and coastal walks need more time",
    ],
  },
  hanoi: {
    label: "Hanoi, Vietnam",
    country: "Vietnam",
    airport: "HAN",
    dailyBudget: { budget: 2500, mid: 4000, premium: 7000 },
    hotelAreas: [
      { name: "Old Quarter", reason: "best for first-timers and food" },
      { name: "Hoan Kiem", reason: "central and scenic" },
      { name: "French Quarter", reason: "cleaner, quieter, upscale feel" },
    ],
    highlights: [
      "Hoan Kiem Lake",
      "Old Quarter",
      "Train Street",
      "Temple of Literature",
      "Hoa Lo Prison",
      "Ninh Binh",
      "Ha Long Bay",
      "St. Joseph Cathedral",
      "Dong Xuan Market",
      "West Lake",
    ],
    food: ["pho", "bun cha", "egg coffee", "banh mi"],
    transportTips: [
      "Use Grab for easier city transfers",
      "Old Quarter is best for walkable stays",
      "Day trips like Ninh Binh or Ha Long take full days",
    ],
  },
};

function formatCurrency(value) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function nightsBetween(arrival, departure) {
  if (!arrival || !departure) return 0;
  const a = new Date(arrival);
  const d = new Date(departure);
  const diff = Math.round((d - a) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

function getDatesBetween(arrival, departure) {
  const dates = [];
  const start = new Date(arrival);
  const end = new Date(departure);

  if (isNaN(start) || isNaN(end)) return dates;

  let current = new Date(start);
  while (current < end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

function buildTripPlan({ destinationKey, arrival, departure, pace }) {
  const destination = DESTINATIONS[destinationKey];
  const tripDates = getDatesBetween(arrival, departure);
  const days = tripDates.length;

  if (!destination || days <= 0) {
    return { plan: [] };
  }

  const highlights = destination.highlights;

  const hotelArea =
    pace === "relaxed"
      ? destination.hotelAreas[0]
      : pace === "balanced"
      ? destination.hotelAreas[1] || destination.hotelAreas[0]
      : destination.hotelAreas[2] || destination.hotelAreas[0];

  const plan = [];

  for (let i = 0; i < days; i++) {
    const dayNumber = i + 1;
    const isArrivalDay = i === 0;
    const isDepartureDay = i === days - 1;

    if (isArrivalDay) {
      plan.push({
        day: dayNumber,
        title: "Arrival + Easy Start",
        morning: `Arrival at ${destination.airport}. Immigration, baggage claim, airport transfer, and check-in near ${hotelArea.name}.`,
        afternoon: `Light exploration around ${hotelArea.name}. Start with ${highlights[0]} if energy allows.`,
        evening: `Simple dinner and early rest. Try local ${destination.food[0]} or ${destination.food[1]}.`,
      });
      continue;
    }

    if (isDepartureDay) {
      plan.push({
        day: dayNumber,
        title: "Departure Day",
        morning: `Breakfast, final packing, and last short walk near ${hotelArea.name}.`,
        afternoon: `Check out and airport transfer.`,
        evening: `Departure flight.`,
      });
      continue;
    }

    const morningSpot = highlights[(i * 2 - 1) % highlights.length];
    const afternoonSpot = highlights[(i * 2) % highlights.length];
    const eveningFood = destination.food[i % destination.food.length];

    let title = "City Exploration Day";
    if (pace === "fast") title = "Packed Sightseeing Day";
    if (pace === "relaxed") title = "Relaxed Exploration Day";

    plan.push({
      day: dayNumber,
      title,
      morning: `Visit ${morningSpot}. Best to start early and avoid crowds.`,
      afternoon: `Continue to ${afternoonSpot}. Add nearby shopping, cafes, or photo stops.`,
      evening: `Dinner focus: try ${eveningFood}. Return to ${hotelArea.name} or enjoy a nearby night area.`,
    });
  }

  return { plan };
}

export default function Home() {
  const [destinationKey, setDestinationKey] = useState("tokyo");
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [budgetLevel, setBudgetLevel] = useState("mid");
  const [pace, setPace] = useState("balanced");
  const [generated, setGenerated] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);

  const destination = DESTINATIONS[destinationKey];
  const nights = nightsBetween(arrival, departure);

  const estimatedHotelPerNight =
    budgetLevel === "budget"
      ? destination.dailyBudget.budget
      : budgetLevel === "premium"
      ? destination.dailyBudget.premium
      : destination.dailyBudget.mid;

  const estimatedHotelTotal = nights * estimatedHotelPerNight;
  const estimatedDailyFoodTransport =
    budgetLevel === "budget" ? 1200 : budgetLevel === "premium" ? 2800 : 1800;
  const estimatedTripExtras =
    nights * estimatedDailyFoodTransport * Number(travelers || 1);
  const estimatedTotal = estimatedHotelTotal + estimatedTripExtras;

  const hotelSearchUrl = `https://www.agoda.com/search?textToSearch=${encodeURIComponent(
    destination.label
  )}`;
  const flightSearchUrl = `https://www.skyscanner.com/transport/flights-to/${encodeURIComponent(
    destination.country
  )}`;

  const generatePlan = async () => {
    if (!arrival || !departure) {
      alert("Please select dates");
      return;
    }

    if (nights <= 0) {
      alert("Departure date must be after arrival date.");
      return;
    }

    setLoading(true);
    setGenerated(false);
    setAiResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination: destination.label,
          arrival,
          departure,
          travelers,
          budget: budgetLevel,
          pace,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("AI failed");
      }

      setAiResult(data.result || "No itinerary returned.");
    } catch (err) {
      const fallback = buildTripPlan({
        destinationKey,
        arrival,
        departure,
        pace,
      });

      const text = fallback.plan
        .map((d) => {
          return `Day ${d.day} - ${d.title}
Morning: ${d.morning}
Afternoon: ${d.afternoon}
Evening: ${d.evening}`;
        })
        .join("\n\n");

      setAiResult(
        "⚠️ AI unavailable (quota reached)\n\nHere’s your smart itinerary:\n\n" + text
      );
    }

    setGenerated(true);
    setLoading(false);
  };

  const copyAiItinerary = async () => {
    if (!aiResult) return;
    try {
      await navigator.clipboard.writeText(aiResult);
      alert("Itinerary copied!");
    } catch {
      alert("Failed to copy itinerary");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f7faff 0%, #edf3ff 100%)",
        fontFamily: "Arial, sans-serif",
        padding: "32px 16px 60px",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div
          style={{
            background: "#ffffff",
            borderRadius: 28,
            padding: 28,
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "inline-block",
                background: "#e8f0ff",
                color: "#1d4ed8",
                padding: "8px 14px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.3,
                marginBottom: 14,
              }}
            >
              REAL TRAVEL PLANNER MVP
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 46,
                lineHeight: 1.05,
                color: "#0f172a",
              }}
            >
              IRIS Travel Planner ✈️
            </h1>

            <p
              style={{
                marginTop: 12,
                marginBottom: 0,
                fontSize: 18,
                color: "#475569",
                maxWidth: 820,
                lineHeight: 1.6,
              }}
            >
              Build a practical day-by-day itinerary with dates, travel style,
              budget feel, hotel area suggestions, and booking links.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
              gap: 14,
            }}
          >
            <div style={{ gridColumn: "span 2" }}>
              <label style={labelStyle}>Destination</label>
              <select
                value={destinationKey}
                onChange={(e) => setDestinationKey(e.target.value)}
                style={inputStyle}
              >
                <option value="tokyo">Tokyo, Japan</option>
                <option value="taipei">Taipei, Taiwan</option>
                <option value="sydney">Sydney, Australia</option>
                <option value="hanoi">Hanoi, Vietnam</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Arrival</label>
              <input
                type="date"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Departure</label>
              <input
                type="date"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Travelers</label>
              <input
                type="number"
                min="1"
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Trip Pace</label>
              <select
                value={pace}
                onChange={(e) => setPace(e.target.value)}
                style={inputStyle}
              >
                <option value="relaxed">Relaxed</option>
                <option value="balanced">Balanced</option>
                <option value="fast">Fast-paced</option>
              </select>
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <label style={labelStyle}>Budget Style</label>
              <select
                value={budgetLevel}
                onChange={(e) => setBudgetLevel(e.target.value)}
                style={inputStyle}
              >
                <option value="budget">Budget</option>
                <option value="mid">Mid-range</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            <div style={{ gridColumn: "span 4" }}>
              <label style={labelStyle}>Trip Snapshot</label>
              <div
                style={{
                  ...inputStyle,
                  display: "flex",
                  alignItems: "center",
                  background: "#f8fafc",
                  color: "#334155",
                  fontWeight: 600,
                }}
              >
                {destination.label} · {nights || 0} night(s) · {travelers} traveler(s)
              </div>
            </div>

            <div style={{ gridColumn: "span 6" }}>
              <button onClick={generatePlan} style={buttonStyle}>
                {loading ? "Generating..." : "Generate Real Itinerary"}
              </button>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 0.9fr",
              gap: 18,
              marginTop: 26,
            }}
          >
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e5e7eb",
                borderRadius: 22,
                padding: 22,
              }}
            >
              <h2 style={sectionTitle}>Trip Overview</h2>
              <div style={{ color: "#334155", lineHeight: 1.8, fontSize: 16 }}>
                <div>
                  <strong>Destination:</strong> {destination.label}
                </div>
                <div>
                  <strong>Airport:</strong> {destination.airport}
                </div>
                <div>
                  <strong>Recommended stay areas:</strong>{" "}
                  {destination.hotelAreas.map((area) => area.name).join(", ")}
                </div>
                <div>
                  <strong>Travel style:</strong> {pace} / {budgetLevel}
                </div>
                <div>
                  <strong>Suggested food focus:</strong>{" "}
                  {destination.food.join(", ")}
                </div>
              </div>
            </div>

            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e5e7eb",
                borderRadius: 22,
                padding: 22,
              }}
            >
              <h2 style={sectionTitle}>Estimated Budget</h2>
              <div style={{ color: "#334155", lineHeight: 1.9, fontSize: 16 }}>
                <div>
                  <strong>Hotel total:</strong> {formatCurrency(estimatedHotelTotal)}
                </div>
                <div>
                  <strong>Food + local transport:</strong> {formatCurrency(estimatedTripExtras)}
                </div>
                <div>
                  <strong>Estimated subtotal:</strong> {formatCurrency(estimatedTotal)}
                </div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 8 }}>
                  Flight costs not yet included in this MVP.
                </div>
              </div>
            </div>
          </div>

          {loading && (
            <div
              style={{
                marginTop: 20,
                background: "#ffffff",
                padding: 20,
                borderRadius: 16,
                border: "1px solid #e5e7eb",
                fontWeight: "bold",
                color: "#0f172a",
              }}
            >
              Generating AI itinerary...
            </div>
          )}

          {generated && aiResult && (
            <div
              style={{
                marginTop: 20,
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 22,
                padding: 22,
              }}
            >
              <h2 style={sectionTitle}>AI Generated Itinerary</h2>

              <button
                onClick={copyAiItinerary}
                style={{
                  marginBottom: 16,
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "none",
                  background: "#1d4ed8",
                  color: "white",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                📋 Copy Itinerary
              </button>

              <div
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.8,
                  color: "#334155",
                  fontSize: 16,
                }}
              >
                {aiResult}
              </div>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 16,
              marginTop: 20,
            }}
          >
            <div style={infoCardStyle}>
              <h3 style={smallCardTitle}>Best Hotel Areas</h3>
              {destination.hotelAreas.map((area) => (
                <div key={area.name} style={bulletLineStyle}>
                  • <strong>{area.name}</strong> — {area.reason}
                </div>
              ))}
            </div>

            <div style={infoCardStyle}>
              <h3 style={smallCardTitle}>Transport Tips</h3>
              {destination.transportTips.map((tip, index) => (
                <div key={index} style={bulletLineStyle}>
                  • {tip}
                </div>
              ))}
            </div>

            <div style={infoCardStyle}>
              <h3 style={smallCardTitle}>Book the Trip</h3>
              <a
                href={hotelSearchUrl}
                target="_blank"
                rel="noreferrer"
                style={bookingButtonStyle}
              >
                🏨 Search Hotels
              </a>
              <a
                href={flightSearchUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  ...bookingButtonStyle,
                  background: "#0f172a",
                  color: "#ffffff",
                }}
              >
                ✈️ Search Flights
              </a>
              <div style={{ color: "#64748b", fontSize: 13, marginTop: 10 }}>
                Replace these with your affiliate links later.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: 8,
  fontSize: 13,
  fontWeight: 700,
  color: "#334155",
};

const inputStyle = {
  width: "100%",
  padding: 14,
  borderRadius: 14,
  border: "1px solid #d1d5db",
  fontSize: 15,
  outline: "none",
  boxSizing: "border-box",
  background: "#ffffff",
};

const buttonStyle = {
  width: "100%",
  padding: "16px 18px",
  background: "#0f172a",
  color: "#ffffff",
  border: "none",
  borderRadius: 14,
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
};

const sectionTitle = {
  marginTop: 0,
  marginBottom: 14,
  fontSize: 24,
  color: "#0f172a",
};

const infoCardStyle = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: 18,
  padding: 18,
};

const smallCardTitle = {
  marginTop: 0,
  marginBottom: 12,
  fontSize: 18,
  color: "#0f172a",
};

const bulletLineStyle = {
  color: "#334155",
  fontSize: 15,
  lineHeight: 1.7,
  marginBottom: 6,
};

const bookingButtonStyle = {
  display: "block",
  textDecoration: "none",
  background: "#eff6ff",
  color: "#1d4ed8",
  borderRadius: 12,
  padding: "12px 14px",
  fontWeight: 700,
  marginBottom: 10,
};
