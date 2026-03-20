export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { destination, arrival, departure, travelers, budget, pace } = req.body;

  const prompt = `
Create a detailed travel itinerary.

Destination: ${destination}
Arrival: ${arrival}
Departure: ${departure}
Travelers: ${travelers}
Budget: ${budget}
Pace: ${pace}

Format:
Day 1:
Morning:
Afternoon:
Evening:

Be realistic, specific, and useful.
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    const text = data.choices[0].message.content;

    res.status(200).json({ result: text });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
}
