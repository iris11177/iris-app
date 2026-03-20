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
Day 1:
Morning:
Afternoon:
Evening:

Make it practical and realistic.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    console.log("OPENAI RESPONSE:", JSON.stringify(data));

    if (!data.choices || !data.choices.length) {
      return res.status(500).json({
        error: "No response from OpenAI",
        debug: data,
      });
    }

    const result = data.choices[0].message.content;

    res.status(200).json({ result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
}
