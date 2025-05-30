
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyBDWoe2-Teleq6o6ZkSmzC2fnfLUEbO1qw';
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateRTIResponse = async (userMessage: string, language: string = 'english') => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `You are an RTI (Right to Information) Assistant for India. Respond in ${language === 'hindi' ? 'Hindi' : 'English'}.
    
    User query: ${userMessage}
    
    Provide comprehensive guidance on RTI applications including:
    - What information can be requested under RTI
    - Which department/authority to approach
    - Required documents and fees
    - Application process and timelines
    - Sample formats and templates
    - Appeal process if needed
    
    Be specific, helpful, and encouraging. Include practical steps and mention that RTI is a fundamental right.
    Always suggest visiting https://rtionline.gov.in for online applications.
    
    If the user describes a specific issue or problem, help them understand what specific information they should request under RTI to address their concern.`;

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
    
    const prompt = `Based on this issue: "${issue}", determine the most appropriate government department/ministry for an RTI application. Respond with just the department name in ${language === 'hindi' ? 'Hindi' : 'English'}.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('RTI Department Generation Error:', error);
    return language === 'hindi' 
      ? 'संबंधित विभाग'
      : 'Relevant Department';
  }
};

export const enhanceRTIApplication = async (rtiData: any, language: string = 'english') => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Enhance and elaborate this RTI application issue in ${language === 'hindi' ? 'Hindi' : 'English'}:
    
    Issue: ${rtiData.issue}
    Details: ${rtiData.details}
    
    Create a detailed, professional application body that:
    1. Clearly explains the user's problem: "${rtiData.issue}"
    2. Provides context and background
    3. Specifies exactly what information is being sought under RTI
    4. Makes it legally sound and professional
    5. Includes specific questions related to the problem
    
    Write only the main body content, not the full application format.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('RTI Enhancement Error:', error);
    return rtiData.details || rtiData.issue;
  }
};

export const generateRTIApplication = async (userDetails: any, language: string = 'english') => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Auto-determine department based on the issue
    const departmentPrompt = `Based on this issue: "${userDetails.issue}", determine the most appropriate government department/ministry for an RTI application. Respond with just the department name.`;
    
    const deptResult = await model.generateContent(departmentPrompt);
    const department = await deptResult.response.text();
    
    // Generate detailed application with enhanced issue description
    const applicationPrompt = `Generate a professional RTI application in ${language === 'hindi' ? 'Hindi' : 'English'} with these details:
    
    Name: ${userDetails.name}
    Address: ${userDetails.address}
    Phone: ${userDetails.phone}
    Email: ${userDetails.email}
    Issue/Problem: ${userDetails.issue}
    Department: ${department.trim()}
    
    IMPORTANT: 
    1. In the main body, clearly elaborate and explain the user's issue: "${userDetails.issue}" in detail
    2. Specify exactly what information is being sought under RTI
    3. Make it professional and legally sound
    4. Include proper RTI format with all required sections
    5. The issue should be prominently featured and well-explained in the application body
    6. Add specific questions related to the user's problem that they want answered through RTI
    
    Format it as a complete RTI application ready for submission.`;

    const result = await model.generateContent(applicationPrompt);
    const application = await result.response;
    return application.text();
  } catch (error) {
    console.error('RTI Application Generation Error:', error);
    return language === 'hindi' 
      ? 'आवेदन तैयार करने में समस्या हुई। कृपया मैन्युअल रूप से तैयार करें।'
      : 'Unable to generate application. Please prepare manually.';
  }
};
