
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
    
    For categories like "${userMessage}", provide multiple relevant schemes with:
    1. Scheme Name
    2. Brief Description
    3. Target Beneficiaries
    4. Key Benefits
    5. How to Apply
    6. Official Website/Portal
    
    Keep responses detailed, helpful, and accurate. Include practical steps for application.
    Always mention https://services.india.gov.in as the main portal for applications.
    
    Be encouraging and supportive in your tone while providing factual information.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    if (!response || !response.text()) {
      throw new Error('Empty response from Gemini API');
    }
    
    return response.text();
  } catch (error) {
    console.error('Gemini AI Error:', error);
    
    // Fallback response based on common categories
    if (userMessage.toLowerCase().includes('education')) {
      return language === 'hindi' 
        ? `शिक्षा संबंधी मुख्य योजनाएं:

1. **प्रधानमंत्री छात्रवृत्ति योजना**
   - लक्ष्य: मेधावी छात्र
   - लाभ: वित्तीय सहायता
   - आवेदन: https://scholarships.gov.in

2. **सर्व शिक्षा अभियान**
   - लक्ष्य: प्राथमिक शिक्षा
   - लाभ: निःशुल्क शिक्षा
   
अधिक जानकारी के लिए https://services.india.gov.in पर जाएं।`
        : `Education Related Schemes:

1. **PM Scholarship Scheme**
   - Target: Meritorious students
   - Benefits: Financial assistance
   - Apply: https://scholarships.gov.in

2. **Sarva Shiksha Abhiyan**
   - Target: Primary education
   - Benefits: Free education

Visit https://services.india.gov.in for more information.`;
    }
    
    return language === 'hindi' 
      ? 'योजनाओं की जानकारी प्राप्त करने में समस्या हुई। कृपया https://services.india.gov.in पर जाकर देखें या दोबारा कोशिश करें।'
      : 'Unable to fetch scheme details. Please visit https://services.india.gov.in for more information or try again.';
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
    
    If this is a category request like "Education & Scholarships", provide information about 3-4 popular schemes in that category.
    
    Make it comprehensive and easy to understand for common citizens.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    if (!response || !response.text()) {
      throw new Error('Empty response from Gemini API');
    }
    
    return response.text();
  } catch (error) {
    console.error('Scheme Details Error:', error);
    return language === 'hindi' 
      ? `${schemeName} की जानकारी:

यह एक महत्वपूर्ण सरकारी योजना है। विस्तृत जानकारी के लिए:

1. आधिकारिक वेबसाइट: https://services.india.gov.in
2. MyScheme पोर्टल: https://www.myscheme.gov.in
3. स्थानीय सरकारी कार्यालय से संपर्क करें

कृपया दोबारा कोशिश करें या उपरोक्त लिंक पर जाएं।`
      : `Information about ${schemeName}:

This is an important government scheme. For detailed information:

1. Official website: https://services.india.gov.in
2. MyScheme portal: https://www.myscheme.gov.in
3. Contact local government office

Please try again or visit the links above.`;
  }
};
