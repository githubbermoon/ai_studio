
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askMLAssistant(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a senior Machine Learning Engineer and Data Scientist. Provide expert, technical, yet accessible answers about ML projects, architectures, and theoretical concepts. Focus on practical implementation details if asked.",
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Could not connect to the AI assistant. Please check your network.";
  }
}

export async function summarizeProject(description: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a 2-sentence highly technical summary for this ML project: ${description}`,
    });
    return response.text;
  } catch (error) {
    return description;
  }
}
