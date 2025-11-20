import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize only if key exists to avoid runtime crash on load, 
// though actual calls will fail if key is missing.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateBlogContent = async (topic: string): Promise<string> => {
  if (!ai) {
    console.warn("Gemini API Key missing. Returning mock content.");
    return "API Key missing. Unable to generate content. Please configure process.env.API_KEY.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, avant-garde, abstract, and highly intellectual blog post section about "${topic}". 
      The tone should be futuristic, slightly cryptic, and design-focused. 
      Keep it under 150 words. 
      Do not use markdown formatting like bold or headers, just raw text paragraphs.`,
    });
    return response.text || "Content generation failed.";
  } catch (error) {
    console.error("Gemini generation error:", error);
    return "Static fallback content due to generation error.";
  }
};
