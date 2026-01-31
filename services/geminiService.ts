import { GoogleGenAI } from "@google/genai";
import { WishRequest } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateBirthdayWish = async (request: WishRequest): Promise<string> => {
  const ai = getClient();
  
  const prompt = `
    Write a ${request.tone.toLowerCase()} birthday wish for ${request.name}.
    Relationship: ${request.relationship}.
    ${request.hobbies ? `Hobbies/Interests: ${request.hobbies}.` : ''}
    Keep it engaging, warm, and appropriate for a birthday card.
    Max length: 50 words.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text || "Happy Birthday! Wishing you a fantastic day!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Happy Birthday! Wishing you all the best on your special day!";
  }
};
