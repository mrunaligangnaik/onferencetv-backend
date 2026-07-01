const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateEmail = async (req, res) => {
  try {
    const { objective, audience, cta } = req.body;

    if (!objective || !audience) {
      return res.status(400).json({ message: "Objective and audience are required." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an email copywriter who writes short, scannable outreach emails — NOT long marketing paragraphs.

Campaign objective: ${objective}
Audience: ${audience}
CTA: ${cta || "Learn More"}

Write the email body following this EXACT structure and nothing else — no extra filler lines, no extra sentences between sections:

Dear Dr. [Last Name],
[ONE short sentence introducing what this is about — max 20 words]
[Short heading like "Why join?" or "Why attend?"]
- [benefit, max 6 words]
- [benefit, max 6 words]
- [benefit, max 6 words]
- [benefit, max 6 words]
[Only include these two lines IF the objective mentions a specific event/date/time, otherwise skip both entirely:]
📅 Date: [date]
🕒 Time: [time]
👉 [CTA text]
Best Regards,
OnferenceTV Team

EXAMPLE of correct output (for reference on tone/length only, do not copy content):
"Dear Dr. [Last Name],
We are excited to introduce a new program created specifically for OBGYN professionals to support clinical excellence and professional growth.
Why join?
- Enhance patient care strategies
- Network with leading specialists
- Access exclusive educational resources
- Support your professional development
👉 Apply Now
Best Regards,
OnferenceTV Team"

STRICT RULES:
- Do NOT add any sentence between the bullets and the CTA line (no "Ready to take the next step?" or similar filler)
- Do NOT add closing sentences after the CTA and before "Best Regards,"
- Do NOT use adjectives like "groundbreaking" or "innovative"
- Bullets must be short phrases, not full sentences, max 6 words each
- Only 4 bullets, no more no less
- Use \\n for every line break shown above, so it renders as separate lines
- If objective does not mention a date/time/event, skip the 📅/🕒 lines entirely — do not invent one

Respond ONLY with valid JSON in this exact shape, no markdown, no backticks, no extra commentary:
{
  "subject": "short compelling subject line, under 8 words",
  "preview": "one line preview text, under 12 words",
  "content": "the full email body with \\n line breaks as described above",
  "cta": "short cta button text, 2-4 words"
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    res.json(parsed);
  } catch (err) {
    console.error("Gemini generation error:", err);
    res.status(500).json({ message: "Failed to generate email. Check server logs." });
  }
};