export default async function handler(req, res) {
  try {
    const { destination, arrival, departure, travelers, budget, pace } = req.body;

    const prompt = `
Create a detailed travel itinerary.

Destination: ${destination}
Dates: ${arrival} to ${departure}
Travelers: ${travelers}
Budget: ${budget}
Pace: ${pace}

Format:
- Day by day
- Morning / Afternoon / Evening
- Include food, transport tips, realistic flow
`;

    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: prompt }
        ],
      }),
    });

    const data = await completion.json();

    const result = data.choices?.[0]?.message?.content || "No response";

    res.status(200).json({ result });

  } catch (error) {
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
}
