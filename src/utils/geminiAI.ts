
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyBDWoe2-Teleq6o6ZkSmzC2fnfLUEbO1qw';
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateSchemeResponse = async (userMessage: string, language: string = 'english') => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `You are a Government Schemes Assistant for India. Respond in ${language === 'hindi' ? 'Hindi' : 'English'}.
    
    User query: ${userMessage}
    
    Please provide helpful information about government schemes, eligibility criteria, benefits, and application processes. 
    Keep responses concise, helpful, and specific to Indian government schemes.
    If asked about scheme categories, list relevant schemes for that category.
    Always include practical next steps or application links when relevant.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini AI Error:', error);
    return language === 'hindi' 
      ? 'माफ़ करें, कुछ तकनीकी समस्या है। कृपया फिर से कोशिश करें।'
      : 'Sorry, there was a technical issue. Please try again.';
  }
};
