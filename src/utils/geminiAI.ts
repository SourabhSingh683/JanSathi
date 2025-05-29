
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyBDWoe2-Teleq6o6ZkSmzC2fnfLUEbO1qw';
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateSchemeResponse = async (userMessage: string, language: string = 'english') => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `You are a Government Schemes Assistant for India. Respond in ${language === 'hindi' ? 'Hindi' : 'English'}.
    
    User query: ${userMessage}
    
    Provide comprehensive information about Indian government schemes including:
    - Scheme details and benefits
    - Eligibility criteria 
    - Application process and requirements
    - Required documents
    - Processing time and contact information
    - Links to official portals when relevant
    
    Keep responses detailed, helpful, and accurate. Include practical steps for application.
    If asked about specific schemes, provide complete information including beneficiary details.
    Always mention https://services.india.gov.in as the main portal for applications.
    
    Be encouraging and supportive in your tone while providing factual information.`;

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

export const getSchemeDetails = async (schemeName: string, language: string = 'english') => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Provide detailed information about the Indian government scheme: "${schemeName}" in ${language === 'hindi' ? 'Hindi' : 'English'}.

    Include:
    1. Scheme overview and objectives
    2. Who is eligible (detailed criteria)
    3. Benefits provided
    4. How to apply (step-by-step process)
    5. Required documents
    6. Processing time
    7. Contact information
    8. Official website links
    
    Make it comprehensive and easy to understand for common citizens.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Scheme Details Error:', error);
    return language === 'hindi' 
      ? 'इस योजना की जानकारी प्राप्त करने में समस्या हुई। कृपया https://services.india.gov.in पर जाकर देखें।'
      : 'Unable to fetch scheme details. Please visit https://services.india.gov.in for more information.';
  }
};
