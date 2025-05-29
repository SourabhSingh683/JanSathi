
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyBDWoe2-Teleq6o6ZkSmzC2fnfLUEbO1qw';
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateRTIResponse = async (userMessage: string, language: string = 'english') => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `You are JAN-RTI, an expert RTI (Right to Information) assistant for India. Respond in ${language === 'hindi' ? 'Hindi' : 'English'}.
    
    User query: ${userMessage}
    
    Provide helpful guidance about RTI processes, eligibility, timeframes, and procedures. 
    Be specific about Indian RTI laws and procedures.
    Keep responses conversational, helpful, and encouraging.
    If asked about specific issues, explain the RTI process for that domain.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('RTI AI Error:', error);
    return language === 'hindi' 
      ? 'माफ़ करें, कुछ तकनीकी समस्या है। कृपया फिर से कोशिश करें।'
      : 'Sorry, there was a technical issue. Please try again.';
  }
};

export const generateRTIDepartment = async (issue: string, language: string = 'english') => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Based on this issue: "${issue}", identify the most appropriate government department in India. 
    Respond with just the department name in ${language === 'hindi' ? 'Hindi' : 'English'}.
    
    Examples:
    - Water/electricity issues -> जल विभाग/विद्युत विभाग or Water Department/Electricity Department
    - Pension issues -> पेंशन विभाग or Pension Department
    - Education issues -> शिक्षा विभाग or Education Department
    
    Just return the department name, nothing else.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Department AI Error:', error);
    return language === 'hindi' ? 'संबंधित विभाग' : 'Relevant Department';
  }
};

export const enhanceRTIApplication = async (formData: any, language: string = 'english') => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Create a detailed RTI application body in ${language === 'hindi' ? 'Hindi' : 'English'} based on:
    - Issue: ${formData.issue}
    - Details: ${formData.details}
    - Name: ${formData.name}
    - State: ${formData.state}
    
    Make it professional, specific, and include relevant RTI clauses. The main body should clearly explain what information is being sought and why.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('RTI Enhancement Error:', error);
    return formData.details;
  }
};
